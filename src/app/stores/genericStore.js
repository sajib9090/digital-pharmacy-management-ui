import axios from "axios";
import { create } from "zustand";

// export const baseUrl = "http://localhost:8000";
export const baseUrl = "https://digital-pharmacy-management-backend.vercel.app";
export const useGenericStore = create((set) => ({
  generics: [],
  loading: false,
  error: "",
  getAllGenerics: async (shopName, page, limit, searchValue) => {
    try {
      set({ loading: true, error: "", success: "" });

      const response = await axios.get(
        `${baseUrl}/api/v1/generics/all?shop_name=${shopName}&page=${page}&limit=${limit}&search=${searchValue}`
      );

      const { data } = response;
      set({ loading: false, generics: data, error: "" });
    } catch (error) {
      set({ loading: false, error: "Something went wrong" });
    }
  },
}));
