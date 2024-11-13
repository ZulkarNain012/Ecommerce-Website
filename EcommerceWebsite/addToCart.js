import { getProductFromLS } from "./getCartProduct";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

getProductFromLS();

export const addToCart = (event, id, stock) => {
  let arrLocalStorageProduct = getProductFromLS();

  const currentProductElem = document.querySelector(`#card${id}`);
  let quantity = currentProductElem.querySelector(".productQuantity").innerText;
  let price = currentProductElem.querySelector(".productPrice").innerText;

  price = price.replace("₹", "");

  let existingProd = arrLocalStorageProduct.find(
    (currProduct) => currProduct.id === id
  );

  if (existingProd) {
    if (quantity > 1) {
      quantity = Number(existingProd.quantity) + Number(quantity);
      price = Number(price * quantity);

      let updatedCart = { id, quantity, price };

      updatedCart = arrLocalStorageProduct.map((currProduct) => {
        return currProduct.id === id ? updatedCart : currProduct;
      });

      localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));
      updateCartValue(updatedCart);
      return;
    }
    return;
  }

  price = Number(price * quantity);
  quantity = Number(quantity);

  let newProduct = { id, quantity, price };

  arrLocalStorageProduct.push(newProduct);
  localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

  showToast("deleted", id);

  updateCartValue(arrLocalStorageProduct);
};
