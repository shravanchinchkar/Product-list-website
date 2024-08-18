import React,{useContext} from "react";
import { productListContext } from "../context/context";

const VanillaPannaCotta = ({item,isSelected}) => {
  const value=useContext(productListContext);

  return (
    <div
      className="relative new-2sm:grid-cols-1 new-sm:col-start-1 new-sm:col-end-3 new-sm:justify-self-center new-md:col-auto"
      key={item.name}
    >
      <div
        className={
          isSelected.includes(item.name)
            ? "rounded-[10px] overflow-hidden border-[3px] border-[#c73a0f] new-xl:w-[250.65px] new-xl:h-[239.66px] new-md:w-[200px] new-lg:h-[200px] new-lg:m-auto new-xl:m-0 new-sm:w-[200px] new-2sm:w-[300px]"
            : "rounded-[10px] overflow-hidden new-xl:w-[250.65px] new-xl:h-[239.66px] new-md:w-[210px] new-lg:h-[210px] new-lg:m-auto new-xl:m-0 new-sm:w-[200px] new-2sm:w-[300px]"
        }
      >
        <img
          className="new-2sm:hidden new-md:block w-[100%] h-[100%]"
          src={item.image.desktop}
          alt={item.name}
        />
        <img
          className="new-2sm:hidden new-sm:block new-md:hidden w-[100%] h-[100%]"
          src={item.image.tablet}
          alt={item.name}
        />
        <img
          className="new-2sm:block new-sm:hidden w-[100%] h-[100%]"
          src={item.image.mobile}
          alt={item.name}
        />
        <div
          className={
            isSelected.includes(item.name)
              ? "w-[150px] h-[50px] flex justify-around items-center gap-[8px] absolute z-10 new-xl:top-[215px] new-xl:left-[50px] new-md:top-[170px] new-md:left-[30px] text-balck font-redhattextbold  rounded-[5rem] bg-[#c73a0f] new-2sm:top-[170px] new-2sm:left-[70px] new-sm:left-[25px] cursor-pointer"

              : "w-[150px] h-[50px] flex justify-center items-center gap-[8px] absolute z-10 new-xl:top-[215px] new-xl:left-[50px] new-lg:top-[180px] new-md:left-[30px] new-md:top-[170px] new-2sm:top-[170px] new-sm:left-[25px] new-2sm:left-[70px] text-balck font-redhattextbold  rounded-[5rem] border-[2px] cursor-pointer bg-white hover:text-[#c73a0f]  hover:border-[#c73a0f]"
          }
          id={item.name}
          onClick={value.addToCart}
        >
          <div className={isSelected.includes(item.name) ? "hidden" : "block"}>
            <img
              className="w-[100%] h-[100%]"
              src="/assets/images/icon-add-to-cart.svg"
              alt="cartimage"
            />
          </div>

          <div
            className={
              isSelected.includes(item.name)
                ? "w-[20px] h-[20px] minusimage flex  justify-center items-center p-[2px] rounded-[50%] border-[2px]"
                : "hidden"
            }
            id={item.name}
            onClick={value.decreaseItem}
          >
            <img
              src="/assets/images/icon-decrement-quantity.svg"
              alt="decerement"
            />
          </div>

          <div>
            <p
              className={
                isSelected.includes(item.name)
                  ? "text-[white] font-redhattextbold w-[25px] flex justify-center"
                  : "font-redhattextbold  text-[#260f08]"
              }
            >
              {isSelected.includes(item.name)
                ? value.selectedmenu.find((menu) => {
                    return menu.menuname === item.name;
                  })["count"]
                : `Add to cart`}
            </p>
          </div>

          <div
            className={
              isSelected.includes(item.name)
                ? "w-[20px] h-[20px] minusimage flex justify-center items-center p-[2px] rounded-[50%] border-[2px]"
                : " hidden"
            }
            id={item.name}
            onClick={value.increaseItem}
          >
            <img
              src="/assets/images/icon-increment-quantity.svg"
              alt="decerement"
            />
          </div>
        </div>
      </div>

      <div className="menuinfo mt-[3rem]">
        <div className="font-redhattextregular text-[15px] text-[#c9aea6]">
          {item.category}
        </div>
        <div className="font-redhattextbold">{item.name}</div>
        <div className="font-redhattextbold text-[#c73a0f]">
          ${item.price.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default VanillaPannaCotta;
