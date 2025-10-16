import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Product } from "@/slices/productsSlice";

//выбирает все продукты, привязанные к одному заказу
export const fetchProductsByOrderId = async (
  orderId: string
): Promise<Product[]> => {
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("order", "==", orderId));
    const querySnapshot = await getDocs(q);

    const products: Product[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];

    return products;
  } catch (error) {
    console.error("Ошибка при получении продуктов:", error);
    return [];
  }
};
