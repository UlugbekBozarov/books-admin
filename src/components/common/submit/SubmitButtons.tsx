import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Trans } from "react-i18next";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { Delete } from "assets/icons";

interface SubmitButtonsProps {
  loading?: boolean;
  handleDelete?: () => void;
}

const SubmitButtons: FC<SubmitButtonsProps> = ({
  loading = false,
  handleDelete,
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box mt="20px">
      <Box
        display="flex"
        justifyContent={handleDelete ? "space-between" : "flex-end"}
      >
        {handleDelete && (
          <Button
            variant="contained"
            size="large"
            color="error"
            onClick={handleDelete}
            startIcon={<Delete />}
          >
            <Trans>delete</Trans>
          </Button>
        )}
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button variant="outlined" onClick={handleGoBack} size="large">
            <Trans>cancel</Trans>
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={
              loading && <CircularProgress size="20px" color="success" />
            }
          >
            <Trans>save</Trans>
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default memo(SubmitButtons);
