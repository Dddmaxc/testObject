import { useAppDispatch } from "@/components/hooks/useAppDispatch";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteOrderTC } from "../ordersSlice";
import styles from "./deleteModal.module.css";
import { MdDelete } from "react-icons/md";

interface Props {
  show: boolean;
  onHide: () => void;
  orderModelId: string;
  orderTitle: string;
}

export const MyVerticallyCenteredModal = ({
  show,
  onHide,
  orderModelId,
  orderTitle,
}: Props) => {
  const dispatch = useAppDispatch();

  console.log(orderModelId);
  
  const deleteOrder = () => {
    debugger
    if (orderModelId) {
      dispatch(deleteOrderTC(orderModelId));
      onHide();
    }
  };

  return (
    <>
    {show && <div className={styles.backdrop} onClick={onHide} />}
      <Modal
        backdrop={false}
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Вы уверены, что хотите удалить этот приход?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{orderTitle}</p>
        </Modal.Body>
        <Modal.Footer style={{ background: "#0db561" }}>
          <Button
            className={styles.contained__modal_btn_cancel}
            onClick={onHide}
          >
            Отмена
          </Button>
          <Button
            className={styles.contained__modal_btn_delete}
            onClick={() => {
              deleteOrder();
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <MdDelete size={19.5} />
              Удалить
            </div>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
