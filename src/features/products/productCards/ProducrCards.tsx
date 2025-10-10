import { useAppDispatch } from "@/components/hooks/useAppDispatch";
import styles from "../Products.module.css";
import { deleteProductTC, Product } from "../productsSlice";

type PropsCards = {
  filteredProducts: Product[];
};

export const ProductCards = ({ filteredProducts }: PropsCards) => {
  const dispatch = useAppDispatch();

  const deleteProduct = (productId: string) => {
    dispatch(deleteProductTC(productId));
  };

  return (
    <>
      <div className={styles.productsContainer}>
        {filteredProducts.map((product) => {
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
                  width={40}
                  height={40}
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
                  <span className={`${styles.statusText} ${styles.available}`}>
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

              <div className={styles.dateRange}>
                <div>c: &nbsp;&nbsp;&nbsp;{product.guarantee.start}</div>
                <div>по: {product.guarantee.end}</div>
              </div>

              <div className={styles.condition}>
                <span className={styles.new}>
                  {product.isNew === 1 ? "новый" : "Б/У"}
                </span>
              </div>

              <div className={styles.price}>
                <div className={styles.priceUsd}>2 500 $</div>
                <div className={styles.priceUah}>250 000. 50 UAH</div>
              </div>

              <div className={styles.groupName}>
                Длинное предлинное длиннючее название группы
              </div>

              {product.name ? (
                <div className={styles.name}>{product.name}</div>
              ) : (
                <div className={styles.probel}>-</div>
              )}

              <div className={styles.groupName}>
                Длинное предлинное длиннючее название прихода
              </div>

              <div className={styles.arrivalDate}>
                <span>
                  {new Date(product.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span>
                  {new Date(product.date).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
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
    </>
  );
};
