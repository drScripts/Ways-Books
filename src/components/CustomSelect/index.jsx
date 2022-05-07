import React from "react";
import ReactSelect from "react-select";

export default function CustomSelect({
  options,
  placeHolder,
  className,
  onChange,
  name = "select",
  value,
  isMulti = false,
}) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#d2d2d240",
      border: "2px solid #bcbcbc ",
      color: "#333333",
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
    }),
  };

  const onChangeHandler = (data) => {
    if (isMulti) {
      onChange(data);
    } else {
      onChange({ name, value: data?.value });
    }
  };

  return (
    <ReactSelect
      options={options}
      placeholder={placeHolder}
      className={`${className}`}
      styles={customStyles}
      onChange={onChangeHandler}
      value={value}
      isMulti={isMulti}
    />
  );
}
