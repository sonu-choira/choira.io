import React, { useEffect, useMemo, useRef, useState } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import { partnerAccess } from "../../../config/partnerAccess";

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 800,

  ...props
}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const [noData, setNoData] = useState(false); // Track empty state
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      // Filter numeric input based on partnerAccess
      const processedValue = partnerAccess
        ? value.replace(/[^0-9]/g, "")
        : value;

      if (processedValue === "") {
        setOptions([]);
        setFetching(false);
        setNoData(true); // No data found
        return;
      }

      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      setNoData(false); // Reset no data state

      fetchOptions(processedValue).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
        if (newOptions?.length === 0) {
          setNoData(true); // No data found
        } else {
          setNoData(false);
        }
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout, partnerAccess]);

  const handleInput = (e) => {
    if (partnerAccess) {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    }
  };

  return (
    <Select
      showSearch
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={
        fetching ? <Spin size="small" /> : noData ? "User not found" : null
      }
      {...props}
      options={options}
      onInput={handleInput}
    />
  );
}

function SearchSelectInput({
  fetchOptions,
  onChange,
  mode,
  defaultValue,
  name,
  partnerAccess, // Add partnerAccess prop
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
      partnerAccess={partnerAccess} // Pass partnerAccess prop
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
//     const response = await userApi.getAllUser(20,1, dataToSend);
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
