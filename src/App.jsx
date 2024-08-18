import { useState } from "react";
import data from "../public/data.json";
import Cart from "./components/Cart";
import OrderConfirm from "./components/OrderConfirm";
import { productListContext } from "./context/context";
import VanillaPannaCotta from "./components/VanillaPannaCotta";
import Menu from "./components/Menu";

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
          increaseItem,
        }}
      >
        {/* Following is the menucontainer */}
        <div className="menucontainer new-md:m-auto new-xl:ml-[2rem] new-2xl:ml-[9rem] flex flex-col gap-[1rem]    new-lg:w-[800px] new-md:w-[800px] new-sm:w-[500px] new-sm:m-auto new-lg:ml-[2rem] new-xl:mb-[2rem] new-2sm:w-[300px] new-2sm:m-auto ">
          <div className="menutitle font-redhattextsemibold text-[30px] new-sm:text-center new-md:text-start">
            Desserts
          </div>

          <div className="grid new-2sm:grid-cols-1 new-sm:grid-cols-2 new-md:grid-cols-3 gap-x-[1.5rem] gap-y-[1.5rem] min-h-[50vh]">
            {menudata.map((item, index) => {
              if (index === 8) {
                return (
                  <VanillaPannaCotta
                    key={item.name}
                    item={item}
                    isSelected={isSelected}
                  />
                );
              }
              return (
                <Menu item={item} key={item.name} isSelected={isSelected}/>
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