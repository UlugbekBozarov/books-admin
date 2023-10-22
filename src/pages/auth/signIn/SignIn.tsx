import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { Grid } from "@mui/material";

import { ControlledInput } from "components/form";

import AuthLayout from "../layout/AuthLayout";

const formNames = {
  username: "username",
  password: "password",
};

const SignIn = () => {
  const { t } = useTranslation();

  const formStore = useForm({
    defaultValues: {
      [formNames.username]: "",
      [formNames.password]: "",
    },
  });
  const { handleSubmit } = formStore;

  const submitHandler = handleSubmit((data) => {
    console.log("Data: ", data);
  });

  return (
    <AuthLayout
      onSubmit={submitHandler}
      submitText="submit"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
    >
      <FormProvider {...formStore}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ControlledInput
              labelKey="username"
              name={formNames.username}
              rules={{
                required: true,
                minLength: {
                  value: 4,
                  message: t("errors.min_length", {
                    value: 4,
                  }),
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledInput
              type="password"
              labelKey="password"
              name={formNames.password}
              rules={{
                required: true,
                minLength: {
                  value: 6,
                  message: t("errors.min_length", {
                    value: 6,
                  }),
                },
              }}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </AuthLayout>
  );
};

export default SignIn;
