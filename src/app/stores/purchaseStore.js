import { baseUrl } from "@/secrets.js";
import axios from "axios";
import { create } from "zustand";

export const usePurchaseStore = create((set) => ({
  purchases: [],
  purchaseLoading: false,
  purchaseError: "",
  getAllPurchases: async (
    shopName,
    page = "",
    limit = "",
    priceValue = "",
    category = "",
    startDate = "",
    endDate = "",
    searchValue = ""
  ) => {
    try {
      set({ purchaseLoading: true, purchaseError: "" });

      const response = await axios.get(
        `${baseUrl}/api/v1/purchases/get-all?shop_name=${shopName}&page=${page}&limit=${limit}&price=${priceValue}&category=${category}&startDate=${startDate}&endDate=${endDate}&search=${searchValue}`
      );

      const { data } = response;
      set({ purchaseLoading: false, purchases: data, purchaseError: "" });
    } catch (error) {
      set({ purchaseLoading: false, purchaseError: "Something went wrong" });
    }
  },
}));
