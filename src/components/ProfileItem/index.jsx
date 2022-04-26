import React from "react";

const ProfileItem = ({ src, title, value }) => {
  return (
    <div className="d-flex align-items-center gap-3 mb-3">
      <img src={src} alt="User Email" width={30} height={30} />
      <div>
        <p className={"fw-bold m-none"}>{value}</p>
        <p className={"text-grey m-none"}>{title}</p>
      </div>
    </div>
  );
};

export default ProfileItem;
