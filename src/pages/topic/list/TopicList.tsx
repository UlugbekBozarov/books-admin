import { useNavigate, useParams } from "react-router-dom";
import { Trans } from "react-i18next";
import { Box, Button } from "@mui/material";

import { Add } from "assets/icons";

const TopicList = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const goToAdd = () => {
    navigate(`/${bookId}/topic/add`);
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
      TopicsList
    </Box>
  );
};

export default TopicList;
