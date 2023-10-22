import { Fragment, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, TextField } from "@mui/material";

// import { uploadClient } from "services/api/file";

import { Label, Error, ImageUploader, DisplayImage } from "../../components";

const ControlledImageUploader = ({
  defaultValue,
  translationKey,
  label,
  accept = "image/png, image/jpeg, image/jpg, image/svg, image/gif",
  name = "image",
  rules = {},
  onChange,
  width,
  height,
  size = "medium",
  ...props
}) => {
  const { control } = useFormContext();

  const [loading, setLoading] = useState(false);

  const handleChangeImage = (formChangeHandler) => (event) => {
    setLoading(true);
    const reader = new FileReader();
    if (event.target.files.length) {
      reader.readAsDataURL(event.target.files[0]);
      // uploadClient(event.target.files[0])
      //   .then((response) => {
      //     formChangeHandler(response);
      //     if (onChange) {
      //       onChange(response);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     setLoading(false);
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });
    }
  };

  const handleDeleteImage = (formChangeHandler) => () => {
    formChangeHandler("");
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { ref, onChange: formChangeHandler, ...field },
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
            {field?.value ? (
              <DisplayImage
                width={width}
                height={height}
                handleDeleteImage={handleDeleteImage(formChangeHandler)}
                size={size}
                value={field?.value}
              />
            ) : (
              <TextField
                type="file"
                id={name}
                {...props}
                {...field}
                value={field?.value || ""}
                onChange={handleChangeImage(formChangeHandler)}
                inputRef={ref}
                InputProps={{
                  inputComponent: ImageUploader,
                  inputProps: {
                    accept,
                    loading,
                    width,
                    height,
                    size,
                  },
                }}
                error={!!error}
              />
            )}
          </Box>
          <Error error={error} />
        </Fragment>
      )}
      defaultValue={defaultValue}
    />
  );
};

export default ControlledImageUploader;
