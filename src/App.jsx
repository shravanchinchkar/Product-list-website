import { useState } from "react";
import data from "../public/data.json";
import Cart from "./components/Cart";
import OrderConfirm from "./components/OrderConfirm";
import { productListContext } from "./context/context";


function App() {
  let menudata = data;
  const [selectedmenu, setselectedmenu] = useState([]);
  const [displayOrderConfirmedCard, setdisplayOrderConfirmedCard] = useState("none")
  const [totalamount, settotalamount] = useState(0)

  // Following handler handles the add to cart button
  let addToCart = (e) => {
    let id = e.target.closest("div[id]").id; //fetch id of the targeted div
    console.log("Id is:", id); //Print the id
    let targetedItem = menudata.find((item) => {
      //fetch object from the menudata which has name equal to id
      return item.name === id;
    });
    console.log("TargetedItem is:", targetedItem); //Prints the targetedItem which is an object

    // existingItem consist of existing selected menu items
    let existingItem = selectedmenu.find((item) => {
      return item.menuname === targetedItem.name;
    });

    console.log("Existing item: ", existingItem); //Prints the object
    if (existingItem) {
      setselectedmenu(
        selectedmenu.map((item) => {
          return item.menuname === targetedItem.name ? { ...item } : item;
        })
      );
    } else {
      setselectedmenu([
        ...selectedmenu,
        { menuname: targetedItem.name, count: 1, price: targetedItem.price ,thumbnail:targetedItem.image.thumbnail},
      ]);
    }
  };

  console.log("Selected menu:", selectedmenu);

  // Following isSelected is an array which  consist of name of the selected menu
  const isSelected = selectedmenu.map((item) => {
    return item.menuname;
  });
  console.log("isSelected:", isSelected);

  // Following handler is used to decrement the quantity of selected menu
  let decreaseItem = (e) => {
    e.stopPropagation(); //To avoid event bubbling
    let id = e.target.closest("div[id]").id; //Gets the id of targeted element
    let index = selectedmenu.findIndex((item) => {
      return item.menuname === id;
    });
    if (selectedmenu[index].count <= 1) {
      let disselectedItem = selectedmenu.filter((item) => {
        return item.menuname !== id;
      });
      setselectedmenu(disselectedItem);
    } else {
      const updatedMenu = [...selectedmenu];
      updatedMenu[index].count -= 1;
      setselectedmenu(updatedMenu);
    }
    // To check whether the count is decreased or not
    console.log("After decrement:", selectedmenu);
  };

  // Following handler is used to increment the quantity of the menu
  let increaseItem = (e) => {
    e.stopPropagation();
    let id = e.target.closest("div[id]").id; //Gets the id of targeted element
    let index = selectedmenu.findIndex((item) => {
      return item.menuname === id;
    });
    const updatedMenu = [...selectedmenu];
    updatedMenu[index].count += 1;
    setselectedmenu(updatedMenu);
    // To check whether the count is increased or not
    console.log("After increment:", selectedmenu);
  };

  return (
    <>
      <productListContext.Provider value={{selectedmenu,setselectedmenu,totalamount,settotalamount,displayOrderConfirmedCard,setdisplayOrderConfirmedCard}}>
        {/* Following is the menucontainer */}
        <div className="menucontainer flex flex-col gap-[1rem] w-[800px] mb-[2rem]">
          {/* Menu title */}
          <div className="menutitle font-redhattextsemibold text-[20px]">
            Desserts
          </div>

          {/* Menu List */}
          <div className="grid grid-cols-3 gap-x-[1.5rem] gap-y-[1.5rem] min-h-[50vh]">
            {menudata.map((item) => {
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
                              : "font-redhattextbold text-[#260f08]"
                          }
                        >
                          {isSelected.includes(item.name)
                            ? selectedmenu.find((menu) => {
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

        {/* Order Confirmed message Cart */}
        <OrderConfirm />
      </productListContext.Provider>
    </>
  );
}
export default App;
