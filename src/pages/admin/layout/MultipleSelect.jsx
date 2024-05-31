import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space } from "antd";
import style from "../studios/studio.module.css";

const studioamenitiesList = [
  "Wifi",
  "AC",
  "DJ",
  "Piano",
  "Drum",
  "Car Parking",
  "Banjo",
];

function MultipleSelect({ selectedItems = [], setSelectedItems = () => {} }) {
  const [items, setItems] = useState(studioamenitiesList);
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const filteredAmenities = items.filter((o) => !selectedItems.includes(o));

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (name && !items.includes(name)) {
      setItems([...items, name]);
      setName("");
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className={style.addNewStudioinputBox}>
      <label htmlFor="Amenities">Amenities</label>
      <Select
        required
        id="Amenities"
        mode="multiple"
        className=""
        placeholder="Select one or more Amenities"
        value={selectedItems}
        onChange={setSelectedItems}
        options={filteredAmenities.map((item) => ({
          value: item,
          label: item,
        }))}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider
              style={{
                margin: "8px 0",
              }}
            />
            <Space
              key="input-button-space" // Ensure proper re-rendering
              style={{
                padding: "0 8px 4px",
              }}
            >
              <Input
                key="select-input" // Ensure proper re-rendering
                placeholder="Please enter item"
                ref={inputRef}
                value={name}
                onChange={onNameChange}
                onKeyDown={(e) => e.stopPropagation()}
              />
              <Button
                key="select-button" // Ensure proper re-rendering
                type="text"
                icon={<PlusOutlined />}
                onClick={addItem}
              >
                Add item
              </Button>
            </Space>
          </>
        )}
      />
    </div>
  );
}

export default MultipleSelect;
