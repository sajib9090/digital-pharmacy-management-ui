import { baseUrl } from "@/secrets.js";
import axios from "axios";
import { create } from "zustand";

export const useDosageStore = create((set) => ({
  dosageForms: [],
  dosageLoading: false,
  dosageError: "",
  getAllDosageForms: async (
    shopName,
    page = "",
    limit = "",
    searchValue = ""
  ) => {
    try {
      set({ dosageLoading: true, dosageError: "" });

      const response = await axios.get(
        `${baseUrl}/api/v1/dosage-forms/get-all?shop_name=${shopName}&page=${page}&limit=${limit}&search=${searchValue}`
      );

      const { data } = response;
      set({ dosageLoading: false, dosageForms: data, dosageError: "" });
    } catch (error) {
      set({ dosageLoading: false, dosageError: "Something went wrong" });
    }
  },
}));
