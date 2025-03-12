import { backendUri } from "@/lib/apiEndpoint";

export const getData = async (endpoint: string) => {
  try {
    const uri = `${backendUri}${endpoint}`;
    const response = await fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("bhai error in", endpoint, error);
    throw error;
  }
};
