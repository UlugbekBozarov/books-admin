import { FC, useEffect, useRef, useState } from "react";
import { FieldValues, RegisterOptions } from "react-hook-form";
import { debounce, get } from "lodash";
import axios from "axios";

import { REQUEST_STATUSES } from "constants/Request.constants";
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
  requestBody?: object;
  isRequired?: boolean;
  loading?: boolean;
  isFilteredOption?: boolean;
  disabled?: boolean;
  filter?: (option: any) => boolean;
  resendRequestDependency?: Array<any>;
  // handleAdd;
}

const ControlledAutocompleteWithUrl: FC<ControlledAutocompleteWithUrlProps> = ({
  name,
  url,
  requestBody = {},
  // handleAdd,
  isFilteredOption = false,
  filter,
  resendRequestDependency = [],
  ...props
}) => {
  const [state, setState] = useState({
    status: REQUEST_STATUSES.initial,
    data: [],
    total: 0,
    isSearched: false,
  });

  const cancelRef = useRef<any>(null);

  const getData = async (search?: string) => {
    if (typeof cancelRef.current === "function") {
      await cancelRef.current();
    }
    if (state?.status !== REQUEST_STATUSES.loading)
      await setState((prev) => ({ ...prev, status: REQUEST_STATUSES.loading }));
    await client
      .post(
        url,
        {
          page: 1,
          limit: 20,
          ...requestBody,
          search,
        },
        {
          cancelToken: new axios.CancelToken(async function executor(c) {
            cancelRef.current = await c;
          }),
        }
      )
      .then((response) => {
        console.log("response: ", response);
        // setState({
        //   status: REQUEST_STATUSES.success,
        //   data: filter
        //     ? get(response, "data.data", []).filter(filter)
        //     : get(response, "data.data", []),
        //   total: get(response, "data.total", 0),
        //   isSearched: !!search,
        // });
      })
      .catch((error) => {
        // setState({
        //   status: REQUEST_STATUSES.failed,
        //   data: [],
        //   total: 0,
        //   error: error,
        //   isSearched: !!search,
        // });
      });
  };

  const handleFocus = () => {
    if (
      get(state, "status", "initial") === REQUEST_STATUSES.initial ||
      get(state, "status", "initial") === REQUEST_STATUSES.failed ||
      get(state, "isSearched", false)
    )
      getData();
  };

  const handleInputChange = debounce((event) => {
    if (event) getData(event?.target?.value);
  }, 300);

  useEffect(() => {
    if (get(state, "status", "initial") !== REQUEST_STATUSES.initial) {
      setState({
        status: REQUEST_STATUSES.initial,
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
      loading={state?.status === REQUEST_STATUSES.loading}
      // onFocus={handleFocus}
      onInputChange={handleInputChange}
      {...props}
      options={get(state, "data", [])}
    />
  );
};

export default ControlledAutocompleteWithUrl;
