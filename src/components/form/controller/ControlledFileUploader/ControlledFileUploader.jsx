import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, TextField } from "@mui/material";

import { Label, Error } from "../../components";
import { FileUploader } from "./upload";

const ControlledFileUploader = ({
  defaultValue,
  translationKey,
  label,
  name = "custom-input",
  rules = {},
  onChange,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <Fragment>
          <Label
            htmlFor={name}
            required={rules?.required}
            isTranslation={!!translationKey}
          >
            {translationKey || label}
          </Label>
          <Box>
            <TextField
              type="file"
              fullWidth
              id={name}
              {...props}
              {...field}
              inputRef={ref}
              value={field?.value || ""}
              InputProps={{
                inputComponent: FileUploader,
                // componentsProps: { input: { fileTypes } },
              }}
              error={!!error}
            />
          </Box>
          <Error error={error} />
        </Fragment>
      )}
      defaultValue={defaultValue}
    />
  );
};

export default ControlledFileUploader;
