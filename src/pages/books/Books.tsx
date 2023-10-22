import { useNavigate } from "react-router-dom";
import { Trans } from "react-i18next";
import { Box, Button } from "@mui/material";

import { Add } from "assets/icons";

const Books = () => {
  const navigate = useNavigate();

  const goToAdd = () => {
    navigate("/add");
  };

  return (
    <Box>
      <Box mb="20px" mt="10px">
        <Button
          variant="contained"
          size="large"
          onClick={goToAdd}
          startIcon={<Add />}
        >
          <Trans>add</Trans>
        </Button>
      </Box>
      Books
    </Box>
  );
};

export default Books;
