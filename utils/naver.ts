import axios from "axios";

interface GeoLocation {
  longitude: string;
  latitude: string;
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
    withCredentials: true,
  });

  return request;
};

const GetGeoLocation = async (address: string): Promise<GeoLocation | null> => {
  const request = createInstance();
  console.log(request);
  try {
    const response = await request.get(`?query=${encodeURI(address)}`);
    console.log(response);

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

export default GetGeoLocation;
