import { useNavigate } from "react-router-dom";
import { Trans } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Card, Grid, Stack } from "@mui/material";

import {
  ControlledAutocompleteWithUrl,
  ControlledImageUploader,
  ControlledInput,
} from "components/form";
import { SubmitButtons } from "components/common";

const booksFormNames = {
  name: "name",
  category: "category_id",
  description: "description",
  image: "image",
};

const BooksAddOrEdit = () => {
  const navigate = useNavigate();

  const formStore = useForm({
    defaultValues: {
      [booksFormNames.name]: "",
      [booksFormNames.category]: null,
      [booksFormNames.description]: "",
      [booksFormNames.image]: undefined,
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
                    name={booksFormNames.name}
                    rules={{ required: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ControlledAutocompleteWithUrl
                    labelKey="category"
                    url=""
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
          <SubmitButtons />
        </Box>
      </form>
    </FormProvider>
  );
};

export default BooksAddOrEdit;
