import { City } from "~/api";
import { ColumnProps } from "~/shared.types";

const FIRST_PAGE = 1;

type Props<T> = {
  columns: Array<ColumnProps<T>>;
  data?: T[];
};

export function Table<T>({ data, columns }: Props<T>) {
  const headers = columns.map((col) => <th>{col.title}</th>);

  const rows = !data?.length ? (
    <tr>
      <td colSpan={columns.length} className="text-center">
        No data
      </td>
    </tr>
  ) : (
    data?.map((row, index) => {
      return (
        <tr key={`row-${index}`}>
          {columns.map((column, index2) => {
            // const value = column.render
            //   ? column.render(column, row as T)
            //   : (row[column.key as keyof typeof row] as string);

            const value = row[column.key as keyof typeof City];

            return <td key={`cell-${index2}`}>{value}</td>;
          })}
        </tr>
      );
    })
  );

  return (
    <>
      <table className="w-full whitespace-nowrap text-left">
        <thead className="border-b border-white/10 text-sm leading-6 text-black">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Arrival Flights</th>
            <th>Departure Flights</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.id} className="text-black">
              <td>{city.id}</td>
              <td>{city.name}</td>
              <td>{city.arrival_flights_count}</td>
              <td>{city.departure_flights_count}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => handleEditClick(city)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => handleDeleteClick(city)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2">
        {pagination && (
          <Button
            variant="primary"
            onClick={() => {
              setPageNumber((prev) => prev - 1);
              loadCities();
            }}
            disabled={pageNumber === 1}
          >
            Previous
          </Button>
        )}
        {pagination && (
          <>
            <Button
              variant="primary"
              onClick={() => {
                setPageNumber((prev) => prev + 1);
                loadCities();
              }}
              disabled={pageNumber === pagination.totalPages}
            >
              Next
            </Button>
            <div className="text-black">
              <span className="text-sm">
                showing {pagination.count} of {pagination.total} cities. Page{" "}
                {pageNumber} of {pagination.totalPages}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
