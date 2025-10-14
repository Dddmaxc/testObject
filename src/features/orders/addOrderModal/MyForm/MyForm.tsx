import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

export type OrderFormValues = {
  title: string;
  description: string;
};

type Props = {
  onSubmit: SubmitHandler<OrderFormValues>;
};

export const MyForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderFormValues>({
    defaultValues: { title: "", description: "" },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Заголовок заказа</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите заголовок"
          isInvalid={!!errors.title}
          {...register("title", { required: "Введите заголовок" })}
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
          {...register("description", { required: "Введите описание" })}
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
}