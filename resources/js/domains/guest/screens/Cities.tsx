// import { CitiesTable } from "~/shared/components/cities/CitiesTable";
import { title } from "process";
import { useEffect, useState } from "react";

import { City, CityFilters } from "~/api";
import { getCities } from "~/api/cities";
import { ColumnProps } from "~/shared.types";
import { Table } from "~/ui/common/Table";

type FilterName = keyof CityFilters;

export const Cities = () => {
  const [cities, setCities] = useState<City[]>([]);
  // // const [sort, setSort] = useState("");
  // // const [order, setOrder] = useState<SortDirectionType>(SortDirection.asc);

  // const [filters, setFilters] = useState<CityFilters>({});

  // function isFilter(propertyName: string): propertyName is FilterName {
  //   return propertyName in filters;
  // }

  // const buildQueryParams = () => {
  //   const params = new URLSearchParams();

  //   Object.keys(filters).forEach((key) => {
  //     if (isFilter(key)) {
  //       params.append(`filter[${key}]`, filters[key] ? `${filters[key]}` : "");
  //     }
  //   });

  //   if (sort) params.append("sort", order === "asc" ? sort : `-${sort}`);

  //   params.append("page", pageNumber.toString());

  //   return params.toString();
  // };

  const loadCities = async () => {
    try {
      // const queryParams = buildQueryParams();
      // const res = await getCities(queryParams);
      const res = await getCities("");
      setCities(res.data);
      // setPagination(res.pagination);
    } catch (error: any) {
      console.error("Error obtaining cities:", error.message);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    loadCities();
  });

  const columns: Array<ColumnProps<City>> = [
    {
      key: "name",
      title: "Name",
    },
    {
      key: "departureFlightsCount",
      title: "Departure Flights",
    },
    {
      key: "arrivalFlightsCount",
      title: "Arrival Flights",
    },
  ];

  return (
    <div className="prose text-white lg:prose-xl md:p-10">
      <h1>Cities</h1>

      <Table data={cities} columns={columns} />
    </div>
  );
};
