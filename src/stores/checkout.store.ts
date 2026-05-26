import { create } from "zustand";
import { PaymentMethodType } from "../components/payment/PaymentMethodCard";

type CheckoutStore = {
  selectedItems: any[];
  selectedCartItemIds: string[];
  selectedAddress: any | null;
  selectedPayment: PaymentMethodType;
  notes: string;

  setSelectedItems: (items: any[]) => void;
  setSelectedCartItemIds: (items: string[]) => void;
  setSelectedAddress: (address: any) => void;
  setSelectedPayment: (payment: PaymentMethodType) => void;
  setNotes: (notes: string) => void;
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  selectedItems: [],
  selectedCartItemIds: [],
  selectedAddress: null,
  selectedPayment: "cod",
  notes: "",

  setSelectedItems: (items) =>
    set({ selectedItems: items }),

  setSelectedCartItemIds: (items) =>
    set({ selectedCartItemIds: items }),

  setSelectedAddress: (address) =>
    set({ selectedAddress: address }),

  setSelectedPayment: (payment) => {
    set({ selectedPayment: payment })
  },

  setNotes: (notes) => {
    set({ notes: notes })
  },
}));