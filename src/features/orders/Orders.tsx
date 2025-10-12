import { useEffect, useState } from "react";
import { addOrderTC, fetchOrdersTC, Order, selectOrders } from "./ordersSlice";
import { useAppSelector } from "@/components/hooks/useAppSelector";
import { Col, Row } from "react-bootstrap";
import { OrdersCards } from "./ordersCards/OrdersCards";
import { useAppDispatch } from "@/components/hooks/useAppDispatch";
import { fetchProductsTC } from "../products/productsSlice";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import styles from "./orders.module.css";

export const Orders = () => {
  const orders = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();
  const [sw, setSw] = useState(false);

  useEffect(() => {
    dispatch(fetchOrdersTC());
  }, []);

  const ordersForAdd: Omit<Order, "id"> = {
    title: "Длинное предлинное длиннючее название группы",
    date: new Date().toISOString(),
    description: "desc",
    products: [],
    // get products () { return products }
  };

  const addOrder = () => {
    dispatch(fetchProductsTC());
    dispatch(addOrderTC(ordersForAdd));
  };

  return (
    <div
      className="container-fluid py-4"
      style={{ background: "#f8f9fa", marginTop: "50px" }}
    >
      <div
        onClick={() => setSw(!sw)}
        className={sw ? styles.blockColapps : styles.block}
      >
        sd
      </div>
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
          <CustomButton size="medium" onClick={addOrder} variant="primary">
            +
          </CustomButton>
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
