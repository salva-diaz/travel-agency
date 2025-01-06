import axios from "axios";

import {
  CreateRequestFlight,
  Flight,
  ServiceResponse,
  UpdateRequestFlight,
} from "./api.types";

const BASE_URL = "/api/flights";

export function getFlights(queryParams: string) {
  return axios
    .get<ServiceResponse<Flight[]>>(`/api/flights?${queryParams}`)
    .catch((err) => {
      throw err;
    });
}

export function createFlight(flightData: CreateRequestFlight) {
  return axios
    .post(BASE_URL, flightData)
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
}

export function deleteFlight(id: number) {
  return axios
    .delete(BASE_URL + `/${id}`)
    .then()
    .catch((err) => {
      throw err;
    });
}

export function updateFlight(id: number, flightData: UpdateRequestFlight) {
  return axios.put(BASE_URL + `/${id}`, flightData).catch((err) => {
    throw err;
  });
}
