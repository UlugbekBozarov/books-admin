import { useNavigate } from "react-router-dom";
import { Trans } from "react-i18next";
import { Box, Button } from "@mui/material";
import { get } from "lodash";

import { Add } from "assets/icons";
import { PaginationTable } from "components/tables";
import { SearchInput } from "components/filter";

const CategoriesList = () => {
  const navigate = useNavigate();

  const goToAdd = () => {
    navigate("/categories/add");
  };

  const handleRowClick = (item: any) => {
    navigate(`/categories/edit/${get(item, "id")}`);
  };

  return (
    <Box>
      <Box
        id="filter-wrapper-id"
        display="flex"
        justifyContent="space-between"
        pb="20px"
      >
        <Box>
          <Button
            variant="contained"
            size="large"
            onClick={goToAdd}
            startIcon={<Add />}
          >
            <Trans>add</Trans>
          </Button>
        </Box>
        <Box>
          <SearchInput />
        </Box>
      </Box>
      <PaginationTable
        url="categories"
        onRowClick={handleRowClick}
        paramFields={[
          {
            key: "page",
            field: "page",
          },
          {
            key: "limit",
            field: "limit",
          },
        ]}
        columns={[
          {
            width: 400,
            headerKey: "categories.name",
            field: "name",
          },
          {
            headerKey: "categories.description",
            field: "description",
          },
          {
            width: 150,
            headerKey: "categories.booksCount",
            field: "booksCount",
          },
        ]}
      />
    </Box>
  );
};

export default CategoriesList;
