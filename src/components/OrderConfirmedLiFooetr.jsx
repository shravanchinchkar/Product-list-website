import React, { useContext } from "react";
import { productListContext } from "../context/context";
import { memo } from "react";

const OrderConfirmedLiFooetr = () => {
  const value = useContext(productListContext);
  return (
    <li className="flex justify-between pt-[20px] pb-[10px]">
      <div>
        <p>order Total</p>
      </div>
      <div>
        <p className="font-redhattextsemibold">${value.totalamount}</p>
      </div>
    </li>
  );
};
export default memo(OrderConfirmedLiFooetr);
