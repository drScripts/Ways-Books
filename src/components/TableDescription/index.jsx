import React from "react";

const TableDescription = ({ description }) => {
  return (
    <div className={"p-3"}>
      <h3>Description</h3>
      <p className={"text-description"}>{description}</p>
    </div>
  );
};

export default TableDescription;
