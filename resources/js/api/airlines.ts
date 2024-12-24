import { Airline, CreateRequestAirline, ServiceResponse } from "./api.types";

export function getAirlines(
  url: string | undefined = undefined,
  queryParams: string = "",
): Promise<ServiceResponse<Airline[]>> {
  if (url)
    return fetch(`${url}&${queryParams}`).then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw new Error(error);
        });
      }
      return res.json();
    });

  return fetch(`/api/airlines?${queryParams}`).then((res) => {
    if (!res.ok) {
      return res.json().then((error) => {
        throw new Error(error);
      });
    }
    return res.json();
  });
}

export function deleteAirline(id: number): Promise<void> {
  return fetch(`/api/airlines/${id}`, { method: "DELETE" }).then((res) => {
    if (!res.ok) {
      return res.json().then((error) => {
        throw new Error(error);
      });
    }
  });
}

export function createAirline(
  airlineData: CreateRequestAirline,
): Promise<Airline> {
  return fetch(`/api/airlines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(airlineData),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((error) => {
        throw new Error(error);
      });
    }
    return res.json();
  });
}

export function updateAirline(
  id: number,
  airlineData: Partial<Airline>,
): Promise<Airline> {
  return fetch(`/api/airlines/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(airlineData),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((error) => {
        throw new Error(error);
      });
    }
    return res.json();
  });
}
