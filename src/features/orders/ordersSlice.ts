import { createAppSlice } from "@/components/utils/createAppSlice";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { convertFirebaseData, Product } from "../products/productsSlice";
import { fetchProductsByOrderId } from "@/services/products";

export type Status = "idle" | "loading" | "succeeded" | "failed";

export type Order = {
  id: string;
  title: string;
  date: string;
  description: string;
  products: Product[];
};

export type OrderState = {
  orders: Order[];
  status: Status;
  error?: string | null;
};

const initialState: OrderState = {
  orders: [],
  status: "idle",
  error: null,
};


export const ordersSlice = createAppSlice({
  name: "orders",
  initialState,
  reducers: (create) => ({
    fetchOrdersTC: create.asyncThunk<Order[], void>(
      async (_arg, thunkAPI) => {
        try {
          const snapshot = await getDocs(collection(db, "orders"));

          const orders = snapshot.docs.map((doc) => {
            const rawData = doc.data();
            const convertedData = convertFirebaseData(rawData);

            return {
              id: doc.id,
              ...convertedData,
            } as Order;
          });

          const ordersWithProducts: Order[] = await Promise.all(
            orders.map(async (order) => {
              const products = await fetchProductsByOrderId(order.id);
              return {
                ...order,
                products: convertFirebaseData(products),
              };
            })
          );

          return ordersWithProducts;
        } catch (error: any) {
          return thunkAPI.rejectWithValue(
            error.message ?? "Failed to fetch orders"
          );
        }
      },
      {
        fulfilled: (state, action) => {
          state.orders = action.payload;
          state.status = "succeeded";
        },
        pending: (state) => {
          state.error = null;
          state.status = "loading";
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.payload as string;
        },
      }
    ),

    deleteOrderTC: create.asyncThunk<string, string>(
      async (orderId, thunkAPI) => {
        try {
          await deleteDoc(doc(db, "orders", orderId));
          return orderId;
        } catch (error: any) {
          return thunkAPI.rejectWithValue(
            error.message ?? "Failed to delete order"
          );
        }
      },
      {
        fulfilled: (state, action) => {
          state.orders = state.orders.filter(
            (order) => order.id !== action.payload
          );
        },
        rejected: (state, action) => {
          state.error = action.payload as string;
        },
      }
    ),

    addOrderTC: create.asyncThunk<Order, Omit<Order, "id">>(
      async (order, thunkAPI) => {
        try {
          const docRef = await addDoc(collection(db, "orders"), order);

          return {
            id: docRef.id,
            ...order,
          };
        } catch (error: any) {
          return thunkAPI.rejectWithValue(
            error.message ?? "Failed to add order"
          );
        }
      },
      {
        fulfilled: (state, action) => {
          state.orders.push(action.payload);
        },
        rejected: (state, action) => {
          state.error = action.payload as string;
        },
      }
    ),
  }),

  selectors: {
    selectOrders: (state) => state.orders,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
});

export const { fetchOrdersTC, deleteOrderTC, addOrderTC } = ordersSlice.actions;
export const { selectOrders, selectStatus, selectError } =
  ordersSlice.selectors;
export default ordersSlice.reducer;
