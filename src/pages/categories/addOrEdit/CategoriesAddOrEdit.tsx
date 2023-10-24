import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Card, Grid, Stack } from "@mui/material";

import { ControlledImageUploader, ControlledInput } from "components/form";

const categoryFormNames = {
  name: "name",
  category: "category_id",
  description: "description",
  image: "image",
};

const CategoriesAddOrEdit = () => {
  const navigate = useNavigate();

  const formStore = useForm({
    defaultValues: {
      [categoryFormNames.name]: "",
      [categoryFormNames.category]: null,
      [categoryFormNames.description]: "",
      [categoryFormNames.image]: undefined,
    },
  });

  const { handleSubmit } = formStore;

  const handleGoBack = () => {
    navigate(-1);
  };

  const submitHandler = handleSubmit((data) => {
    console.log("Data: ", data);
  });

  return (
    <FormProvider {...formStore}>
      <form onSubmit={submitHandler}>
        <Box maxWidth="1000px">
          <Card>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <ControlledInput
                    labelKey="name"
                    name={categoryFormNames.name}
                    rules={{ required: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledInput
                    multiline
                    labelKey="description"
                    name={categoryFormNames.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledImageUploader
                    labelKey="image"
                    name={categoryFormNames.image}
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
          <Box mt="20px">
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button variant="outlined" onClick={handleGoBack}>
                <Trans>cancel</Trans>
              </Button>
              <Button type="submit" variant="contained">
                <Trans>save</Trans>
              </Button>
            </Stack>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};

export default CategoriesAddOrEdit;
