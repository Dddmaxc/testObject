import Modal from "react-bootstrap/Modal";
import styles from "./OrderProductsModal.module.css";
import { deleteProductTC, Product } from "@/features/products/productsSlice";
import { useAppDispatch } from "@/components/hooks/useAppDispatch";

interface Props {
  show: boolean;
  onHide: () => void;
  orderModelId: string;
  orderTitle: string;
  product: Product[];
}

export const OrderProductsModal = ({
  show,
  onHide,
  product,
  orderModelId,
  orderTitle,
}: Props) => {
  const dispatch = useAppDispatch();

  const deleteProduct = (productId: string) => {
    dispatch(deleteProductTC(productId));
  };

  return (
    <>
      {show && <div className={styles.backdrop} onClick={onHide} />}
      <Modal
        backdrop={true}
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vright"
        centered={false}
        dialogClassName={styles.customModal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {orderTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {product.map((product) => {
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
        </Modal.Body>
      </Modal>
    </>
  );
};
