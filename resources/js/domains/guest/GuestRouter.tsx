import React from "react";
import { Route } from "react-router-dom";

import { RouterWrapper, ROUTES } from "~/router";
import { Airlines, Cities, Flights, Home } from "./screens";

export const GuestRouter = () => {
  return (
    <RouterWrapper guest>
      <Route element={<Home />} path={ROUTES.home} />
      <Route element={<Cities />} path={ROUTES.cities} />
      <Route element={<Airlines />} path={ROUTES.airlines} />
      <Route element={<Flights />} path={ROUTES.flights} />
    </RouterWrapper>
  );
};
