import { useState } from "react";
import data from "../public/data.json";
import Cart from "./components/Cart";

function App() {
  const [selectedmenu, setselectedmenu] = useState([]);

  const addToCart = (e) => {
    const id = e.target.closest("div[id]").id; // Fetch id
    const item = data.find((item) => item.name === id); // Find the item in the data

    const existingItem = selectedmenu.find((menu) =>  menu.menuname === item.name);

    if (existingItem) {
      // If item already exists, increase its count
      setselectedmenu(
        selectedmenu.map((menu) =>
          menu.menuname === item.name
            ? { ...menu, count: menu.count + 1 }
            : menu
        )
      );
    } else {
      // If item does not exist, add it with a count of 1
      setselectedmenu([...selectedmenu, { menuname: item.name, count: 1 }]);
    }
  };

  setselectedmenu(selectedmenu.map((item)=>{
    item.menuname===existingItem.menuname
  }))
  const decreaseItem = (e) => {
    e.stopPropagation();
    const id = e.target.closest("div[id]").id; // Fetch id

    const existingItem = selectedmenu.find((menu) => menu.menuname === id);

    if (existingItem && existingItem.count > 1) {
      // Decrease the count if it's more than 1
      setselectedmenu(
        selectedmenu.map((menu) =>
          menu.menuname === id
            ? { ...menu, count: menu.count - 1 }
            : menu
        )
      );
    } else {
      // Remove the item from the cart if the count reaches 0
      setselectedmenu(selectedmenu.filter((menu) => menu.menuname !== id));
    }
  };

  const increaseItem = (e) => {
    e.stopPropagation();
    const id = e.target.closest("div[id]").id; // Fetch id

    setselectedmenu(
      selectedmenu.map((menu) =>
        menu.menuname === id
          ? { ...menu, count: menu.count + 1 }
          : menu
      )
    );
  };

  const isSelected = selectedmenu.map((item) => item.menuname);

  return (
    <>
      {/* Following is the menucontainer */}
      <div className="menucontainer flex flex-col gap-[1rem] w-[800px] ">
        {/* Menu title */}
        <div className="menutitle font-redhattextsemibold text-[20px]">
          Desserts
        </div>

        {/* Menu List */}
        <div className="grid grid-cols-3 gap-x-[1.5rem] gap-y-[1.5rem] min-h-[50vh]">
          {data.map((item) => {
            const selectedItem = selectedmenu.find(
              (menu) => menu.menuname === item.name
            );

            return (
              <div className="relative" key={item.name}>
                {/* Following div consist of menu image and add to cart section */}
                <div
                  className={
                    isSelected.includes(item.name)
                      ? "rounded-[10px] overflow-hidden border-[3px] border-[#c73a0f]"
                      : "rounded-[10px] overflow-hidden"
                  }
                >
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
                        ? "bg-[#c73a0f] w-[150px] h-[50px] flex justify-around items-center gap-[8px] absolute z-10 top-[215px] left-[40px] text-black font-redhattextbold rounded-[5rem] cursor-pointer"
                        : "w-[150px] h-[50px] flex justify-center items-center gap-[8px] absolute z-10 top-[215px] left-[40px] text-black font-redhattextbold rounded-[5rem] border-[2px] cursor-pointer bg-white hover:text-[#c73a0f] hover:border-[#c73a0f]"
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
                          ? "w-[20px] h-[20px] minusimage flex justify-center items-center p-[2px] rounded-[50%] border-[2px]"
                          : "hidden"
                      }
                      id={item.name}
                      onClick={decreaseItem}
                    >
                      <img
                        src="/assets/images/icon-decrement-quantity.svg"
                        alt="decrement"
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
                          ? `${selectedItem.count}`
                          : `Add to cart`}
                      </p>
                    </div>

                    <div
                      className={
                        isSelected.includes(item.name)
                          ? "w-[20px] h-[20px] minusimage flex justify-center items-center p-[2px] rounded-[50%] border-[2px]"
                          : "hidden"
                      }
                      id={item.name}
                      onClick={increaseItem}
                    >
                      <img
                        src="/assets/images/icon-increment-quantity.svg"
                        alt="increment"
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
      <Cart selectedmenu={selectedmenu} />
    </>
  );
}
export default App;
