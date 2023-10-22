import { Fragment, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Stack, TextField } from "@mui/material";

// import { uploadClient } from "services/api/file";

import { Label, Error, ImageUploader, DisplayImage } from "../../components";
// import { uploadClient } from "services/api/client";

const ControlledMultiImageUpload = ({
  defaultValue = [],
  translationKey,
  label,
  accept = "image/png, image/jpeg, image/jpg, image/svg, image/gif",
  name = "custom-input",
  rules = {},
  onChange,
  width,
  height,
  size = "medium",
  ...props
}) => {
  const { control } = useFormContext();

  const [loading, setLoading] = useState(false);

  const handleChangeImage =
    (formChangeHandler, values = []) =>
    (event) => {
      setLoading(true);
      const reader = new FileReader();
      if (event.target.files.length) {
        reader.readAsDataURL(event.target.files[0]);
        // uploadClient(event.target.files[0])
        //   .then((response) => {
        //     formChangeHandler([...values, response]);
        //     if (onChange) {
        //       onChange([...values, response], response);
        //     }
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   })
        //   .finally(() => {
        //     setLoading(false);
        //   });
      }
    };

  const handleDeleteImage =
    (formChangeHandler, values = [], imageIndex) =>
    () => {
      formChangeHandler(values?.filter((_, index) => index !== imageIndex));
    };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { ref, onChange: formChangeHandler, value, ...field },
        fieldState: { error },
      }) => (
        <Fragment>
          <Label
            htmlFor={name}
            required={rules?.required}
            isTranslation={!!translationKey}
          >
            {translationKey || label}
          </Label>
          <Box>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
            >
              {(value || [])?.map((image, index) => (
                <DisplayImage
                  width={width}
                  height={height}
                  handleDeleteImage={handleDeleteImage(
                    formChangeHandler,
                    value,
                    index
                  )}
                  size={size}
                  value={image}
                  key={image}
                />
              ))}
              <TextField
                type="file"
                id={name}
                accept={accept}
                {...props}
                {...field}
                onChange={handleChangeImage(formChangeHandler, value)}
                inputRef={ref}
                InputProps={{
                  inputComponent: ImageUploader,
                  inputProps: {
                    loading,
                    width,
                    height,
                    size,
                  },
                }}
                error={!!error}
              />
            </Stack>
          </Box>
          <Error error={error} />
        </Fragment>
      )}
      defaultValue={defaultValue}
    />
  );
};

export default ControlledMultiImageUpload;
