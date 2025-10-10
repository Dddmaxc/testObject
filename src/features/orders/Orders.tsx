import { useEffect, useState } from "react";
import { Order } from "./ordersSlice";


function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    fetch("/api/getOrders") // URL функции Firebase
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);
  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>{order.title}</div>
      ))}
    </div>
  );
}
