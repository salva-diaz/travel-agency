const API_BASE_URL = "/api/cities";

function makeRequest<T>(
  method: string,
  url: string,
  body: any = null,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300 && xhr.status) {
        if (xhr.status !== 204) resolve(JSON.parse(xhr.responseText) as T);
        else resolve(null as T);
      } else {
        reject(JSON.parse(xhr.response));
      }
    };
    xhr.onerror = () => reject(new Error("Network error occurred"));

    xhr.send(body ? JSON.stringify(body) : null);
  });
}

export function getCities(
  url: string | null = null,
  queryParams: string,
): Promise<any> {
  if (url) return makeRequest<any[]>("GET", url);

  return makeRequest<any[]>("GET", API_BASE_URL + "?" + queryParams);
}

export function getCityById(id: number): Promise<any> {
  return makeRequest<any>("GET", `${API_BASE_URL}/${id}`);
}

export function createCity(cityData: Record<string, any>): Promise<any> {
  return makeRequest<any>("POST", API_BASE_URL, cityData);
}

export function updateCity(
  id: number,
  cityData: Record<string, any>,
): Promise<any> {
  return makeRequest<any>("PUT", `${API_BASE_URL}/${id}`, cityData);
}

export function deleteCity(id: number): Promise<void> {
  return makeRequest<void>("DELETE", `${API_BASE_URL}/${id}`);
}
