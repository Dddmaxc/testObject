import React from "react";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch } from "@/components/hooks/useAppDispatch";
import { SubmitHandler } from "react-hook-form";
import {
  addProductTC,
  Product,
  Price,
} from "@/features/products/productsSlice";
import { FormForAddProduct } from "./formForAddProduct/formForAddProduct";
import { ProductFormData } from "../productFormSchema";

type Props = {
  show: boolean;
  onHide: () => void;
  selectedOrderId?: string | null;
};

type ProductFormsData = {
  title: string;
  serialNumber: number;
  isNew: 1 | 0;
  photo: string;
  type: string;
  specification: string;
  status: 1 | 0;
  guarantee: {
    start: string;
    end: string;
  };
  price: Price[];
  name: string;
};

export const AddProductModal: React.FC<Props> = ({
  show,
  onHide,
  selectedOrderId,
}) => {
  const dispatch = useAppDispatch();

  const handleFormSubmit: SubmitHandler<ProductFormData> = (data) => {
    console.log("Form data before submission:", data);

    if (!selectedOrderId) {
      alert("Не выбран заказ для продукта");
      return;
    }

    const newProduct: Omit<Product, "id"> = {
      serialNumber: data.serialNumber || 0,
      isNew: data.isNew || 1,
      photo: data.photo || "",
      title: data.title || "",
      type: data.type || "",
      specification: data.specification || "",
      guarantee: {
        start: data.guarantee.start || new Date().toISOString(),
        end:
          data.guarantee.end ||
          new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      },
      price: [
        {
          value: data.price[0]?.value || 0,
          symbol: "USD",
          isDefault: data.price[0]?.isDefault || 1,
        },
        {
          value: data.price[1]?.value || 0,
          symbol: "UAH",
          isDefault: data.price[1]?.isDefault || 0,
        },
      ],
      order: selectedOrderId,
      date: new Date().toISOString(),
      name: data.name || "",
      status: data.status || 1,
    };

    console.log("Product to be submitted:", newProduct);

    dispatch(addProductTC(newProduct))
      .unwrap()
      .then(() => {
        console.log("Product added successfully");
        onHide();
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert(`Ошибка при добавлении продукта: ${error.message}`);
      });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить продукт</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormForAddProduct onSubmit={handleFormSubmit} />
      </Modal.Body>
    </Modal>
  );
};
