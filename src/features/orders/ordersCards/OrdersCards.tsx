import { useAppDispatch } from "@/components/hooks/useAppDispatch";
import styles from "../orders.module.css";
import {
  selectProductsByOrderId,
  useAppSelector,
} from "@/components/hooks/useAppSelector";
import { selectOrders } from "../ordersSlice";
import { CgMenuRound } from "react-icons/cg";
import {
  addProductTC,
  deleteProductTC,
  fetchProductsTC,
  Product,
} from "@/features/products/productsSlice";
import { useEffect, useState } from "react";
import { MyVerticallyCenteredModal } from "../deleteModal/DeleteModal";
import { IoIosArrowForward } from "react-icons/io";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { MdOutlineCancel } from "react-icons/md";

export const OrdersCards = () => {
  const orders = useAppSelector(selectOrders);
  const productsByOrderId = useAppSelector(selectProductsByOrderId);
  const dispatch = useAppDispatch();

  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [openProduct, setOpenProduct] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProductsTC());
  }, [dispatch]);

  const toggleOpenProduct = (orderId: string) => {
    setSelectedOrderId(orderId);
    setOpenProduct(true);
  };

  const newProduct: Omit<Product, "id"> = {
    serialNumber: 123459,
    isNew: 1 as 1,
    photo:
      "https://baproar.vtexassets.com/arquivos/ids/2069005/image-928323e59f2040b0b9d00210d52a6b6b.jpg?v=638932927540630000",
    title: "Barcelona",
    type: "Table",
    specification: "Specs here",
    guarantee: { start: "2025-01-01", end: "2026-01-01" },
    price: [{ value: 100, symbol: "USD", isDefault: 1 as 1 }],
    order: "4",
    date: new Date().toISOString(),
    name: "Кто то хз кто но кто то ",
    status: true,
  };

  const addProduct = () => {
    dispatch(addProductTC(newProduct));
  };

  const deleteProduct = (productId: string) => {
    dispatch(deleteProductTC(productId));
  };

  const selectedOrder = orders.find((order) => order.id === selectedOrderId);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className={!openProduct ? styles.orderContainer : styles.orderContainerCollapse}>
        {orders.map((order) => {
          const orderProducts = productsByOrderId[order.id] || [];
          const orderDate = new Date(order.date);

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
          );
        })}
      </div>

      {/*Products*/}
      {openProduct && selectedOrder && (
        <div
          style={{
            background: "#ffffffff",
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
              right: "0",
              padding: "0",
              height: "30px",
              bottom: "8",
            }}
          >
            <MdOutlineCancel
              style={{ marginBottom: "25px", cursor: "pointer" }}
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
            {selectedOrder.products.map((product) => {
              return (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.statusIndicator}>
                    {product.status ? (
                      <div
                        className={`${styles.statusDot} ${styles.available}`}
                      ></div>
                    ) : (
                      <div
                        className={`${styles.statusDot} ${styles.notAvailable}`}
                      ></div>
                    )}
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
                    {product.status ? (
                      <span
                        className={`${styles.statusText} ${styles.available}`}
                      >
                        свободен
                      </span>
                    ) : (
                      <span
                        className={`${styles.statusText} ${styles.notAvailable}`}
                      >
                        В ремонте
                      </span>
                    )}
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
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
