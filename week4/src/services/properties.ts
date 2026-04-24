import axios from "axios";

import type { Property, PropertyPayload } from "@/types/property";

const propertiesApi = axios.create({
  baseURL: "/api/properties",
  headers: {
    "Content-Type": "application/json",
  },
});

function getApiMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return fallback;
}

export async function getProperties() {
  try {
    const { data } = await propertiesApi.get<Property[]>("");
    return data;
  } catch (error) {
    throw new Error(getApiMessage(error, "No se pudieron obtener las propiedades."));
  }
}

export async function postProperty(payload: PropertyPayload) {
  try {
    const { data } = await propertiesApi.post<Property>("", payload);
    return data;
  } catch (error) {
    throw new Error(getApiMessage(error, "No se pudo crear la propiedad."));
  }
}

export async function updateProperty(id: string, payload: PropertyPayload) {
  try {
    const { data } = await propertiesApi.put<Property>(`/${id}`, payload);
    return data;
  } catch (error) {
    throw new Error(getApiMessage(error, "No se pudo actualizar la propiedad."));
  }
}

export async function deleteProperty(id: string) {
  try {
    const { data } = await propertiesApi.delete<Property>(`/${id}`);
    return data;
  } catch (error) {
    throw new Error(getApiMessage(error, "No se pudo eliminar la propiedad."));
  }
}