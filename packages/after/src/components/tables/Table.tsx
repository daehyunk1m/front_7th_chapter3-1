import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export interface Column {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data?: any[];
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  onRowClick?: (row: any) => void;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data = [],
  striped = false,
  bordered = false,
  hover = false,
  pageSize = 10,
  searchable = false,
  sortable = false,
  onRowClick,
}) => {
  const [tableData, setTableData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    const newDirection = sortColumn === columnKey && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(columnKey);
    setSortDirection(newDirection);

    const sorted = [...tableData].sort((a, b) => {
      const aVal = a[columnKey];
      const bVal = b[columnKey];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return newDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      return newDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    setTableData(sorted);
  };

  const filteredData =
    searchable && searchTerm
      ? tableData.filter((row) =>
          Object.values(row).some((val) =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : tableData;

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const tableClasses = [
    "table",
    striped && "table-striped",
    bordered && "table-bordered",
    hover && "table-hover",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className='table-container'>
      {searchable && (
        <div className='mb-4'>
          <input
            className='w-[300px] px-3 py-2 border border-border rounded-[4px]'
            type='text'
            placeholder='검색...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <table className={tableClasses}>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={""}
                style={column.width ? { width: column.width } : undefined}
                onClick={() => sortable && handleSort(column.key)}
              >
                <div
                  className={""}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: sortable ? "pointer" : "default",
                  }}
                >
                  {column.header}
                  {sortable && sortColumn === column.key && (
                    <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              style={{ cursor: onRowClick ? "pointer" : "default" }}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : React.isValidElement(row[column.key])
                      ? row[column.key]
                      : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </table>

      {totalPages > 1 && (
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              padding: "6px 12px",
              border: "1px solid #ddd",
              background: "white",
              borderRadius: "4px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            이전
          </button>
          <span style={{ padding: "6px 12px" }}>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: "6px 12px",
              border: "1px solid #ddd",
              background: "white",
              borderRadius: "4px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

// const actualColumns =
//   columns ||
//   (tableData[0]
//     ? Object.keys(tableData[0]).map((key) => ({ key, header: key, width: undefined }))
//     : []);
