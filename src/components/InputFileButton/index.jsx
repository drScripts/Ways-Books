import React from "react";
import styles from "./InputFileButton.module.css";

const InputFileButton = ({
  src,
  alt = "",
  id,
  accept = "image/*",
  fileName = "File Name",
  onChangeHandler,
}) => {
  const onChange = (e) => {
    const file = e?.target?.files[0];

    const url = URL.createObjectURL(file);
    onChangeHandler({ file, url, name: e.target.name });
  };

  return (
    <div className="d-flex align-items-center gap-3">
      <label htmlFor={id} className={`${styles.btnInput}`}>
        <input
          type="file"
          name={id}
          id={id}
          hidden
          accept={accept}
          onChange={onChange}
        />
        {alt}
        <img src={src} alt={alt} width={17} height={25} className={"ms-3"} />
      </label>
      <h6 className="m-none">{fileName}</h6>
    </div>
  );
};

export default InputFileButton;
