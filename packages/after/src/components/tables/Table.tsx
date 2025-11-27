import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const tableVariants = cva(
  [
    "w-full border-collapse font-sans text-sm bg-background",
    "[&_th]:p-4 [&_th]:text-left [&_th]:font-medium [&_th]:text-xs [&_th]:text-muted-foreground [&_th]:uppercase [&_th]:tracking-wide [&_th]:border-b-2 [&_th]:border-border",
    "[&_td]:p-4 [&_td]:text-foreground [&_td]:border-b [&_td]:border-border/50",
    "[&_thead]:bg-muted",
    "[&_tbody_tr:last-child_td]:border-b-0",
  ],
  {
    variants: {
      striped: {
        true: "[&_tbody_tr:nth-child(even)]:bg-muted",
        false: "",
      },
      bordered: {
        true: "border border-border [&_th]:border [&_th]:border-border [&_td]:border [&_td]:border-border",
        false: "",
      },
      hover: {
        true: "[&_tbody_tr:hover]:bg-muted/50",
        false: "",
      },
    },
    defaultVariants: {
      striped: false,
      bordered: false,
      hover: false,
    },
  }
);

const paginationButtonVariants = cva(
  "px-3 py-1.5 border border-border bg-background rounded",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "cursor-pointer hover:bg-muted",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

export interface Column<T = object> {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T = object> extends VariantProps<typeof tableVariants> {
  columns: Column<T>[];
  data?: T[];
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  onRowClick?: (row: T) => void;
}

export const Table = <T extends object = object>({
  columns,
  data = [],
  striped = false,
  bordered = false,
  hover = false,
  pageSize = 10,
  searchable = false,
  sortable = false,
  onRowClick,
}: TableProps<T>) => {
  const [tableData, setTableData] = useState<T[]>(data);
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
      const aVal = (a as Record<string, unknown>)[columnKey];
      const bVal = (b as Record<string, unknown>)[columnKey];

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
        className={cn(tableVariants({ striped, bordered, hover }))}
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
              {columns.map((column) => {
                const value = (row as Record<string, unknown>)[column.key];
                return (
                  <TableCell key={column.key}>
                    {column.render
                      ? column.render(value, row)
                      : String(value ?? "")}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </table>

      {totalPages > 1 && (
        <div className="mt-4 flex gap-2 justify-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={cn(paginationButtonVariants({ disabled: currentPage === 1 }))}
          >
            이전
          </button>
          <span className="px-3 py-1.5">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={cn(paginationButtonVariants({ disabled: currentPage === totalPages }))}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};
