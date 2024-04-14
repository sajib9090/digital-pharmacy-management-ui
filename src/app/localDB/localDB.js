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

const removeSinglePurchaseItem = (item) => {
  let existingData = JSON.parse(localStorage.getItem("purchase_cart")) || [];
  const existingItemIndex = existingData.findIndex((i) => i?._id === item?._id);

  if (existingItemIndex !== -1) {
    existingData.splice(existingItemIndex, 1);
    localStorage.setItem("purchase_cart", JSON.stringify(existingData));
  }

  return existingData;
};

const increaseItemQuantity = (item) => {
  let existingData = JSON.parse(localStorage.getItem("purchase_cart")) || [];
  const existingItem = existingData.find((i) => i?._id === item?._id);

  if (existingItem) {
    existingItem.purchase_quantity = (existingItem.purchase_quantity || 0) + 1;
    localStorage.setItem("purchase_cart", JSON.stringify(existingData));
    return true;
  }
  //if not found return false
  return false;
};

const decreaseItemQuantity = (item) => {
  let existingData = JSON.parse(localStorage.getItem("purchase_cart")) || [];
  const existingItem = existingData.find((i) => i?._id === item?._id);

  if (existingItem) {
    if (
      existingItem?.purchase_quantity &&
      existingItem?.purchase_quantity > 1
    ) {
      existingItem.purchase_quantity -= 1;
    }
    localStorage.setItem("purchase_cart", JSON.stringify(existingData));
    return true;
  }

  return false;
};

export {
  cartData,
  updatePurchaseCart,
  removeSinglePurchaseItem,
  increaseItemQuantity,
  decreaseItemQuantity,
};
