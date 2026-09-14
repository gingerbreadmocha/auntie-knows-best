import React, { useState, useEffect } from "react";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(
  /\/+$/,
  "",
);

export function useGetHeartbeat() {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    getHeartbeat();
  }, []);

  const getHeartbeat = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/heartbeat`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) setReady(true);
    } catch (err) {
      console.error("Failed first communication with Auntie server: ", err);
    }
  };

  return { ready };
}
