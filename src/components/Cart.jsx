import React from "react";

const Cart = () => {
  return (
    <div
      className="cartcontainer  w-[300px] h-[250px] rounded-lg p-[1rem] 
     bg-white shadow-cartshadow left-[1000px] fixed"
    >
      <div className="cartcount font-redhattextsemibold text-[#c73a0f]">
        Your Cart (0)
      </div>

      <div className="cartitems flex flex-col items-center">
        <div className="emptycartimg ">
          <img
            src="./assets/images/illustration-empty-cart.svg"
            alt="emptycart"
          />
        </div>

        <div className="emptycarttext font-redhattextbold text-[13px] text-[#ad8985]">
          <p>Your added items will appear here</p>
        </div>

      </div>
    </div>
  );
};

export default Cart;
