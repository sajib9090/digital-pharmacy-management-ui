const cartData = (key) => {
  let data = JSON.parse(localStorage.getItem(key)) || [];
  return data;
};

const updatePurchaseCart = (data, quantity) => {
  let previousData = JSON.parse(localStorage.getItem("purchase_cart")) || [];

  const existingIndex = previousData.findIndex((item) => item._id === data._id);

  if (existingIndex !== -1) {
    // Item already exists, update quantity
    previousData[existingIndex].purchase_quantity += quantity;
  } else {
    // Item not found, add it to the cart
    const productData = {
      purchase_quantity: quantity,
      ...data,
    };
    previousData.push(productData);
  }

  // Update localStorage
  localStorage.setItem("purchase_cart", JSON.stringify(previousData));
  return previousData;
};

export { cartData, updatePurchaseCart };
