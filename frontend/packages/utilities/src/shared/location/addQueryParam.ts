import { SetURLSearchParams } from "react-router-dom";

type AddQueryParam = (key: string, value: string, seachParams: URLSearchParams, setSearchParams: SetURLSearchParams) => void;
export const addQueryParam: AddQueryParam = (key, value, searchParams, setSearchParams) => {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set(key, value);
  setSearchParams(newSearchParams, { replace: true });
};

