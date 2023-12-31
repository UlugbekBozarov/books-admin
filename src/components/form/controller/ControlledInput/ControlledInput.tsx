import { FC, Fragment } from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { TextField } from "@mui/material";
import { get } from "lodash";

import { Label, Error } from "../../components";

interface ControlledInputProps {
  labelKey?: string | undefined;
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  multiline?: boolean;
  disabled?: boolean;
  type?: "text" | "password" | "number" | undefined;
  onChange?: (value: string) => void | undefined;
}

const ControlledInput: FC<ControlledInputProps> = ({
  labelKey,
  name = "custom-input",
  rules = {},
  onChange,
  ...props
}) => {
  const { control } = useFormContext();

  const inputChangeHandler =
    (formChangeHandler: (...event: any[]) => void) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      formChangeHandler(get(event, "target.value", ""));
      if (onChange) {
        onChange(get(event, "target.value", ""));
      }
    };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { ref, onChange, ...field },
        fieldState: { error },
      }) => (
        <Fragment>
          <Label
            htmlFor={`input-${name}`}
            required={!!get(rules, "required", false)}
            disabled={get(props, "disabled", false)}
          >
            {labelKey}
          </Label>
          <TextField
            id={`input-${name}`}
            fullWidth
            {...props}
            {...field}
            inputRef={ref}
            error={!!error}
            value={field?.value || ""}
            onChange={inputChangeHandler(onChange)}
          />
          <Error error={error} />
        </Fragment>
      )}
    />
  );
};

export default ControlledInput;
