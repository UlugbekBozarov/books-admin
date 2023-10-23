import { Fragment, forwardRef, MouseEvent, SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import { FieldError, Noop } from "react-hook-form";
import {
  Autocomplete,
  Box,
  CircularProgress,
  MenuItem,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { get } from "lodash";

import {
  StyledAdd,
  StyledAddMenuItem,
  StyledSpan,
} from "./AutocompleteAddStaticOption.style";
import Label from "../label/Label";
import NoData from "../noData/NoData";
import Error from "../error/Error";

const filter = createFilterOptions();

interface AutocompleteAddStaticOptionProps {
  getOptionLabel?: any;
  getOptionLastItem?: any;
  options?: Array<any> | undefined;
  name: string;
  onBlur: Noop;
  labelKey?: string | undefined;
  itemValueKey?: string | undefined;
  handleNewAdd?:
    | ((option: any) => (event: MouseEvent<HTMLLIElement, MouseEvent>) => void)
    | undefined;
  isRequired?: boolean;
  loading?: boolean;
  isFilteredOption?: boolean;
  disabled?: boolean;
  onFocus?: () => void;
  onChange?: (event: SyntheticEvent<Element, Event>, value: any) => void;
  onInputChange?: (event: SyntheticEvent<Element, Event>) => void;
  error?: FieldError | undefined;
  disableClearable?: boolean;
  value?: any;
}

const AutocompleteAddStaticOption = forwardRef(
  (
    {
      getOptionLabel = (option: any) => get(option, "name", "") || "",
      getOptionLastItem,
      name = "autocomplete",
      itemValueKey = "_id",
      labelKey,
      options = [],
      handleNewAdd,
      isRequired,
      error,
      loading,
      isFilteredOption = true,
      ...props
    }: AutocompleteAddStaticOptionProps,
    ref: any
  ) => {
    console.log("options: ", options);
    const { t } = useTranslation();

    return (
      <Fragment>
        <Label htmlFor={name} required={isRequired} disabled={props?.disabled}>
          {labelKey}
        </Label>
        <Autocomplete
          id={name}
          fullWidth
          {...props}
          ref={ref}
          loading={loading}
          noOptionsText={<NoData />}
          options={options}
          filterOptions={(options, params) => {
            const filtered = isFilteredOption
              ? filter(options, {
                  inputValue: get(params, "inputValue", ""),
                  getOptionLabel: (option) => {
                    return `${getOptionLabel(option)} ${
                      getOptionLastItem ? getOptionLastItem(option) : ""
                    }`;
                  },
                })
              : options;
            const { inputValue } = params;
            !!handleNewAdd &&
              filtered.push({
                role: "button",
                selected: true,
                type: "new",
                label: "+ Add",
                value: inputValue,
              });
            return filtered;
          }}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={(option, value) =>
            get(option, itemValueKey, undefined) ===
            get(value, itemValueKey, null)
          }
          renderOption={(props, option: any) => {
            if (get(option, "type") === "new") {
              return (
                <Fragment key={get(option, itemValueKey) || "new_options"}>
                  {!options?.length && <NoData />}
                  <StyledAddMenuItem
                    {...props}
                    // onClick={handleNewAdd ? handleNewAdd(option) : undefined}
                    role="button"
                  >
                    <StyledSpan title={option?.value}>
                      {option?.value}
                    </StyledSpan>
                    <StyledAdd>+ {t("common.button.add")}</StyledAdd>
                  </StyledAddMenuItem>
                </Fragment>
              );
            } else {
              return (
                <MenuItem {...props} key={get(option, itemValueKey)}>
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <span>{getOptionLabel(option)}</span>
                    {getOptionLastItem && (
                      <small style={{ color: "#999" }}>
                        {getOptionLastItem(option)}
                      </small>
                    )}
                  </Box>
                </MenuItem>
              );
            }
          }}
          renderInput={({ InputLabelProps, ...params }) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                ),
              }}
              error={!!error}
            />
          )}
          slotProps={{
            popper: {
              sx: {
                "& .MuiAutocomplete-listbox": {
                  paddingBottom: !!handleNewAdd ? "0px" : "8px",
                },
              },
            },
          }}
        />
        <Error error={error} />
      </Fragment>
    );
  }
);

export default AutocompleteAddStaticOption;
