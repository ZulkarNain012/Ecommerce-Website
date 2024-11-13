import products from "./api/product.json";
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS";
import { getProductFromLS } from "./getCartProduct";
import { incrementDecrement } from "./incrementDecrement";
import { removeProdFromCart } from "./removeProdFromCart";
import { updateCartProductTotal } from "./updateCartProductTotal";

let cartProducts = getProductFromLS();

let filterProducts = products.filter((curProd) => {
  return cartProducts.some((curElem) => curElem.id === curProd.id);
});

let cartElement = document.querySelector("#productCartContainer");
let templateContainer = document.querySelector("#productCartTemplate");

const showCartProduct = () => {
  filterProducts.forEach((curProd) => {
    const { category, id, image, name, price, stock } = curProd;

    let productClone = document.importNode(templateContainer.content, true);

    let lSActualData = fetchQuantityFromCartLS(id, price);

    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);

    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image;
    productClone.querySelector(".productQuantity").textContent =
      lSActualData.quantity;
    productClone.querySelector(".productPrice").textContent =
      lSActualData.price;

    productClone
      .querySelector(".stockElement")
      .addEventListener("click", (event) => {
        incrementDecrement(event, id, price, stock);
      });

    productClone
      .querySelector(".remove-to-cart-button")
      .addEventListener("click", () => {
        removeProdFromCart(id);
      });

    cartElement.append(productClone);
  });
};

showCartProduct();

updateCartProductTotal()
