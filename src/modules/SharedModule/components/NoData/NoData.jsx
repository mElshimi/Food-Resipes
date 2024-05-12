import React from "react";
import imgs from "../../../ImagesMoudel/components/Images/Images";

export default function NoData() {
  return (
    <>
      <section>
        <div className="container-fluid text-center mt-5">
          <img src={imgs.noData} alt="" />
          <h4 className="my-3">No Data !</h4>
        </div>
      </section>
    </>
  );
}
