import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Row, Col } from "react-bootstrap";
import { ProductFormData, productFormSchema } from "./productFormSchema";

type PropsType = {
  onSubmit: (data: ProductFormData) => void;
};

export const FormForAddProduct = ({ onSubmit }: PropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      status: 1,
      title: "",
      serialNumber: 100,
      isNew: 1,
      photo: "",
      type: "",
      specification: "",
      price: [
        { value: 0, symbol: "USD", isDefault: 1 },
        { value: 0, symbol: "UAH", isDefault: 0 },
      ],
      name: "",
      guarantee: {
        start: new Date().toISOString().split("T")[0],
        end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
    },
  });

  const photoUrl = watch("photo");

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Название продукта *</Form.Label>
            <Form.Control
              type="text"
              {...register("title")}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Серийный номер *</Form.Label>
            <Form.Control
              type="number"
              {...register("serialNumber", { valueAsNumber: true })}
              isInvalid={!!errors.serialNumber}
            />
            <Form.Control.Feedback type="invalid">
              {errors.serialNumber?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Состояние *</Form.Label>
        <Form.Select {...register("isNew", { valueAsNumber: true })}>
          <option value={1}>Новый</option>
          <option value={0}>Б/у</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Статус *</Form.Label>
        <Form.Select {...register("status", { valueAsNumber: true })}>
          <option value={1}>Свободен</option>
          <option value={0}>В ремонте</option>
        </Form.Select>
        {errors.status && (
          <Form.Text className="text-danger">{errors.status.message}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Ссылка на фото *</Form.Label>
        <Form.Control
          type="url"
          {...register("photo")}
          isInvalid={!!errors.photo}
        />
        <Form.Control.Feedback type="invalid">
          {errors.photo?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {photoUrl && (
        <div className="mb-3">
          <img
            src={photoUrl}
            alt="Превью"
            style={{ maxWidth: "200px", border: "1px solid #ccc" }}
          />
        </div>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Тип продукта</Form.Label>
        <Form.Control as="textarea" rows={2} {...register("type")} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Имя *</Form.Label>
        <Form.Control
          type="text"
          {...register("name")}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Гарантия с *</Form.Label>
            <Form.Control
              type="date"
              {...register("guarantee.start")}
              isInvalid={!!errors.guarantee?.start}
            />
            <Form.Control.Feedback type="invalid">
              {errors.guarantee?.start?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Гарантия до *</Form.Label>
            <Form.Control
              type="date"
              {...register("guarantee.end")}
              isInvalid={!!errors.guarantee?.end}
            />
            <Form.Control.Feedback type="invalid">
              {errors.guarantee?.end?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Цена в USD *</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          {...register("price.0.value", { valueAsNumber: true })}
          isInvalid={!!errors.price?.[0]?.value}
        />
        <Form.Control.Feedback type="invalid">
          {errors.price?.[0]?.value?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Цена в UAH *</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          {...register("price.1.value", { valueAsNumber: true })}
          isInvalid={!!errors.price?.[1]?.value}
        />
        <Form.Control.Feedback type="invalid">
          {errors.price?.[1]?.value?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex gap-2 mt-3">
        <Button variant="success" type="submit">
          Добавить продукт
        </Button>
        <Button variant="secondary" type="button">
          Отмена
        </Button>
      </div>
    </Form>
  );
};
