import { useNavigate } from "react-router-dom";
import { Trans } from "react-i18next";
import { Box, Button } from "@mui/material";

import { Add } from "assets/icons";

const CategoriesList = () => {
  const navigate = useNavigate();

  const goToAdd = () => {
    navigate("/add");
  };

  return (
    <Box>
      <Box mb="20px">
        <Button
          variant="contained"
          size="large"
          onClick={goToAdd}
          startIcon={<Add />}
        >
          <Trans>add</Trans>
        </Button>
      </Box>
      CategoriesList
    </Box>
  );
};

export default CategoriesList;
