import { baseUrl } from "@/secrets.js";
import axios from "axios";
import { create } from "zustand";

export const useCompanyStore = create((set) => ({
  companies: [],
  companyLoading: false,
  companyError: "",
  getAllCompanies: async (
    shopName,
    page = "",
    limit = "",
    searchValue = ""
  ) => {
    try {
      set({ companyLoading: true, companyError: "" });

      const response = await axios.get(
        `${baseUrl}/api/v1/companies/get-all?shop_name=${shopName}&page=${page}&limit=${limit}&search=${searchValue}`
      );

      const { data } = response;
      set({ companyLoading: false, companies: data, companyError: "" });
    } catch (error) {
      set({ companyLoading: false, companyError: "Something went wrong" });
    }
  },
}));
