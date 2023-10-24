import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { get } from "lodash";

import { Add } from "assets/icons";
import { PaginationTable } from "components/tables";

const TestList = () => {
  const navigate = useNavigate();

  const goToAdd = () => {
    navigate(`/tests/add`);
  };

  const handleRowClick = (item: any) => {
    navigate(`/info/${get(item, "id")}`);
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
            headerKey: "books.name",
            field: "title",
            // field: "name",
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

export default TestList;
