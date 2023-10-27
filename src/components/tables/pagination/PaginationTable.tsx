import {
  FC,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Card,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { get } from "lodash";
import axios from "axios";

import { IStatus } from "types";
import { NoData } from "components/form";
import { useResize } from "hooks";
import { client } from "services/api";

import { TablePagingRow } from "../components";
import { StyledStickyTableRow } from "./PaginationTable.style";

interface IColumn {
  headerKey?: string;
  type?: "text" | "number" | "image";
  header?: string;
  field?: string;
  width?: number;
  defaultValue?: string | number | undefined;
  renderComponent?: (data: any, index: number) => string | ReactNode;
}

interface PaginationTableProps {
  isIndexing?: boolean;
  dataKey?: string;
  filterContentId?: string;
  url: string;
  paramFields?: Array<{
    key: string;
    field: string;
  }>;
  onRowClick?: (item: any) => void;
  columns?: Array<IColumn>;
}

const PaginationTable: FC<PaginationTableProps> = ({
  isIndexing = true,
  dataKey = "id",
  filterContentId = "filter-wrapper-id",
  url,
  onRowClick,
  paramFields = [],
  columns,
}) => {
  const { t } = useTranslation();

  const location = useLocation();
  let [searchParams] = useSearchParams();

  const params = useMemo(
    () =>
      paramFields?.reduce(
        (allParams, param) => ({
          ...allParams,
          [param.key]: searchParams.get(param.field),
        }),
        {}
      ),
    [searchParams, paramFields]
  );

  const { height } = useResize(filterContentId);

  const CancelToken = axios.CancelToken;
  const canceledToken = useRef<any>(null);

  const [data, setData] = useState<{
    data: Array<any>;
    total: number;
    status: IStatus;
    error?: any;
  }>({
    data: [],
    total: 0,
    status: "initial",
  });

  const cellLength = useMemo(() => {
    return get(columns, "length", 0) + (isIndexing ? 1 : 0);
  }, [columns, isIndexing]);

  const handleRowClick = (item: any) => () => {
    if (onRowClick) {
      onRowClick(item);
    }
  };

  const getData = async () => {
    if (canceledToken.current) {
      canceledToken.current();
    }
    await setData({
      data: [],
      total: 0,
      status: "loading",
    });
    client
      .get(url, {
        params,
        cancelToken: new CancelToken(async function executor(token) {
          canceledToken.current = token;
        }),
      })
      .then((response) => {
        setTimeout(() => {
          setData({
            data: get(response, "content", []),
            total: get(response, "totalElements", 0),
            status: "success",
          });
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
        setData({
          data: [],
          total: 0,
          status: "failed",
          error: error,
        });
      });
  };

  useLayoutEffect(() => {
    getData();
  }, [location]);

  return (
    <Box height={`calc(100vh - ${(height || 0) + 116}px)`}>
      <Card sx={{ height: "100%", overflow: "auto" }}>
        <Table>
          <TableHead>
            <StyledStickyTableRow sx={{ top: 0 }}>
              {isIndexing && (
                <TableCell component="th" width="60px">
                  №
                </TableCell>
              )}
              {columns?.map((column, index) => (
                <TableCell
                  width={
                    get(column, "width")
                      ? `${get(column, "width")}px`
                      : undefined
                  }
                  align={
                    get(column, "type", "text") === "number" ? "right" : "left"
                  }
                  key={index}
                >
                  {get(column, "headerKey")
                    ? t(get(column, "headerKey", ""))
                    : get(column, "header", "")}
                </TableCell>
              ))}
            </StyledStickyTableRow>
          </TableHead>
          <TableBody>
            {get(data, "status") === "loading" ||
            get(data, "status") === "initial" ? (
              [...Array.from({ length: 10 })]?.map((_, index: number) => (
                <TableRow key={index}>
                  {isIndexing && (
                    <TableCell>
                      <Skeleton animation="wave" height={24} />
                    </TableCell>
                  )}
                  {columns?.map((_, colIndex) => (
                    <TableCell key={`${index}_${colIndex}`}>
                      <Skeleton animation="wave" height={24} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : get(data, "status") === "failed" ? (
              <TableRow>
                <TableCell colSpan={cellLength}></TableCell>
              </TableRow>
            ) : get(data, "data.length", 0) > 0 ? (
              get(data, "data", [])?.map((item, index) => (
                <TableRow
                  hover
                  onClick={handleRowClick(item)}
                  key={get(item, dataKey, index)}
                >
                  {isIndexing && <TableCell>{index + 1}</TableCell>}
                  {columns?.map(({ renderComponent, ...column }, colIndex) => (
                    <TableCell
                      padding={
                        get(column, "type", "text") === "image"
                          ? "checkbox"
                          : "normal"
                      }
                      key={`${get(item, dataKey, index)}_${colIndex}`}
                    >
                      {renderComponent
                        ? renderComponent(item, index)
                        : column?.field
                        ? get(item, column?.field, column?.defaultValue)
                        : ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell height="100%" colSpan={cellLength}>
                  <NoData />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TablePagingRow
              dataLength={get(data, "total")}
              colSpan={cellLength}
            />
          </TableFooter>
        </Table>
      </Card>
    </Box>
  );
};

export default PaginationTable;
