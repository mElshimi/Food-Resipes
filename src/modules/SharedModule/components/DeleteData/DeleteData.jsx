import React from "react";
import imgs from "../../../ImagesMoudel/components/Images/Images";
import "./DeleteData.css";
export default function DeleteData({ deleteItem }) {
  return (
    <>
      <div className="delete text-center mt-4">
        <img src={imgs.noData} alt="" />
        <h5 className="my-2">
          Delete This <span className="text-danger">{deleteItem}</span> ?
        </h5>
        <p>
          are you sure you want to delete this item ? if you are sure just click
          on delete it
        </p>
      </div>
    </>
  );
}
