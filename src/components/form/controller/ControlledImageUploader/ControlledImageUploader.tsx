import { FC, Fragment, useState } from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { Box, TextField } from "@mui/material";
import { get } from "lodash";

import { ImageSize } from "types";
// import { uploadClient } from "services/api/file";

import { Label, Error, ImageUploader, DisplayImage } from "../../components";

interface ControlledImageUploaderProps {
  labelKey?: string;
  accept?: string;
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  onChange?: (image: string) => void;
  size?: ImageSize;
}

const ControlledImageUploader: FC<ControlledImageUploaderProps> = ({
  labelKey,
  accept = "image/png, image/jpeg, image/jpg, image/svg, image/gif",
  name = "image",
  rules = {},
  onChange,
  size = "medium",
  ...props
}) => {
  const { control } = useFormContext();

  const [loading, setLoading] = useState(false);

  const handleChangeImage =
    (formChangeHandler: (...event: any[]) => void) => (event: any) => {
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

  const handleDeleteImage =
    (formChangeHandler: (...event: any[]) => void) => () => {
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
            htmlFor={`image-upload-${name}`}
            required={!!get(rules, "required", false)}
          >
            {labelKey}
          </Label>
          <Box>
            {field?.value ? (
              <DisplayImage
                handleDeleteImage={handleDeleteImage(formChangeHandler)}
                size={size}
                value={field?.value}
              />
            ) : (
              <TextField
                type="file"
                id={`image-upload-${name}`}
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
    />
  );
};

export default ControlledImageUploader;
