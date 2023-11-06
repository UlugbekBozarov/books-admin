import { Error, Label, SunEditor } from "components/form/components";
import { get } from "lodash";
import React, { FC, Fragment } from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

interface ControlledEditorProps {
  labelKey?: string | undefined;
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  disabled?: boolean;
  // onChange?: (value: string) => void | undefined;
}

const ControlledEditor: FC<ControlledEditorProps> = ({
  labelKey,
  name,
  rules,
  ...props
}) => {
  const { control } = useFormContext();

  const editorChangeHandler =
    (formChangeHandler: (...event: any[]) => void) => (value?: String) => {
      formChangeHandler(value);
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
          <SunEditor
            id={`input-${name}`}
            {...props}
            {...field}
            onChange={editorChangeHandler(onChange)}
            ref={ref}
          />
          <Error error={error} />
        </Fragment>
      )}
    />
  );
};

export default ControlledEditor;
