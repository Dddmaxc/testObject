import { useAppDispatch } from "@/components/hooks/useAppDispatch";
import styles from "../orders.module.css";
import {
  selectProductsByOrderId,
  useAppSelector,
} from "@/components/hooks/useAppSelector";
import { selectOrders } from "../ordersSlice";
import { CgMenuRound } from "react-icons/cg";
import { fetchProductsTC } from "@/features/products/productsSlice";
import { useEffect, useState } from "react";
import { MyVerticallyCenteredModal } from "../deleteModal/DeleteModal";

export const OrdersCards = () => {
  const orders = useAppSelector(selectOrders);
  const productsByOrderId = useAppSelector(selectProductsByOrderId);
  const dispatch = useAppDispatch();

  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [openProduct, setOpenProduct] = useState<boolean>(false);

  console.log(openProduct);

  useEffect(() => {
    dispatch(fetchProductsTC());
  }, [dispatch]);

  const toggleOpenProduct = () => setOpenProduct((prev) => !prev);

  return (
    <div className={styles.orderContainer}>
      {orders.map((order) => {
        const orderProducts = productsByOrderId[order.id] || [];
        const orderDate = new Date(order.date);

        return (
          !openProduct && (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderCard__title}>{order.title}</div>

              <div className={styles.orderCard__products}>
                <CgMenuRound
                  size={60}
                  color="#6c757d"
                  onClick={toggleOpenProduct}
                />
                <div className={styles.orderCard__count}>
                  <span style={{ fontWeight: "bolder", color: "#505050" }}>
                    {orderProducts.length}
                  </span>
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

              <div className={styles.orderCard__price}>
                <div style={{ fontSize: "12px", color: "#6c757d" }}>100$</div>
                <div>2000UAH</div>
              </div>

              <div className={styles.orderCard__actions}>
                <button
                  className={styles.orderCard__deleteBtn}
                  onClick={(e) => {
                    e.stopPropagation(); // чтобы не срабатывало toggleOpenProduct
                    setModalDelete(true);
                  }}
                >
                  🗑️
                </button>

                <MyVerticallyCenteredModal
                  show={modalDelete}
                  onHide={() => setModalDelete(false)}
                  orderModelId={order.id}
                  orderTitle={order.title}
                />
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};
