import { Trans } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";

import { Add } from "assets/icons";

const TestList = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const goToAdd = () => {
    navigate(`/tests/add`);
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
      TestList
    </Box>
  );
};

export default TestList;
