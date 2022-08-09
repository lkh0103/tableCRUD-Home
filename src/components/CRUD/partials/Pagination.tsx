import React from "react";
import { Pagination } from "antd";

export default function CURDPagiantion(props: any) {
  return (
    <Pagination
      defaultCurrent={props.defaultCurrent}
      total={props.total}
      pageSize={props.pageSize}
      onChange={(page, pageSize) => props.onPageChange(page, pageSize)}
    />
  );
}