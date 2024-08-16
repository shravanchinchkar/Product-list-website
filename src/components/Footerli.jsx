import React from "react";
import { memo,useContext} from "react";
import { productListContext } from "../context/context";



const Footerli = ({ displayfooterli, totalamount }) => {
  const value=useContext(productListContext)
  let displayOrderConfirmed=()=>{
    value.setdisplayOrderConfirmedCard("flex")
  }

  return (
    <li className="mt-[1rem]" style={{ display: displayfooterli }}>
      <div className="flex justify-between items-center">
        <div className="font-redhattextbold text-[15px] text-[#260f08]">
          Order Total
        </div>
        <div className="font-redhattextsemibold text-[25px]">
          ${totalamount}
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center bg-[#fcf9f7] rounded-md mt-[1rem] mb-[1rem]">
          <div className="w-[20px] h-[20px]">
            <img
              src="/assets/images/icon-carbon-neutral.svg"
              alt="carbon-neutral"
              className="w-[100%] h-[100%]"
            />
          </div>
          <p className="text-[12px] p-[1rem] font-redhattextbold">
            This is a{" "}
            <span className="font-redhattextsemibold">carbon-neutral</span>{" "}
            delivery
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="w-[100%] p-[0.5rem] rounded-full bg-[#c73a0f] text-white font-redhattextbold"
          onClick={displayOrderConfirmed}
        >
          Confirm order
        </button>
      </div>
    </li>
  );
};

export default memo(Footerli);
