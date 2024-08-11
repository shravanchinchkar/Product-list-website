import { useState,useEffect } from "react";
import data from "../public/data.json";
import Cart from "./components/Cart";

function App() {
  let menudata = data;
  const [selectedmenu, setselectedmenu] = useState([]);
  const [menucount, setmenucount] = useState(1);


 
  let addToCart = (e) => {
    let id = e.target.closest("div[id]").id; //fetch id
    let name = menudata.find((item) => { //fetch name from menudata that which is equal to id
      return item.name === id;
    });
    let menuselected = name.name;
    if (id === menuselected) {
      if (selectedmenu.length === 0) {
        setselectedmenu([
          ...selectedmenu,
          { menuname: menuselected, count: 1 },
        ]);
      }
      if (selectedmenu.length > 0) {
        setselectedmenu([
          ...selectedmenu,
          { menuname: menuselected, count: 1 },
        ]);
      }
    }
  };

  console.log("Selected menu:", selectedmenu);

  // Following isSelected is an array which  consist of name of the selected menu
  const isSelected = selectedmenu.map((item) => {
    return item.menuname;
  });
  console.log("isSelected:", isSelected);

  let decreaseItem = (e) => {
    e.stopPropagation(); //To avoid event bubbling
    let id = e.target.closest("div[id]").id; //Gets the id of targeted element
    let index = selectedmenu.findIndex((item) => {
      return item.menuname === id;
    });
    selectedmenu[index].count = selectedmenu[index].count - 1;
    setselectedmenu(selectedmenu);

    // To check whether the count is decreased or not
    console.log("After decrement:", selectedmenu);
  };

  let increaseItem = (e) => {
    e.stopPropagation();
    let id = e.target.closest("div[id]").id; //Gets the id of targeted element
    let index = selectedmenu.findIndex((item) => {
      return item.menuname === id;
    });
    selectedmenu[index].count = selectedmenu[index].count + 1;
    setselectedmenu(selectedmenu);

    // To check whether the count is increased or not
    console.log("After increment:", selectedmenu);
  };


  return (
    <>
      {/* Following is the menucontainer */}

      <div className="menucontainer flex flex-col gap-[1rem] w-[800px]">
        {/* Menu title */}
        <div className="menutitle font-redhattextsemibold text-[20px]">
          Desserts
        </div>

        {/* Menu List */}
        <div className="grid grid-cols-3 gap-x-[1.5rem] gap-y-[1.5rem] min-h-[50vh]">
          {menudata.map((item) => {
             let selectedItem = selectedmenu.find(
              (menu) => menu.menuname === item.name
            );
            console.log("Hello selected :",selectedItem)
            console.log("Hello selected :",typeof selectedItem)
        
          
            return (
              <div className="relative" key={item.name}>
                {/* Following div consist of menu image and add to cart section */}
                <div className="rounded-[10px] overflow-hidden">
                  <img
                    className="object-contain sm:hidden md:block"
                    src={item.image.desktop}
                    alt="waffles"
                  />
                  <img
                    className="object-contain sm:block md:hidden"
                    src={item.image.tablet}
                    alt="waffles"
                  />

                  <div
                    className={
                      isSelected.includes(item.name)
                        ? "bg-[#c73a0f] w-[150px] h-[50px] flex justify-around items-center gap-[8px] absolute z-10 top-[215px] left-[40px] text-balck font-redhattextbold  rounded-[5rem]  cursor-pointer"
                        : "w-[150px] h-[50px] flex justify-center items-center gap-[8px] absolute z-10 top-[215px] left-[40px] text-balck font-redhattextbold  rounded-[5rem] border-[2px] cursor-pointer bg-white hover:text-[#c73a0f] hover:border-[#c73a0f]"
                    }
                    id={item.name}
                    onClick={addToCart}
                  >
                    <div
                      className={
                        isSelected.includes(item.name) ? "hidden" : "block"
                      }
                    >
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
                      onClick={decreaseItem}
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
                            : "font-redhattextbold"
                        }
                      >
                        {isSelected.includes(item.name)
                          ? `${menucount}`
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
                      onClick={increaseItem}
                    >
                      <img
                        src="/assets/images/icon-increment-quantity.svg"
                        alt="decerement"
                      />
                    </div>
                  </div>
                </div>

                {/* Following div consist of menu title,description and price */}
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
          })}
        </div>
      </div>

      {/* Following is the cart container */}
      <Cart />
    </>
  );
}
export default App;
