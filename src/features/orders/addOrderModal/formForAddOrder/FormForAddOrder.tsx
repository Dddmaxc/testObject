import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button } from "react-bootstrap";
import { formOrderSchema, OrderFormData } from "./validationSchema";

type PropsType = {
  onSubmit: (data: OrderFormData) => void;
};

export const FormForAddOrder = ({ onSubmit }: PropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(formOrderSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Заголовок заказа</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите заголовок"
          isInvalid={!!errors.title}
          {...register("title")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Описание</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Введите описание"
          isInvalid={!!errors.description}
          {...register("description")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.description?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="success" type="submit">
        Добавить заказ
      </Button>
    </Form>
  );
};
