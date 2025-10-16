import Modal from "react-bootstrap/Modal";
import { FormForAddOrder } from "./formForAddOrder/FormForAddOrder";
import { useAppDispatch } from "@/components/hooks/useAppDispatch";
import { SubmitHandler } from "react-hook-form";
import { addOrderTC, Order } from "@/slices/ordersSlice";
import { useCallback } from "react";

type Props = {
  show: boolean;
  onHide: () => void;
};

// Создаем тип для формы без id и с правильным типом products
type OrderFormData = {
  title: string;
  description: string;
};

export const AddOrderModal = ({ show, onHide }: Props) => {
  const dispatch = useAppDispatch();

  const handleFormSubmit: SubmitHandler<OrderFormData> = useCallback(
    (data) => {
      const newOrder: Omit<Order, "id"> = {
        title: data.title,
        description: data.description,
        date: new Date().toISOString(),
        products: [],
      };
      console.log(data);
      dispatch(addOrderTC(newOrder));
      onHide();
    },
    [[dispatch, onHide]]
  );

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить заказ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormForAddOrder onSubmit={handleFormSubmit} />
      </Modal.Body>
    </Modal>
  );
};
