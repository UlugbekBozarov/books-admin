import { useNavigate } from "react-router-dom";
import { Trans } from "react-i18next";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Box, Button, Card, Grid, Stack } from "@mui/material";

import {
  ControlledAutocompleteWithUrl,
  ControlledInput,
} from "components/form";
import { v4 } from "uuid";
import { get } from "lodash";
import {
  StyledEditButton,
  TestContent,
  VariantCard,
} from "./TestAddOrEdit.style";
import { Edit } from "assets/icons";

interface ITestVariant {
  id: string;
  order: number;
  answer: string;
  isCorrectAnswer: boolean;
}

interface ITest {
  id: string;
  question: string;
  variants: Array<ITestVariant>;
}

const testFormNames = {
  name: "name",
  duration: "duration",
  tests: "tests",
  book: "book_id",
  topic: "topic_id",
};

const TestAddOrEdit = () => {
  const navigate = useNavigate();

  const formStore = useForm({
    defaultValues: {
      [testFormNames.name]: "",
      [testFormNames.book]: null,
      [testFormNames.topic]: null,
      [testFormNames.duration]: 60,
      [testFormNames.tests]: [
        {
          id: v4(),
          question: "Savolni",
          variants: [
            {
              order: 1,
              id: v4(),
              answer: "Birinchi javob",
              isCorrectAnswer: true,
            },
            {
              order: 2,
              id: v4(),
              answer: "Ikkinchi javob",
              isCorrectAnswer: false,
            },
            {
              order: 3,
              id: v4(),
              answer: "Uchinchi javob",
              isCorrectAnswer: false,
            },
            {
              order: 4,
              id: v4(),
              answer: "To'rtinchi javob",
              isCorrectAnswer: false,
            },
          ],
        },
        {
          id: v4(),
          question: "Savolni",
          variants: [
            {
              order: 1,
              id: v4(),
              answer: "Birinchi javob",
              isCorrectAnswer: true,
            },
            {
              order: 2,
              id: v4(),
              answer: "Ikkinchi javob",
              isCorrectAnswer: false,
            },
            {
              order: 3,
              id: v4(),
              answer: "Uchinchi javob",
              isCorrectAnswer: false,
            },
            {
              order: 4,
              id: v4(),
              answer: "To'rtinchi javob",
              isCorrectAnswer: false,
            },
          ],
        },
        {
          id: v4(),
          question: "Savolni",
          variants: [
            {
              order: 1,
              id: v4(),
              answer: "Birinchi javob",
              isCorrectAnswer: true,
            },
            {
              order: 2,
              id: v4(),
              answer: "Ikkinchi javob",
              isCorrectAnswer: false,
            },
            {
              order: 3,
              id: v4(),
              answer: "Uchinchi javob",
              isCorrectAnswer: false,
            },
            {
              order: 4,
              id: v4(),
              answer: "To'rtinchi javob",
              isCorrectAnswer: false,
            },
          ],
        },
        {
          id: v4(),
          question: "Savolni",
          variants: [
            {
              order: 1,
              id: v4(),
              answer: "Birinchi javob",
              isCorrectAnswer: true,
            },
            {
              order: 2,
              id: v4(),
              answer: "Ikkinchi javob",
              isCorrectAnswer: false,
            },
            {
              order: 3,
              id: v4(),
              answer: "Uchinchi javob",
              isCorrectAnswer: false,
            },
            {
              order: 4,
              id: v4(),
              answer: "To'rtinchi javob",
              isCorrectAnswer: false,
            },
          ],
        },
      ],
    },
  });

  const { control, handleSubmit } = formStore;

  const testsFields = useFieldArray({
    name: "tests",
    control,
  });

  const { fields } = testsFields;

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChangeActive =
    (test: ITest, testIndex: number, variantIndex: number) => () => {
      let newTest = { ...test };
      newTest.variants = newTest.variants?.map(
        (variant: ITestVariant, index: number) => ({
          ...variant,
          isCorrectAnswer: index === variantIndex ? true : false,
        })
      );
      //   update(testIndex, newTest);
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
                    labelKey="tests.subject"
                    name={testFormNames.name}
                    rules={{ required: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ControlledInput
                    labelKey="tests.duration"
                    name={testFormNames.duration}
                    rules={{ required: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ControlledAutocompleteWithUrl
                    labelKey="tests.book"
                    url=""
                    name={testFormNames.book}
                    rules={{ required: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ControlledAutocompleteWithUrl
                    labelKey="tests.topic"
                    url=""
                    name={testFormNames.topic}
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
          <Box mt="20px">
            {fields?.map((field: ITest, index) => (
              <TestContent key={get(field, "id")}>
                <Card sx={{ position: "relative", display: "flex" }}>
                  <Box width="50px" display="flex" p={2}>
                    {index + 1}.
                  </Box>
                  <Box width="calc(100% - 50px)" p={2}>
                    {get(field, "question", "")}
                  </Box>
                  <StyledEditButton className="test-edit-icon">
                    <Edit />
                  </StyledEditButton>
                </Card>
                <Grid container spacing={1} mt="0px">
                  {get(field, "variants", [])?.map((variant, variantIndex) => (
                    <Grid item xs={12} sm={6} key={get(variant, "id")}>
                      <VariantCard
                        isActive={get(variant, "isCorrectAnswer", false)}
                        onClick={handleChangeActive(field, index, variantIndex)}
                      >
                        <Box width="50px"></Box>
                        <Box>{get(variant, "answer", "")}</Box>
                      </VariantCard>
                    </Grid>
                  ))}
                </Grid>
              </TestContent>
            ))}
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

export default TestAddOrEdit;
