import { FC, SyntheticEvent } from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { get } from "lodash";

import { AutocompleteAddStaticOption } from "../../components";

interface ControlledAutocompleteProps {
  name: string;
  onFocus?: () => void;
  onChange?: (value: any, oldValue: any) => void;
  getOptionLabel?: (option: any) => string | undefined;
  getOptionLastItem?: (option: any) => string | undefined;
  onInputChange?: (event: SyntheticEvent<Element, Event>) => void;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  options?: Array<any>;
  isRequired?: boolean;
  loading?: boolean;
  isFilteredOption?: boolean;
  disabled?: boolean;
  disableClearable?: boolean;
  value?: any;
}

const ControlledAutocompleteAddStaticOption: FC<
  ControlledAutocompleteProps
> = ({ name, onChange, rules, options = [], ...props }) => {
  const { control } = useFormContext();

  const handleChangeAutocomplete =
    (fieldChange: (...event: any[]) => void, oldValue: any) =>
    (event: SyntheticEvent<Element, Event>, value: any) => {
      if (onChange) {
        fieldChange(value);
        onChange(value, oldValue);
      } else {
        fieldChange(value);
      }
    };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <AutocompleteAddStaticOption
          disableClearable={
            (
              typeof get(rules, "required", false) === "boolean"
                ? get(rules, "required", false)
                : get(rules, "required.value")
            )
              ? true
              : false
          }
          {...props}
          {...field}
          onChange={handleChangeAutocomplete(onChange, field?.value)}
          isRequired={!!get(rules, "required", false)}
          options={options}
          error={error}
        />
      )}
    />
  );
};

export default ControlledAutocompleteAddStaticOption;
