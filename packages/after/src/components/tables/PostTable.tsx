import React from "react";
import { Table, type Column } from "./Table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import type { Post } from "@/services/postService";

interface PostTableProps {
  data: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onPublish: (id: number) => void;
  onArchive: (id: number) => void;
  onRestore: (id: number) => void;
  striped?: boolean;
  hover?: boolean;
}

export const PostTable: React.FC<PostTableProps> = ({
  data,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
  striped = false,
  hover = false,
}) => {
  const columns: Column<Post>[] = [
    { key: "id", header: "ID", width: "60px" },
    { key: "title", header: "제목" },
    { key: "author", header: "작성자", width: "120px" },
    {
      key: "category",
      header: "카테고리",
      width: "140px",
      render: (value) => {
        // category → variant 매핑
        const categoryVariantMap: Record<string, "primary" | "info" | "danger" | "secondary"> = {
          development: "primary",
          design: "info",
          accessibility: "danger",
        };
        return (
          <Badge variant={categoryVariantMap[value] || "secondary"} pill>
            {value}
          </Badge>
        );
      },
    },
    {
      key: "status",
      header: "상태",
      width: "120px",
      render: (value) => {
        // Post status → variant 매핑
        const statusVariantMap: Record<string, "success" | "warning" | "secondary"> = {
          published: "success",
          draft: "warning",
          archived: "secondary",
        };
        const statusLabelMap: Record<string, string> = {
          published: "게시됨",
          draft: "임시저장",
          archived: "보관됨",
        };
        return (
          <Badge variant={statusVariantMap[value] || "secondary"}>
            {statusLabelMap[value] || value}
          </Badge>
        );
      },
    },
    {
      key: "views",
      header: "조회수",
      width: "100px",
      render: (value) => {
        return typeof value === "number" ? value.toLocaleString() : "0";
      },
    },
    { key: "createdAt", header: "작성일", width: "120px" },
    {
      key: "actions",
      header: "관리",
      width: "250px",
      render: (_, row) => {
        return (
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            {row.status === "draft" && (
              <Button size="sm" variant="success" onClick={() => onPublish?.(row.id)}>
                게시
              </Button>
            )}
            {row.status === "published" && (
              <Button size="sm" variant="secondary" onClick={() => onArchive?.(row.id)}>
                보관
              </Button>
            )}
            {row.status === "archived" && (
              <Button size="sm" variant="primary" onClick={() => onRestore?.(row.id)}>
                복원
              </Button>
            )}
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </div>
        );
      },
    },
  ];

  return <Table<Post> columns={columns} data={data} striped={striped} hover={hover} />;
};
