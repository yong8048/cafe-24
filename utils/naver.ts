import axios from "axios";

interface GeoLocation {
  longitude: string;
  latitude: string;
}

interface AddressResult {
  land: {
    name: string;
    number1: string;
    number2: string;
  };
  region: {
    area1: {
      name: string;
      alias: string;
    };
    area2: {
      name: string;
    };
  };
}

const createInstance = () => {
  const request = axios.create({
    baseURL: "/api",
    headers: {
      "X-NCP-APIGW-API-KEY-ID": `${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`,
      "X-NCP-APIGW-API-KEY": `${process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET_KEY}`,
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Credentials": true,
      // "Access-Control-Allow-Method": "GET",
    },
  });

  return request;
};

export const GetGeoLocation = async (address: string): Promise<GeoLocation | null> => {
  const request = createInstance();

  try {
    const response = await request.get(`/map-geocode/v2/geocode?query=${encodeURI(address)}`);

    if (response.data.status === "OK" && response.data.meta.totalCount !== 0) {
      return {
        longitude: response.data.addresses[0].x,
        latitude: response.data.addresses[0].y,
      };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
  return null;
};

export const GetAddrress = async (longitude: string, latitude: string): Promise<AddressResult[] | null> => {
  const request = createInstance();
  try {
    const response = await request.get(
      `/map-reversegeocode/v2/gc?output=json&orders=roadaddr&coords=${longitude},${latitude}`,
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};
