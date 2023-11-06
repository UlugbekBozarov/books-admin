import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trans } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Card, Grid, Stack } from "@mui/material";
import { get } from "lodash";

import { ControlledEditor, ControlledInput } from "components/form";
import { client } from "services/api";
import { HtmlContent, Spinner } from "components/common";

const topicFormNames = {
  bookId: "bookId",
  bookName: "bookName",
  name: "name",
  content: "content",
};

const TopicAddOrEdit = () => {
  const navigate = useNavigate();
  const { bookId, topicId } = useParams();
  const [byIdLoading, setByIdLoading] = useState(topicId ? true : false);

  const formStore = useForm({
    defaultValues: {
      [topicFormNames.name]: "",
      [topicFormNames.content]: "<p>Hello World</p>",
    },
  });

  const { watch, handleSubmit, reset } = formStore;

  const getTopic = () => {
    client
      .get(`topics/by-id/${topicId}`)
      .then((response) => {
        reset({
          [topicFormNames.name]: get(response, topicFormNames.name),
          [topicFormNames.content]: get(response, topicFormNames.content),
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .finally(() => {
        setTimeout(() => {
          setByIdLoading(false);
        }, 0);
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const submitHandler = handleSubmit((data) => {
    client[topicId ? "put" : "post"](`topics${topicId ? `/${topicId}` : ""}`, {
      [topicFormNames.bookId]: bookId,
      [topicFormNames.name]: get(data, topicFormNames.name),
      [topicFormNames.content]: get(data, topicFormNames.content),
    })
      .then((response) => {
        navigate(-1);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  });

  useEffect(() => {
    // getBook();
    if (topicId) {
      getTopic();
    }
  }, []);

  return (
    <FormProvider {...formStore}>
      <form onSubmit={submitHandler}>
        <Box maxWidth="1000px">
          <Card>
            <Box p={2}>
              {byIdLoading ? (
                <Spinner />
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <ControlledInput
                      labelKey="topic"
                      name={topicFormNames.name}
                      rules={{ required: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ControlledEditor
                      labelKey="topics.content"
                      name={topicFormNames.content}
                    />
                  </Grid>
                </Grid>
              )}
            </Box>
          </Card>
          <Box maxWidth="1000px" mt="20px">
            <Card>
              <Box p={2}>
                <HtmlContent content={watch(topicFormNames.content)} />
              </Box>
            </Card>
          </Box>
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
