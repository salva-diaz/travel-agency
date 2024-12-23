import { City } from "./api.types";

const API_BASE_URL = "/api/cities";

function makeRequest<ResolvedType, ReqBodyType = null>(
  method: string,
  url: string,
  body?: ReqBodyType,
): Promise<ResolvedType> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Set resolve and reject callbacks
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300 && xhr.status) {
        if (xhr.status !== 204) resolve(JSON.parse(xhr.responseText));
        else resolve(null as ResolvedType);
      } else {
        reject(new Error(JSON.parse(xhr.response)));
      }
    };
    xhr.onerror = () => reject(new Error("Network error occurred"));

    // Send the request
    xhr.send(body ? JSON.stringify(body) : null);
  });
}

export function getCities(
  url: string | null = null,
  queryParams: string,
): Promise<any> {
  if (url) return makeRequest<City | Error, undefined>("GET", url);

  return makeRequest<City | Error>("GET", API_BASE_URL + "?" + queryParams);
}

export function getCityById(id: number): Promise<City | Error> {
  return makeRequest<City | Error>("GET", `${API_BASE_URL}/${id}`);
}

export function createCity(
  cityData: Record<string, any>,
): Promise<City | Error> {
  return makeRequest<City | Error, Record<string, any>>(
    "POST",
    API_BASE_URL,
    cityData,
  );
}

export function updateCity(
  id: number,
  cityData: Record<string, any>,
): Promise<City | Error> {
  return makeRequest<any, Record<string, any>>(
    "PUT",
    `${API_BASE_URL}/${id}`,
    cityData,
  );
}

export function deleteCity(id: number): Promise<void> {
  return makeRequest<void>("DELETE", `${API_BASE_URL}/${id}`);
}
