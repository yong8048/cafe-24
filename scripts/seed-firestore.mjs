import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-cafe-24";
const EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true" ? "127.0.0.1:8080" : "");

const toStringValue = value => ({ stringValue: String(value ?? "") });

const loadJson = relativePath => JSON.parse(readFileSync(resolve(ROOT, relativePath), "utf8"));

const loadEnvFile = filePath => {
  if (!existsSync(filePath)) {
    return;
  }
  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }
    const [key, ...rest] = trimmed.split("=");
    if (!process.env[key]) {
      process.env[key] = rest.join("=").replace(/^['"]|['"]$/g, "");
    }
  }
};

const upsertEmulatorDocument = async (collection, documentId, data) => {
  const fields = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, toStringValue(value)]));
  const url = `http://${EMULATOR_HOST}/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collection}/${encodeURIComponent(documentId)}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer owner",
    },
    body: JSON.stringify({ fields }),
  });
  if (!response.ok) {
    throw new Error(`Failed to write ${collection}/${documentId}: ${response.status} ${await response.text()}`);
  }
};

const seedWithAdmin = async (stores, updateDate) => {
  const { initializeApp, applicationDefault } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");

  initializeApp({
    credential: applicationDefault(),
    projectId: PROJECT_ID,
  });
  const db = getFirestore();

  const storeBatchSize = 400;
  for (let index = 0; index < stores.length; index += storeBatchSize) {
    const batch = db.batch();
    for (const store of stores.slice(index, index + storeBatchSize)) {
      const docRef = db.collection("StoreInfo").doc();
      batch.set(docRef, store);
    }
    await batch.commit();
  }

  await db.collection("UpdateDate").doc("Date").set(updateDate);
};

const seedWithEmulator = async (stores, updateDate) => {
  for (const [index, store] of stores.entries()) {
    await upsertEmulatorDocument("StoreInfo", `store-${String(index + 1).padStart(4, "0")}`, store);
  }
  await upsertEmulatorDocument("UpdateDate", "Date", updateDate);
};

const main = async () => {
  loadEnvFile(resolve(ROOT, ".env.local"));
  loadEnvFile(resolve(ROOT, ".env"));

  const stores = loadJson("data/seed/stores.json");
  const updateDate = loadJson("data/seed/update-date.json");

  if (!stores.length) {
    throw new Error("data/seed/stores.json is empty. Geocode stores before seeding.");
  }

  if (EMULATOR_HOST) {
    console.log(`Seeding ${stores.length} stores into emulator ${EMULATOR_HOST} (${PROJECT_ID})`);
    await seedWithEmulator(stores, updateDate);
  } else {
    console.log(`Seeding ${stores.length} stores into project ${PROJECT_ID}`);
    await seedWithAdmin(stores, updateDate);
  }

  console.log("Seed complete.");
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
