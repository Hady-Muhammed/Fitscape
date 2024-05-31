import { useState } from "react";
import { RequestBody } from "../types/request-body";

function useRest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function get(url: string) {
    return await sendRequest(url, "GET");
  }

  async function post(url: string, body: RequestBody) {
    return await sendRequest(url, "POST", body);
  }

  async function put(url: string, body: RequestBody) {
    return await sendRequest(url, "PUT", body);
  }

  async function deletee(url: string, body: RequestBody) {
    return await sendRequest(url, "DELETE", body);
  }

  async function patch(url: string, body: RequestBody) {
    return await sendRequest(url, "PATCH", body);
  }

  async function sendRequest(url: string, method: string, body?: RequestBody) {
    setLoading(true);
    setError(null);
    const headers = {
      "Content-Type": "application/json",
      ...(!url.includes("auth") && {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("token") || ""
        )}`,
      }),
    };

    try {
      const response = await fetch(url, {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const error: any = new Error(responseData.message);
        error.status = response.status;
        throw error;
      }
      setLoading(false);
      return responseData;
    } catch (error) {
      setLoading(false);
      setError(
        error instanceof Error ? error.message : "Something went wrong!"
      );
      throw error;
    }
  }

  return { loading, error, deletee, get, post, put, patch };
}

export default useRest;
