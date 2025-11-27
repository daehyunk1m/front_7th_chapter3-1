import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { cn } from "@/lib/utils";

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

  return (
    <div className="overflow-x-auto">
      {searchable && (
        <div className="mb-4">
          <input
            className="w-[300px] px-3 py-2 border border-border rounded text-sm font-sans text-foreground bg-background focus:border-primary focus:outline-none"
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <table
        className={cn(
          "w-full border-collapse font-sans text-sm bg-background",
          bordered && "border border-border",
          "[&_th]:p-4 [&_th]:text-left [&_th]:font-medium [&_th]:text-xs [&_th]:text-muted-foreground [&_th]:uppercase [&_th]:tracking-wide [&_th]:border-b-2 [&_th]:border-border",
          "[&_td]:p-4 [&_td]:text-foreground [&_td]:border-b [&_td]:border-border/50",
          "[&_thead]:bg-muted",
          "[&_tbody_tr:last-child_td]:border-b-0",
          striped && "[&_tbody_tr:nth-child(even)]:bg-muted",
          bordered && "[&_th]:border [&_th]:border-border [&_td]:border [&_td]:border-border",
          hover && "[&_tbody_tr:hover]:bg-muted/50"
        )}
      >
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
                onClick={() => sortable && handleSort(column.key)}
              >
                <div
                  className={cn(
                    "flex items-center gap-1",
                    sortable ? "cursor-pointer" : "cursor-default"
                  )}
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
              className={onRowClick ? "cursor-pointer" : "cursor-default"}
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
        <div className="mt-4 flex gap-2 justify-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={cn(
              "px-3 py-1.5 border border-border bg-background rounded",
              currentPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-muted"
            )}
          >
            이전
          </button>
          <span className="px-3 py-1.5">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={cn(
              "px-3 py-1.5 border border-border bg-background rounded",
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-muted"
            )}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};
