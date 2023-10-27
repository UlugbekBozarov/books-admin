import { Trans } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Card, Grid, Stack } from "@mui/material";
import { get } from "lodash";

import { ControlledInput } from "components/form";
import { client } from "services/api";
import { useEffect } from "react";
import { SubmitButtons } from "components/common";

const categoryFormNames = {
  name: "name",
  description: "description",
};

const CategoriesAddOrEdit = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const formStore = useForm({
    defaultValues: {
      [categoryFormNames.name]: "",
    },
  });

  const { handleSubmit, reset } = formStore;

  const handleGoBack = () => {
    navigate(-1);
  };

  const getCategoryData = () => {
    client.get(`categories/by-id/${categoryId}`).then((response) => {
      reset({
        [categoryFormNames.name]: get(
          response,
          `data.${categoryFormNames.name}`
        ),
        [categoryFormNames.description]: get(
          response,
          `data.${categoryFormNames.description}`
        ),
      });
    });
  };

  const handleDeleteCategory = () => {
    client.delete(`categories/${categoryId}`).then(() => {
      navigate(-1);
    });
  };

  const submitHandler = handleSubmit((data) => {
    client[categoryId ? "put" : "post"](
      `categories${categoryId ? `/${categoryId}` : ""}`,
      {
        [categoryFormNames.name]: get(data, categoryFormNames.name),
        [categoryFormNames.description]: get(
          data,
          categoryFormNames.description
        ),
      }
    )
      .then((response) => {
        navigate(-1);
        // console.log("Response: ", response);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  });

  useEffect(() => {
    if (categoryId) {
      getCategoryData();
    }
  }, []);

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
                {/* <Grid item xs={12}>
                  <ControlledImageUploader
                    labelKey="image"
                    name={categoryFormNames.image}
                  />
                </Grid> */}
              </Grid>
            </Box>
          </Card>
          <SubmitButtons
            handleDelete={categoryId ? handleDeleteCategory : undefined}
          />
        </Box>
      </form>
    </FormProvider>
  );
};

export default CategoriesAddOrEdit;
