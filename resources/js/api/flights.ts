import axios from "axios";

import { CreateRequestFlight, Flight, ServiceResponse } from "./api.types";

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
