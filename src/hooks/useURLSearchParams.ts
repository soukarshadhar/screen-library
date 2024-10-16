import { useSearchParams } from "react-router-dom";

const useURLSearchParams = (key: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setValue = (value: string) => {
    const params: [string, string][] = [];
    searchParams.forEach((existingValue, existingKey) => {
      if (key !== existingKey) {
        params.push([existingKey, existingValue]);
      }
    });
    if (value) params.push([key, value]);

    setSearchParams(params);
  };

  return { value: searchParams.get(key) || "", setValue };
};

export default useURLSearchParams;
