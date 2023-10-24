import { useNavigate } from "react-router-dom";
import { Trans } from "react-i18next";
import { Box, Button } from "@mui/material";
import { get } from "lodash";

import { Add } from "assets/icons";
import { PaginationTable } from "components/tables";

const CategoriesList = () => {
  const navigate = useNavigate();

  const goToAdd = () => {
    navigate("/categories/add");
  };

  const handleRowClick = (item: any) => {
    navigate(`/category/info/${get(item, "id")}`);
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
        url="posts"
        onRowClick={handleRowClick}
        columns={[
          {
            width: 400,
            headerKey: "categories.name",
            field: "title",
            // field: "name",
          },
          {
            headerKey: "categories.description",
            field: "description",
          },
          {
            width: 150,
            headerKey: "categories.booksCount",
            field: "category.name",
          },
        ]}
      />
    </Box>
  );
};

export default CategoriesList;
