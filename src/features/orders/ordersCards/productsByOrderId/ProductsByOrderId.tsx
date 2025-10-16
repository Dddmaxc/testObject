import { useCallback } from "react";
import { useAppDispatch } from "@/components/hooks/useAppDispatch";
import styles from "../../orders.module.css";
import { Order } from "../../ordersSlice";
import { deleteProductTC, Product } from "@/slices/productsSlice";
import React from "react";

type PropsType = {
  productsByOrderId: Record<string, Product[]>;
  selectedOrder: Order;
};

export const ProductsByOrderId = React.memo(
  ({ productsByOrderId, selectedOrder }: PropsType) => {
    const dispatch = useAppDispatch();

    const handleDeleteProduct = useCallback(
      (productId: string) => {
        dispatch(deleteProductTC(productId));
      },
      [dispatch]
    );

    const products = productsByOrderId[selectedOrder.id] || [];

    return (
      <>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.statusIndicator}>
              {product.status === 1 ? (
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
                onClick={() => handleDeleteProduct(product.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }
);
