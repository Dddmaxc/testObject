import { createAppSlice } from "@/components/utils/createAppSlice";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

export type Guarantee = {
  start: string;
  end: string;
};

export type Price = {
  value: number;
  symbol: "USD" | "UAH";
  isDefault: 1 | 0;
};

export type Product = {
  id: string;
  serialNumber: number;
  isNew: 1 | 0;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: Guarantee;
  price: Price[];
  order: string;
  date: string;
  quantity?: 1;
  name?: string
  status?: boolean
};

export type ProductsState = {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
};

// Рекурсивная функция для преобразования всех Timestamp в документе
export const convertFirebaseData = (data: any): any => {
  if (data === null || data === undefined) {
    return data;
  }
  if (data instanceof Timestamp) {
    return data.toDate().toISOString();
  }

  if (Array.isArray(data)) {
    return data.map((item) => convertFirebaseData(item));
  }

  if (typeof data === "object") {
    const converted: any = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        converted[key] = convertFirebaseData(data[key]);
      }
    }
    return converted;
  }

  return data;
};

export const productsSlice = createAppSlice({
  name: "products",
  initialState,
  reducers: (create) => ({
    fetchProductsTC: create.asyncThunk<Product[], void>(
      async (_arg, thunkAPI) => {
        try {
          const snapshot = await getDocs(collection(db, "products"));
          const products = snapshot.docs.map((doc) => {
            const data = doc.data();
            // Преобразуем все Timestamp поля в документе
            const convertedData = convertFirebaseData(data);

            return {
              id: doc.id,
              ...convertedData,
            } as Product;
          });
          return products;
        } catch (error: any) {
          return thunkAPI.rejectWithValue(
            error.message ?? "Failed to fetch products"
          );
        }
      },
      {
        fulfilled: (state, action) => {
          state.products = action.payload;
          state.status = "succeeded";
        },
        pending: (state) => {
          state.status = "loading";
          state.error = null;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.payload as string;
        },
      }
    ),

    deleteProductTC: create.asyncThunk<string, string>(
      async (productId, thunkAPI) => {
        try {
          await deleteDoc(doc(db, "products", productId));
          return productId;
        } catch (error: any) {
          return thunkAPI.rejectWithValue(
            error.message ?? "Failed to delete product"
          );
        }
      },
      {
        fulfilled: (state, action) => {
          state.products = state.products.filter(
            (p) => p.id !== action.payload
          );
        },
      }
    ),

    addProductTC: create.asyncThunk<Product, Omit<Product, "id">>(
      async (product, thunkAPI) => {
        try {
          // Преобразуем guarantee даты в Timestamp для Firebase
          const firebaseProduct = {
            ...product,
            guarantee: {
              start: product.guarantee.start,
              end: product.guarantee.end,
            },
            date: serverTimestamp(), // используем serverTimestamp для даты
          };

          const docRef = await addDoc(
            collection(db, "products"),
            firebaseProduct
          );

          // Возвращаем продукт с локальной датой
          return {
            id: docRef.id,
            ...product,
            date: new Date().toISOString(),
          };
        } catch (error: any) {
          return thunkAPI.rejectWithValue(
            error.message ?? "Failed to add product"
          );
        }
      },
      {
        fulfilled: (state, action) => {
          state.products.push(action.payload);
        },
      }
    ),
  }),

  selectors: {
    selectProducts: (state) => state.products,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
});

export const { selectProducts, selectStatus, selectError } =
  productsSlice.selectors;
export const { fetchProductsTC, deleteProductTC, addProductTC } =
  productsSlice.actions;
export default productsSlice.reducer;
