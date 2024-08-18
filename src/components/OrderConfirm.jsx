import React from "react";
import { useContext } from "react";
import OrderConfirmedLiFooetr from "./OrderConfirmedLiFooetr";
import { productListContext } from "../context/context";

const OrderConfirm = () => {
  let value = useContext(productListContext);
  let newOrder=()=>{
    console.log("Hello")
    value.setdisplayOrderConfirmedCard("none")
    value.setselectedmenu([])
  }

  return (
    <div
      className="absolute top-0 left-0 z-10 bg-black bg-opacity-50  w-[100%] h-[100%] justify-center new-sm:items-center new-2sm:items-end"
      style={{ display: value.displayOrderConfirmedCard }}
    >
      <div className="flex flex-col gap-[0.5rem] z-10 w-[450px] p-[2rem] bg-white new-sm:rounded-lg new-2sm:rounded-bl-none new-2sm:rounded-br-none  shadow-cartshadow">
        <div className="w-[40px] h-[40px]">
          <img
            className="w-[100%] h-[100%]"
            src="/assets/images/icon-order-confirmed.svg"
            alt="orderconfirmed"
          />
        </div>
        <div>
          <p className="font-redhattextsemibold text-[2rem]">Order Confirmed</p>
          <p className="font-redhattextregular text-[12px]">
            We hope you enjoy your food!
          </p>
        </div>
        <ul className="p-[1rem] bg-[#fcf9f7] rounded-lg">
          {value.selectedmenu.map((item) => {
            return (
              <li
                className="flex justify-between border-b-[1px] pb-[10px] pt-[10px]"
                key={item.menuname}
              >
                <div className="flex justify-center items-center gap-[10px]">
                  <div className="w-[35px] h-[35px] overflow-hidden rounded-sm">
                    <img
                      className="w-[100%] h-[100%] object-fill"
                      // "/assets/images/image-waffle-thumbnail.jpg"
                      src={item.thumbnail}
                      alt="wafflethumbnail"
                    />
                  </div>

                  <div className="font-redhattextbold text-[15px]">
                    <p>{item.menuname}</p>
                    <div className="flex gap-[10px]">
                      <p className="text-[#c73a0f]">{item.count}x</p>
                      <p className="text-[#c9aea6]">
                        @ ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </li>
            );
          })}
          {/* <li className="flex justify-between border-b-[1px] pb-[10px] pt-[10px]">
            <div className="flex justify-center items-center gap-[10px]">
              <div className="w-[35px] h-[35px] overflow-hidden rounded-sm">
                <img
                  className="w-[100%] h-[100%] object-fill"
                  src="/assets/images/image-waffle-thumbnail.jpg"
                  alt="wafflethumbnail"
                />
              </div>

              <div className="font-redhattextbold text-[15px]">
                <p>Waffle with Berries</p>
                <div className="flex gap-[10px]">
                  <p className="text-[#c73a0f]">1x</p>
                  <p className="text-[#c9aea6]">@ $6.50</p>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <p>$6.50</p>
            </div>
          </li> */}
          <OrderConfirmedLiFooetr />
        </ul>
        <button
          className="bg-[#c73a0f] text-white font-redhattextbold p-[10px] rounded-full mt-[1rem]"
          onClick={newOrder}
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirm;
