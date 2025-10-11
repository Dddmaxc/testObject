import { useAppDispatch } from "@/components/hooks/useAppDispatch";
import styles from "../orders.module.css";
import {
  selectProductsByOrderId,
  useAppSelector,
} from "@/components/hooks/useAppSelector";
import { deleteOrderTC, selectOrders } from "../ordersSlice";
import { CgMenuRound } from "react-icons/cg";
import {
  fetchProductsTC,
  selectProducts,
} from "@/features/products/productsSlice";
import { useEffect } from "react";

export const OrdersCards = () => {
  const orders = useAppSelector(selectOrders);
  const products = useAppSelector(selectProducts);
  const productsByOrderId = useAppSelector(selectProductsByOrderId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsTC());
  }, [dispatch]);

  const deleteOrder = (orderId: string) => {
    dispatch(deleteOrderTC(orderId));
  };

  return (
    <div className={styles.orderContainer}>
      {orders.map((order) => {
        const orderProducts = productsByOrderId[order.id] || [];
        const orderDate = new Date(order.date);

        return (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderCard__info}>
              <div className={styles.orderCard__title}>{order.title}</div>
            </div>

            <div className={styles.orderCard__products}>
              <CgMenuRound size={50} color="#6c757d" />
              <div className={styles.orderCard__count}>
                {orderProducts.length}
                <div className={styles.orderCard__label}>Продукта</div>
              </div>
            </div>

            <div className={styles.orderCard__dateContainer}>
              <div className={styles.orderCard__dayMonth}>
                <span className={styles.orderCard__day}>
                  {orderDate.getDate().toString().padStart(2, "0")}
                </span>
                <span className={styles.orderCard__separator}>/</span>
                <span className={styles.orderCard__month}>
                  {orderDate.getMonth() + 1}
                </span>
              </div>
              <div className={styles.orderCard__fullDate}>
                <span className={styles.orderCard__yearDay}>
                  {orderDate.getDate().toString().padStart(2, "0")}
                </span>
                <span className={styles.orderCard__separator}>/</span>
                <span className={styles.orderCard__monthName}>
                  {orderDate.toLocaleDateString("ru-RU", { month: "short" })}
                </span>
                <span className={styles.orderCard__separator}>/</span>
                <span className={styles.orderCard__year}>
                  {orderDate.getFullYear()}
                </span>
              </div>
            </div>

            <div className={styles.orderCard__actions}>
              <button
                className={styles.orderCard__deleteBtn}
                onClick={() => deleteOrder(order.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
