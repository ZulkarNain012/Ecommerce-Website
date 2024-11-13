import { updateCartValue } from "./updateCartValue";

export const getProductFromLS = () => {
  let cartProducts = localStorage.getItem("cartProductLS");
  if (!cartProducts) {
    return [];
  }

  cartProducts = JSON.parse(cartProducts);

  updateCartValue(cartProducts);
  return cartProducts;
};
