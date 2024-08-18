import React from "react";
import { memo, useState, useContext, useEffect } from "react";
import Footerli from "./Footerli";
import EmptyCartLi from "./EmptyCartLi";
import { productListContext } from "../context/context";

const Cart = () => {
  const value = useContext(productListContext);
  const menusInCart = value.selectedmenu;
  console.log("menusInCart:", menusInCart);

  useEffect(() => {
    let payableamountofitem = menusInCart.map((item) => {
      return (item.count * item.price).toFixed(2);
    });
    console.log("Updated:", payableamountofitem);
    let amountpayable = payableamountofitem
      .reduce((acc, curr) => acc + parseFloat(curr), 0)
      .toFixed(2);
    console.log("amount payable:", amountpayable);
    value.settotalamount(amountpayable);
  }, [menusInCart]);

  let removeItemFromCart = (e) => {
    let id=e.target.closest("div[id]").id;
    let updatedmenusInCart=menusInCart.filter((item)=>{
      return item.menuname!=id;
    })
    value.setselectedmenu(updatedmenusInCart);
  };

  return (
    <ul
      className="cartcontainer new-sm:ml-auto new-sm:mr-auto new-sm:mt-[1rem] new-lg:mt-0 new-sm:mb-[2rem] new-xl:mr-[2rem] new-2xl:mr-[9rem]  new-sm:w-[400px] new-lg:mr-[2rem] new-lg:w-[300px] h-max rounded-lg p-[1rem] 
     bg-white shadow-cartshadow new-2sm:w-[300px] new-2sm:ml-auto mr-auto mt-auto mb-[1rem]"
    >
      <li className="cartcount font-redhattextsemibold text-[#c73a0f]">
        Your Cart ({menusInCart.length})
      </li>

      {menusInCart.length === 0 ? (
        <EmptyCartLi />
      ) : (
        menusInCart.map((item) => {
          return (
            <li
              className="flex justify-between pb-[0.5rem] border-b-[2px] mt-[1rem]"
              key={item.menuname}
            >
              <div className="w-[200px]">
                <div className="font-redhattextbold text-[#260f08]">
                  {item.menuname}
                </div>
                <div className="font-redhattextbold flex gap-[15px] text-[15px]">
                  <p className="text-[#c73a0f]">{item.count}x</p>
                  <p className="text-[#c9aea6]">@ ${item.price.toFixed(2)}</p>
                  <p className="text-[#87635a]">
                    ${(item.count * item.price).toFixed(2)}
                  </p>
                </div>
              </div>
              <div
                className="w-[25px] cursor-pointer"
                onClick={removeItemFromCart}
                id={item.menuname}
              >
                <img
                  className="w-[100%] h-[100%]"
                  src="/assets/images/icon-remove-item.svg"
                  alt="cancle"
                />
              </div>
            </li>
          );
        })
      )}
      {/* Following is the footer li */}
      {menusInCart.length === 0 ? (
        <Footerli displayfooterli={"none"} />
      ) : (
        <Footerli displayfooterli={"block"} totalamount={value.totalamount} />
      )}
    </ul>
  );
};
export default memo(Cart);