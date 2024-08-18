import { useState } from "react";
import data from "../public/data.json";
import Cart from "./components/Cart";
import OrderConfirm from "./components/OrderConfirm";
import { productListContext } from "./context/context";
import VanillaPannaCotta from "./components/VanillaPannaCotta";

function App() {
  let menudata = data;
  const [selectedmenu, setselectedmenu] = useState([]);
  const [displayOrderConfirmedCard, setdisplayOrderConfirmedCard] =
    useState("none");
  const [totalamount, settotalamount] = useState(0);

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
        {
          menuname: targetedItem.name,
          count: 1,
          price: targetedItem.price,
          thumbnail: targetedItem.image.thumbnail,
        },
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
      <productListContext.Provider
        value={{
          selectedmenu,
          setselectedmenu,
          totalamount,
          settotalamount,
          displayOrderConfirmedCard,
          setdisplayOrderConfirmedCard,
          addToCart,
          decreaseItem,
          increaseItem
        }}
      >
        {/* Following is the menucontainer */}
        <div className="menucontainer new-md:m-auto new-xl:ml-[2rem] new-2xl:ml-[9rem] flex flex-col gap-[1rem]    new-lg:w-[800px] new-md:w-[800px] new-sm:w-[500px] new-sm:m-auto new-lg:ml-[2rem] new-xl:mb-[2rem] new-2sm:w-[300px] new-2sm:m-auto ">

          <div className="menutitle font-redhattextsemibold text-[30px] new-sm:text-center new-md:text-start">
            Desserts
          </div>

          <div className="grid new-2sm:grid-cols-1 new-sm:grid-cols-2 new-md:grid-cols-3 gap-x-[1.5rem] gap-y-[1.5rem] min-h-[50vh]">
            {menudata.map((item,index) => {
              if (index === 8) {
                return (
                  <VanillaPannaCotta item={item} isSelected={isSelected}/>
                );
              }
              return (
                <div className="relative new-sm:justify-self-center new-md:justify-self-auto" key={item.name}>
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
                          ? "w-[150px] h-[50px] flex justify-around items-center gap-[8px] absolute z-10 new-xl:top-[215px] new-xl:left-[50px] new-md:top-[170px] new-md:left-[30px] new-2sm:top-[170px] new-sm:left-[25px] new-2sm:left-[70px] text-balck font-redhattextbold  rounded-[5rem] bg-[#c73a0f]  cursor-pointer"

                          : "w-[150px] h-[50px] flex justify-center items-center gap-[8px] absolute z-10 new-xl:top-[215px] new-xl:left-[50px] new-lg:top-[180px] new-md:left-[30px] new-md:top-[170px] new-2sm:top-[170px] new-sm:left-[25px] new-2sm:left-[70px] text-balck font-redhattextbold  rounded-[5rem] border-[2px] cursor-pointer bg-white hover:text-[#c73a0f] hover:border-[#c73a0f]"
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
                              : "font-redhattextbold  text-[#260f08]"
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

        <Cart />

        <OrderConfirm />
      </productListContext.Provider>
    </>
  );
}
export default App;
