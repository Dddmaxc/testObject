import { useEffect } from "react";
import { addOrderTC, fetchOrdersTC, Order, selectOrders } from "./ordersSlice";
import { useAppSelector } from "@/components/hooks/useAppSelector";
import { Col, Row } from "react-bootstrap";
import { OrdersCards } from "./ordersCards/OrdersCards";
import { useAppDispatch } from "@/components/hooks/useAppDispatch";
import { fetchProductsTC } from "../products/productsSlice";

export const Orders = () => {
  const orders = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();
  

  useEffect(() => {
    dispatch(fetchOrdersTC());
  }, []);

  const ordersForAdd: Omit<Order, "id"> = {
    title: "Длинное предлинное длиннючее название группы",
    date: new Date().toISOString(),
    description: "desc",
    products: []
    // get products () { return products }
  };

  const addOrder = () => {
    dispatch(fetchProductsTC());
    dispatch(addOrderTC(ordersForAdd));
  };

  return (
    <div className="container-fluid py-4" style={{ background: "#f8f9fa" }}>
      <button onClick={addOrder} className="btn btn-primary mt-3">
        add
      </button>
      <div className="d-flex" style={{ alignItems: "flex-end", gap: "10px" }}>
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
