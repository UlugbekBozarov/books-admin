import { ChangeEvent, FC, MouseEvent, useMemo } from "react";
import { get } from "lodash";

import {
  StyledPagination,
  StyledStickyTableRow,
  StyledTablePagination,
} from "./TablePagingRow.style";
import { useSearchParams } from "react-router-dom";

interface TablePagingRowProps {
  dataLength?: number;
  colSpan?: number;
  rowsPerPageOptions?: Array<number>;
}

const TablePagingRow: FC<TablePagingRowProps> = ({
  dataLength = 0,
  colSpan = 0,
  rowsPerPageOptions = [10, 20, 30, 50, 100, 200],
}) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(() => {
    const paramPage = Number(searchParams.get("page"));
    if (isNaN(paramPage) || paramPage < 1) {
      return 1;
    } else return paramPage;
  }, [searchParams]);

  const limit = useMemo(() => {
    const paramLimit = Number(searchParams.get("limit"));
    if (isNaN(paramLimit) || paramLimit < 1) {
      return 100;
    } else return paramLimit;
  }, [searchParams]);

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null,
    newPage: number
  ) => {
    searchParams.set("page", String(newPage));
    setSearchParams(searchParams, { replace: true });
  };

  const onPageChangePagination = (
    event: ChangeEvent<unknown>,
    newPage: number
  ) => {
    if (newPage === 1) {
      searchParams.delete("page");
    } else {
      searchParams.set("page", String(newPage));
    }
    setSearchParams(searchParams, { replace: true });
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newLimit = String(get(event, "target.value"));
    if (newLimit === "100") {
      searchParams.delete("limit");
    } else {
      searchParams.set("limit", String(get(event, "target.value")));
    }
    searchParams.delete("page");
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <StyledStickyTableRow sx={{ bottom: 0 }}>
      <StyledTablePagination
        count={dataLength}
        page={page - 1}
        colSpan={colSpan}
        rowsPerPage={limit}
        onPageChange={handleChangePage}
        // onChange={handleChangePage}
        rowsPerPageOptions={rowsPerPageOptions}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={({
          page: comPage,
          count,
          onPageChange,
          ...props
        }) => {
          return (
            <StyledPagination
              page={comPage + 1}
              shape="rounded"
              count={Math.ceil(count / limit)}
              //   onChange={(event,  ) => {}}
              onChange={onPageChangePagination}
            />
          );
        }}
        sx={{ border: "none" }}
      />
    </StyledStickyTableRow>
  );
};

export default TablePagingRow;
