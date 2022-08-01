import React, { useState } from "react";
import { Pagination } from "antd";

export default function CURDPagiantion(props: any) {
  const [onPage, setOnPage] = useState<any>(props.defaultCurrent);

  props.handlePage(onPage);

  return (
    <Pagination
      defaultCurrent={props.defaultCurrent}
      total={props.total}
      pageSize={props.pageSize}
      onChange={(e) => setOnPage(e)}
    />
  );
}