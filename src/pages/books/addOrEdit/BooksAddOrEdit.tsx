import { Box, Button, Card, Grid, Stack } from "@mui/material";
import { ControlledImageUploader, ControlledInput } from "components/form";
import { FormProvider, useForm } from "react-hook-form";
import { Trans } from "react-i18next";

const booksFormNames = {
  name: "name",
  category: "category_id",
  description: "description",
  image: "image",
};

const BooksAddOrEdit = () => {
  const formStore = useForm({
    defaultValues: {
      [booksFormNames.name]: "",
    },
  });

  const { handleSubmit } = formStore;

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
                    name={booksFormNames.name}
                    rules={{ required: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ControlledInput
                    labelKey="category"
                    name={booksFormNames.category}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledInput
                    multiline
                    labelKey="description"
                    name={booksFormNames.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledImageUploader
                    labelKey="image"
                    name={booksFormNames.image}
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
          <Box mt="20px">
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button variant="outlined">
                <Trans>cancel</Trans>
              </Button>
              <Button variant="contained">
                <Trans>save</Trans>
              </Button>
            </Stack>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};

export default BooksAddOrEdit;
