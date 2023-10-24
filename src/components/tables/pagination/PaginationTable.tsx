import {
  FC,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
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

import { IStatus } from "types";
import { NoData } from "components/form";
import { useResize } from "hooks";
import { client } from "services/api";

import { TablePagingRow } from "../components";
import { StyledStickyTableRow } from "./PaginationTable.style";
import axios from "axios";
import { REQUEST_STATUSES } from "constants/Request.constants";

interface IColumn {
  headerKey?: string;
  type?: "text" | "number" | "image";
  header?: string;
  field?: string;
  width?: number;
  renderComponent?: (data: any, index: number) => string | ReactNode;
}

interface PaginationTableProps {
  isIndexing?: boolean;
  dataKey?: string;
  filterContentId?: string;
  url: string;
  onRowClick?: (item: any) => void;
  columns?: Array<IColumn>;
}

const PaginationTable: FC<PaginationTableProps> = ({
  isIndexing = true,
  dataKey = "id",
  filterContentId = "filter-wrapper-id",
  url,
  onRowClick,
  columns,
}) => {
  const location = useLocation();
  const { t } = useTranslation();

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

  const getData = () => {
    if (canceledToken.current) {
      canceledToken.current();
    }
    setData({
      data: [],
      total: 0,
      status: "loading",
    });
    client
      .get(url, {
        cancelToken: new CancelToken(async function executor(token) {
          canceledToken.current = token;
        }),
      })
      .then((response) => {
        setTimeout(() => {
          setData({
            data: get(response, "data", []),
            total: get(response, "data.length", 0),
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
    console.log("Rendering");
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
            {get(data, "status") === "loading" ? (
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
                        ? get(item, column?.field, "")
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
              dataLength={get(data, "data.length")}
              colSpan={cellLength}
            />
          </TableFooter>
        </Table>
      </Card>
    </Box>
  );
};

export default PaginationTable;
