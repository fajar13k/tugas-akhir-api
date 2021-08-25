import dayjs from "dayjs";
import { useState } from "react";
import {
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
} from "reactstrap";

const TableDashboard = ({
  title,
  column,
  data = [],
  meta,
  loading,
  onChangePagination,
  onChangeLimit,
  limit,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const renderNumber = Array.from(Array(meta?.pages).keys());

  return (
    <Card className="m-2 shadow-sm">
      <div className="text-start p-3 fw-bold">
        <span>{title}</span>
      </div>
      <Table striped>
        <thead>
          <tr>
            {column.map((colItem) => (
              <th key={colItem}>{colItem}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4}>
                <span>Loading ...</span>
              </td>
            </tr>
          ) : (
            data?.map((dt) => (
              <tr>
                <td>{dt.description}</td>
                <td>{`${
                  Math.round((dt.accuracy + Number.EPSILON) * 100) / 100
                }%`}</td>
                <td>{dayjs(dt.date).format("DD-MM-YYYY HH:mm:ss")}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {!loading && renderNumber.length > 0 && (
        <div className="d-flex justify-content-end pe-3">
          <Dropdown
            isOpen={dropdownOpen}
            toggle={() => setDropdownOpen((prevState) => !prevState)}
            className="me-3"
          >
            <DropdownToggle caret>{limit}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => onChangeLimit(10)}>10</DropdownItem>
              <DropdownItem onClick={() => onChangeLimit(15)}>15</DropdownItem>
              <DropdownItem onClick={() => onChangeLimit(25)}>25</DropdownItem>
              <DropdownItem onClick={() => onChangeLimit(50)}>50</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Pagination aria-label="Page navigation example">
            <PaginationItem>
              <PaginationLink
                previous
                onClick={() => onChangePagination("prev")}
              />
            </PaginationItem>
            {renderNumber?.map((i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => onChangePagination("number", i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink next onClick={() => onChangePagination("next")} />
            </PaginationItem>
          </Pagination>
        </div>
      )}
    </Card>
  );
};

export default TableDashboard;
