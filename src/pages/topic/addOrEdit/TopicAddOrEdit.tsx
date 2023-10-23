// import React from 'react'

import { Box, Button, Card, Grid, Stack } from "@mui/material";
import { ControlledInput } from "components/form";
import { FormProvider, useForm } from "react-hook-form";
import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";

const topicFormNames = {
  bookName: "book_name",
  name: "name",
  content: "content",
};

const TopicAddOrEdit = () => {
  const navigate = useNavigate();

  const formStore = useForm({
    defaultValues: {
      [topicFormNames.name]: "",
      [topicFormNames.content]: "",
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
                    labelKey="bookName"
                    disabled
                    name={topicFormNames.bookName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ControlledInput
                    labelKey="topic"
                    name={topicFormNames.name}
                    rules={{ required: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledInput
                    multiline
                    labelKey="description"
                    name={topicFormNames.content}
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

export default TopicAddOrEdit;
