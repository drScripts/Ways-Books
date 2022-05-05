import React from "react";
import ReactSelect from "react-select";

export default function CustomSelect({
  options,
  placeHolder,
  className,
  onChange,
  name,
  value,
}) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#d2d2d240",
      border: "2px solid #bcbcbc ",
      color: "#333333",
    }),
  };

  const onChangeHandler = ({ value }) => {
    onChange({ name, value });
  };

  return (
    <ReactSelect
      options={options}
      placeholder={placeHolder}
      className={`${className}`}
      styles={customStyles}
      onChange={onChangeHandler}
      value={value}
    />
  );
}
