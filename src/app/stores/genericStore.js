import { baseUrl } from "@/secrets.js";
import axios from "axios";
import { create } from "zustand";

export const useGenericStore = create((set) => ({
  generics: [],
  genericLoading: false,
  genericError: "",
  getAllGenerics: async (shopName, page = "", limit = "", searchValue = "") => {
    try {
      set({ genericLoading: true, genericError: "" });

      const response = await axios.get(
        `${baseUrl}/api/v1/generics/all?shop_name=${shopName}&page=${page}&limit=${limit}&search=${searchValue}`
      );

      const { data } = response;
      set({ genericLoading: false, generics: data, genericError: "" });
    } catch (error) {
      set({ genericLoading: false, genericError: "Something went wrong" });
    }
  },
}));
