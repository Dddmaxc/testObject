import { useEffect, useState } from "react";
import { fetchOrdersTC, selectOrders } from "./ordersSlice";
import { useAppSelector } from "@/components/hooks/useAppSelector";
import { Col, Row } from "react-bootstrap";
import { OrdersCards } from "./ordersCards/OrdersCards";
import { useAppDispatch } from "@/components/hooks/useAppDispatch";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import styles from "./orders.module.css";
import { AddOrderModal } from "./addOrderModal/AddOrderModal";

export const Orders = () => {
  const orders = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    dispatch(fetchOrdersTC());
  }, []);


  return (
    <div
      className="container-fluid py-4"
      style={{ background: "#f8f9fa", marginTop: "50px" }}
    >
      <div className="d-flex" style={{ gap: "10px" }}>
        <div
          style={{
            background: "#03783dff",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomButton
            size="medium"
            onClick={() => setModalShow(true)}
            variant="primary"
          >
            +
          </CustomButton>
          <AddOrderModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
        <h1 className="mb-4">Приходы / {orders.length}</h1>
        <div className="mb-4 d-flex">
          <Row className="g-3 flex-nowrap">
            <Col xs={6} md={12}></Col>
          </Row>
        </div>
      </div>
      <OrdersCards />
    </div>
  );
};
