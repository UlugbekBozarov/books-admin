import { useNavigate } from "react-router-dom";
import { Trans } from "react-i18next";
import { Box, Button } from "@mui/material";
import { get } from "lodash";

import { Add } from "assets/icons";
import { PaginationTable } from "components/tables";
import { DisplayImage } from "components/form";

const BooksList = () => {
  const navigate = useNavigate();

  const goToAdd = () => {
    navigate("/books/add");
  };

  const handleRowClick = (item: any) => {
    navigate(`/books/info/${get(item, "id")}`);
  };

  return (
    <Box>
      <Box id="filter-wrapper-id" pb="20px">
        <Button
          variant="contained"
          size="large"
          onClick={goToAdd}
          startIcon={<Add />}
        >
          <Trans>add</Trans>
        </Button>
      </Box>
      <PaginationTable
        url="books"
        paramFields={[
          {
            key: "page",
            field: "page",
          },
          {
            key: "limit",
            field: "limit",
          },
          {
            key: "search",
            field: "search",
          },
        ]}
        onRowClick={handleRowClick}
        columns={[
          {
            width: 50,
            type: "image",
            headerKey: "books.image",
            renderComponent: (data) => (
              <Box p={1}>
                <DisplayImage
                  size={44}
                  value={get(data, "image")}
                  alt={get(data, "name")}
                />
              </Box>
            ),
          },
          {
            width: 400,
            headerKey: "books.name",
            field: "name",
          },
          {
            width: 200,
            headerKey: "books.category",
            field: "category.name",
          },
          {
            headerKey: "books.description",
            field: "description",
          },
        ]}
      />
    </Box>
  );
};

export default BooksList;
