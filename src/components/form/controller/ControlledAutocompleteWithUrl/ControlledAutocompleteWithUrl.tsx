import { FC, useEffect, useRef, useState } from "react";
import { FieldValues, RegisterOptions } from "react-hook-form";
import { debounce, get } from "lodash";
import axios from "axios";

import { client } from "services/api";

import ControlledAutocompleteAddStaticOption from "../ControlledAutocompleteAddStaticOption/ControlledAutocompleteAddStaticOption";

interface ControlledAutocompleteWithUrlProps {
  name: string;
  labelKey?: string | undefined;
  itemValueKey?: string | undefined;
  url: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  requestParams?: object;
  isRequired?: boolean;
  loading?: boolean;
  isFilteredOption?: boolean;
  disabled?: boolean;
  filter?: (option: any) => boolean;
  resendRequestDependency?: Array<any>;
  // handleAdd;
}

interface StateType {
  status: "initial" | "loading" | "success" | "failed";
  data: Array<any>;
  total: number;
  error?: any;
  isSearched: boolean;
}

const ControlledAutocompleteWithUrl: FC<ControlledAutocompleteWithUrlProps> = ({
  name,
  url,
  requestParams = {},
  // handleAdd,
  isFilteredOption = false,
  filter,
  resendRequestDependency = [],
  ...props
}) => {
  const [state, setState] = useState<StateType>({
    status: "initial",
    data: [],
    total: 0,
    isSearched: false,
  });

  const cancelRef = useRef<any>(null);

  const getData = async (search?: string) => {
    if (typeof cancelRef.current === "function") {
      await cancelRef.current();
    }
    if (state?.status !== "loading")
      await setState((prev) => ({ ...prev, status: "loading" }));
    await client
      .get(url, {
        params: {
          limit: 20,
          ...requestParams,
          search,
        },
        cancelToken: new axios.CancelToken(async function executor(c) {
          cancelRef.current = await c;
        }),
      })
      .then((response) => {
        setState({
          status: "success",
          data: filter
            ? get(response, "content", []).filter(filter)
            : get(response, "content", []),
          total: get(response, "totalElements", 0),
          isSearched: !!search,
        });
      })
      .catch((error: any) => {
        setState({
          status: "failed",
          data: [],
          total: 0,
          error: error,
          isSearched: !!search,
        });
      });
  };

  const handleFocus = () => {
    if (
      get(state, "status", "initial") === "initial" ||
      get(state, "status", "initial") === "failed" ||
      get(state, "isSearched", false)
    )
      getData();
  };

  const handleInputChange = debounce((event) => {
    if (event) getData(event?.target?.value);
  }, 300);

  useEffect(() => {
    if (get(state, "status", "initial") !== "initial") {
      setState({
        status: "initial",
        data: [],
        total: 0,
        isSearched: false,
      });
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...resendRequestDependency]);

  return (
    <ControlledAutocompleteAddStaticOption
      name={name}
      // handleNewAdd={handleAdd}
      isFilteredOption={isFilteredOption}
      loading={state?.status === "loading"}
      onFocus={handleFocus}
      onInputChange={handleInputChange}
      {...props}
      options={get(state, "data", [])}
    />
  );
};

export default ControlledAutocompleteWithUrl;
