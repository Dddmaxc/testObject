import { useEffect, useState } from "react";
import { useAppDispatch } from "@/components/hooks/useAppDispatch";
import {
  selectProductsByOrderId,
  useAppSelector,
} from "@/components/hooks/useAppSelector";
import { selectOrders } from "../ordersSlice";
import {
  addProductTC,
  deleteProductTC,
  fetchProductsTC,
  Product,
} from "@/features/products/productsSlice";

import styles from "../orders.module.css";
import { CgMenuRound } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { MyVerticallyCenteredModal } from "../deleteModal/DeleteModal";
import { CustomButton } from "@/components/CustomButton/CustomButton";

export const OrdersCards = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectOrders);
  const productsByOrderId = useAppSelector(selectProductsByOrderId);

  const [modalDelete, setModalDelete] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProductsTC());
  }, [dispatch]);

  const toggleOpenProduct = (orderId: string) => {
    setSelectedOrderId(orderId);
    setOpenProduct(true);
  };

  const addProduct = () => {
    const newProduct: Omit<Product, "id"> = {
      serialNumber: 123459,
      isNew: 1,
      photo:
        "https://baproar.vtexassets.com/arquivos/ids/2069005/image-928323e59f2040b0b9d00210d52a6b6b.jpg?v=638932927540630000",
      title: "Barcelona",
      type: "Table",
      specification: "Specs here",
      guarantee: { start: "2025-01-01", end: "2026-01-01" },
      price: [{ value: 100, symbol: "USD", isDefault: 1 }],
      order: selectedOrderId ?? "",
      date: new Date().toISOString(),
      name: "Кто-то",
      status: true,
    };

    dispatch(addProductTC(newProduct));
  };

  const deleteProduct = (productId: string) => {
    dispatch(deleteProductTC(productId));
  };

  const selectedOrder = orders.find((order) => order.id === selectedOrderId);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* Заказы */}
      <div
        className={
          !openProduct ? styles.orderContainer : styles.orderContainerCollapse
        }
      >
        {orders.map((order) => {
          const orderProducts = productsByOrderId[order.id] || [];
          const orderDate = new Date(order.date);

          // Считаем сумму по продуктам (isDefault: 1)
          const totalPrice = orderProducts.reduce((sum, product) => {
            const defaultPrice = product.price.find((p) => p.isDefault === 1);
            return sum + (defaultPrice?.value || 0);
          }, 0);

          return (
            <div
              key={order.id}
              className={openProduct ? styles.collapse : styles.orderCard}
              onClick={() => setSelectedOrderId(order.id)}
            >
              <div className={styles.orderCard__title}>{order.title}</div>

              <div className={styles.orderCard__products}>
                <CgMenuRound
                  size={60}
                  color="#6c757d"
                  onClick={() => toggleOpenProduct(order.id)}
                />
                <div className={styles.orderCard__count}>
                  <span style={{ fontWeight: "bold", color: "#505050" }}>
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
                <div style={{ fontSize: "12px", color: "#6c757d" }}>
                  {totalPrice} $
                </div>
              </div>

              {order.id === selectedOrderId ? (
                <div className={styles.orderCard__arrow}>
                  <IoIosArrowForward
                    color="#fff"
                    className={styles.IoIosArrowForward}
                  />
                </div>
              ) : (
                openProduct &&
                selectedOrderId !== order.id && (
                  <div className={styles.orderCard__padding}>
                    <br />
                  </div>
                )
              )}

              <div className={styles.orderCard__actions}>
                <button
                  className={styles.orderCard__deleteBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOrderId(order.id);
                    setModalDelete(true);
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Модалка удаления */}
      {selectedOrder && (
        <MyVerticallyCenteredModal
          show={modalDelete}
          onHide={() => setModalDelete(false)}
          orderModelId={selectedOrder.id}
          orderTitle={selectedOrder.title}
        />
      )}

      {/* Продукты по заказу */}
      {openProduct && selectedOrder && (
        <div
          style={{
            background: "#fff",
            width: "78%",
            marginTop: "77px",
            marginRight: "2.5%",
            border: "1px solid #acacac",
            position: "relative",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: 0,
              padding: 0,
              height: "30px",
            }}
          >
            <MdOutlineCancel
              style={{ marginBottom: "25px", cursor: "pointer"}}
              color="#acacac"
              onClick={() => setOpenProduct(false)}
            />
          </div>

          <div style={{ padding: "25px" }}>
            <h3>{selectedOrder.title}</h3>
            <div>
              <CustomButton size="small" onClick={addProduct} variant="primary">
                +
              </CustomButton>
              <span
                style={{
                  padding: "10px",
                  color: "#0db561",
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                Добавить продукт
              </span>
            </div>
          </div>

          <div className={styles.productsContainer}>
            {productsByOrderId[selectedOrder.id]?.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.statusIndicator}>
                  <div
                    className={`${styles.statusDot} ${
                      product.status ? styles.available : styles.notAvailable
                    }`}
                  ></div>
                </div>

                <div className={styles.productImage}>
                  <img
                    src={product.photo}
                    alt={product.title}
                    width={60}
                    height={60}
                  />
                </div>

                <div className={styles.productInfo}>
                  <div className={styles.productTitle}>{product.title}</div>
                  <div className={styles.productSerial}>
                    {product.serialNumber}
                  </div>
                </div>

                <div className={styles.productStatus}>
                  <span
                    className={`${styles.statusText} ${
                      product.status ? styles.available : styles.notAvailable
                    }`}
                  >
                    {product.status ? "Свободен" : "В ремонте"}
                  </span>
                </div>

                <div className={styles.arrivalDate}>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteProduct(product.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
