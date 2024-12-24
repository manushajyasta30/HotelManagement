export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  const roomPrice =
    (state.cartItems.price * 100 * state.cartItems.numOfDays) / 100;
  state.roomPrice = addDecimals(roomPrice);

  const taxPrice = 0.15 * roomPrice;
  state.taxPrice = addDecimals(taxPrice);

  const totalPrice = roomPrice + taxPrice;
  state.totalPrice = addDecimals(totalPrice);
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
