import { baseUrl } from "@/secrets.js";
import axios from "axios";
import { create } from "zustand";

export const useMedicineStore = create((set) => ({
  medicines: [],
  medicineLoading: false,
  medicineError: "",
  getAllMedicines: async (
    shopName,
    genericValue = "",
    stockLeftValue = "",
    page = "",
    limit = "",
    searchValue = ""
  ) => {
    try {
      set({ medicineLoading: true, medicineError: "" });

      const response = await axios.get(
        `${baseUrl}/api/v1/medicines/get-all?shop_name=${shopName}&generic_name=${genericValue}&page=${page}&limit=${limit}&stock=${stockLeftValue}&search=${searchValue}`
      );

      const { data } = response;
      set({ medicineLoading: false, medicines: data, medicineError: "" });
    } catch (error) {
      set({ medicineLoading: false, medicineError: "Something went wrong" });
    }
  },
}));
