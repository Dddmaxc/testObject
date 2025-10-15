import { useAppDispatch } from "@/components/hooks/useAppDispatch";
import styles from "../../orders.module.css";
import { Order } from "../../ordersSlice";
import { deleteProductTC } from "@/features/products/productsSlice";
import { Product } from "@/features/products/productsSlice";

type PropsType = {
  productsByOrderId: Record<string, Product[]>;
  selectedOrder: Order;
};

export const ProductsByOrderId = ({
  productsByOrderId,
  selectedOrder,
}: PropsType) => {
  const dispatch = useAppDispatch();

  const deleteProduct = (productId: string) => {
    dispatch(deleteProductTC(productId));
  };

  return (
    <>
      {productsByOrderId[selectedOrder.id]?.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <div className={styles.statusIndicator}>
   
            {product.status === 1 ? (
              <div className={`${styles.statusDot} ${styles.available}`}></div>
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
            <div className={styles.productSerial}>{product.serialNumber}</div>
          </div>

          <div className={styles.productStatus}>
            {product.status === 1 ? (
              <span className={`${styles.statusText} ${styles.available}`}>
                свободен
              </span>
            ) : (
              <span className={`${styles.statusText} ${styles.notAvailable}`}>
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
      ))}
    </>
  );
};
