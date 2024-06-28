import React, { useEffect, useMemo, useRef, useState } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";

function DebounceSelect({
  fetchOptions,

  debounceTimeout = 800,
  ...props
}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      showSearch
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

function SearchSelectInput({
  fetchOptions,
  onChange,
  mode,
  defaultValue,
  name,
  ...props
}) {
  const [value, setValue] = useState(defaultValue || []);

  useEffect(() => {
    console.log("value", value);
  }, [value]);

  return (
    <DebounceSelect
      mode={mode || "single"}
      name={name}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        onChange && onChange(newValue);
      }}
      {...props}
      fetchOptions={fetchOptions}
    />
  );
}

export default SearchSelectInput;

// how to use this component in your code
// use this method to get the data from the api

// async function fetchUserList(username) {
//   let dataToSend = {
//     searchUser: username,
//   };
//   try {
//     const response = await userApi.getAllUser(1, dataToSend);
//     console.log("response.data.users", response.users);
//     return response.users.map((user) => ({
//       label: `${user.fullName} `,
//       value: user.fullName,
//     }));
//   } catch (error) {
//     console.error("Error fetching user list:", error);
//     return []; // return empty array in case of error
//   }
// }

// pass al this prop to the component like this

{
  /* <SearchSelectInput
                      placeholder="Select users"
                      fetchOptions={fetchUserList}
                      onChange={handleUserChange}
                    
                    /> */
}

// get data on change

// const handleUserChange = (newValue) => {
//   // Handle user selection change here
//   console.log("Selected user:", newValue);
// };
