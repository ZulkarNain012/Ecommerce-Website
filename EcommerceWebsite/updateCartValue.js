const cartValue = document.querySelector("#cartValue");

export const updateCartValue = (cartProducts) => {
  return (cartValue.innerHTML = `<i
                  class="fa-solid fa-cart-shopping"
                  style="color: #eff3f8"
                > ${cartProducts.length} </i>`);
};
