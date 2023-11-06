import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Card, Grid } from "@mui/material";
import { get } from "lodash";

import {
  ControlledAutocompleteWithUrl,
  ControlledImageUploader,
  ControlledInput,
} from "components/form";
import { SubmitButtons } from "components/common";
import { client } from "services/api";

const booksFormNames = {
  name: "name",
  category: "category_id",
  description: "description",
  image: "image",
};

const BooksAddOrEdit = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const formStore = useForm({
    defaultValues: {
      [booksFormNames.name]: "",
      [booksFormNames.category]: null,
      [booksFormNames.image]: undefined,
    },
  });

  const { handleSubmit, reset } = formStore;

  const getBookById = () => {
    try {
      client
        .get(`books/by-id/${bookId}`)
        .then((response) => {
          reset({
            [booksFormNames.name]: get(response, booksFormNames.name),
            [booksFormNames.category]: get(response, "category", null),
            [booksFormNames.image]: get(response, booksFormNames.image),
            [booksFormNames.description]: get(
              response,
              booksFormNames.description
            ),
          });
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const submitHandler = handleSubmit((data) => {
    try {
      client[bookId ? "put" : "post"](`books${bookId ? `/${bookId}` : ""}`, {
        name: get(data, "name"),
        categoryId: get(data, `${booksFormNames.category}.id`),
        description: get(data, "description"),
        image: get(data, "image"),
      })
        .then(() => {
          navigate(-1);
        })
        .catch((error) => {
          console.log("Error client catch: ", error);
        });
    } catch (error) {
      console.log("Error: ", error);
    }
  });

  useEffect(() => {
    if (bookId) {
      getBookById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    name={booksFormNames.name}
                    rules={{ required: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ControlledAutocompleteWithUrl
                    labelKey="category"
                    url="categories"
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
