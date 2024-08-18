import React from "react";
import { memo } from "react";

const EmptyCartLi = () => {
  return (
    <li className="cartitems flex flex-col items-center ">
      <div className="emptycartimg ">
        <img src="/assets/images/illustration-empty-cart.svg" alt="emptycart" />
      </div>
      <div className="emptycarttext font-redhattextbold text-[13px] text-[#ad8985]">
        <p>Your added items will appear here</p>
      </div>
    </li>
  );
};

export default memo(EmptyCartLi);
