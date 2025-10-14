import React from "react";
import Modal from "react-bootstrap/Modal";
import { MyForm, OrderFormValues } from "./MyForm/MyForm";
import { useAppDispatch } from "@/components/hooks/useAppDispatch";
import { SubmitHandler } from "react-hook-form";
import { addOrderTC } from "../ordersSlice";


type Props = {
  show: boolean;
  onHide: () => void;
};

export const AddOrderModal: React.FC<Props> = ({ show, onHide }) => {
  const dispatch = useAppDispatch();

  const handleFormSubmit: SubmitHandler<OrderFormValues> = (data) => {
    const newOrder = {
      title: data.title,
      description: data.description,
      date: new Date().toISOString(),
      products: [],
    };

    dispatch(addOrderTC(newOrder));
    onHide(); 
  };


  
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить заказ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MyForm onSubmit={handleFormSubmit} />
      </Modal.Body>
    </Modal>
  );
};