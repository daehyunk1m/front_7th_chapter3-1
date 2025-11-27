import React from "react";
import { Table, type Column } from "./Table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import type { User } from "@/services/userService";

interface UserTableProps {
  data: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  striped?: boolean;
  hover?: boolean;
}

export const UserTable: React.FC<UserTableProps> = ({
  data,
  onEdit,
  onDelete,
  striped = false,
  hover = false,
}) => {
  const columns: Column<User>[] = [
    { key: "id", header: "ID", width: "60px" },
    { key: "username", header: "사용자명", width: "150px" },
    { key: "email", header: "이메일" },
    {
      key: "role",
      header: "역할",
      width: "120px",
      render: (value) => {
        // userRole → variant 매핑
        const roleVariantMap: Record<string, "danger" | "warning" | "primary" | "secondary"> = {
          admin: "danger",
          moderator: "warning",
          user: "primary",
          guest: "secondary",
        };
        const roleLabelMap: Record<string, string> = {
          admin: "관리자",
          moderator: "운영자",
          user: "사용자",
          guest: "게스트",
        };
        return (
          <Badge variant={roleVariantMap[value] || "primary"}>{roleLabelMap[value] || value}</Badge>
        );
      },
    },
    {
      key: "status",
      header: "상태",
      width: "120px",
      render: (value) => {
        // User status → variant 매핑
        const statusVariantMap: Record<string, "success" | "warning" | "danger"> = {
          active: "success",
          inactive: "warning",
          suspended: "danger",
        };
        const statusLabelMap: Record<string, string> = {
          active: "활성",
          inactive: "비활성",
          suspended: "정지",
        };
        return (
          <Badge variant={statusVariantMap[value] || "secondary"}>
            {statusLabelMap[value] || value}
          </Badge>
        );
      },
    },
    { key: "createdAt", header: "생성일", width: "120px" },
    {
      key: "lastLogin",
      header: "마지막 로그인",
      width: "140px",
      render: (value) => {
        return value || "-";
      },
    },
    {
      key: "actions",
      header: "관리",
      width: "200px",
      render: (_, row) => {
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </div>
        );
      },
    },
  ];
  return <Table<User> columns={columns} data={data} striped={striped} hover={hover} />;
};
