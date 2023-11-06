import { ChangeEvent, FC } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { debounce, get } from "lodash";

import { StyledTextField } from "./SearchInput.style";

interface SearchInputProps {
  name?: string;
}

const SearchInput: FC<SearchInputProps> = ({ name = "search" }) => {
  const { t } = useTranslation();
  let [searchParams, setSearchParams] = useSearchParams();

  const handleChangeSearchInput = debounce(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchParams((params) => {
        if (get(event, "target.value")) {
          params.set(name, get(event, "target.value"));
        } else {
          params.delete(name);
        }
        return params;
      });
    },
    300
  );

  return (
    <StyledTextField
      type="search"
      name={name}
      defaultValue={searchParams.get(name)}
      label={t("search")}
      onChange={handleChangeSearchInput}
      placeholder={t("search")}
    />
  );
};

export default SearchInput;
