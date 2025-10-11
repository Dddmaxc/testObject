import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { createSelector } from "@reduxjs/toolkit";
import { Product } from "@/features/products/productsSlice";

export const useAppSelector = useSelector.withTypes<RootState>();

export const selectProducts = (state: RootState): Product[] =>
  state.products.products;

type ProductsByOrderId = Record<string, Product[]>;

// filter of Id
export const selectProductsByOrderId = createSelector(
  [selectProducts],
  (products): ProductsByOrderId => {
    return products.reduce<ProductsByOrderId>((acc, product) => {
      const orderId = product.order.toString(); 
      if (!acc[orderId]) {
        acc[orderId] = [];
      }
      acc[orderId].push(product);
      return acc;
    }, {});
  }
);
