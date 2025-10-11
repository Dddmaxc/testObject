import { useAppDispatch } from "@/components/hooks/useAppDispatch";
import { useAppSelector } from "@/components/hooks/useAppSelector";
import { useEffect, useState } from "react";
import {
  fetchProductsTC,
  selectProducts,
  selectStatus,
  selectError,
  addProductTC,
  Product,
  deleteProductTC,
} from "./productsSlice";
import { Row, Col, Form } from "react-bootstrap";
import styles from "./Products.module.css";
import { ProductCards } from "./productCards/ProducrCards";

export const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const [filterProducts, setFilterProducts] = useState<string>("");

  console.log("products", products);

  useEffect(() => {
    dispatch(fetchProductsTC());
  }, []);

  const filteredProducts = filterProducts
    ? products.filter((p) => p.type === filterProducts)
    : products;

  const filterFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterProducts(e.currentTarget.value);
  };

  if (status === "loading") return <div>Loading products...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  const newProduct: Omit<Product, "id"> = {
    serialNumber: 123459,
    isNew: 1 as 1,
    photo:
      "https://baproar.vtexassets.com/arquivos/ids/2069005/image-928323e59f2040b0b9d00210d52a6b6b.jpg?v=638932927540630000",
    title: "Barcelona",
    type: "Table",
    specification: "Specs here",
    guarantee: { start: "2025-01-01", end: "2026-01-01" },
    price: [{ value: 100, symbol: "USD", isDefault: 1 as 1 }],
    order: "4",
    date: new Date().toISOString(),
    name: "Кто то хз кто но кто то ",
    status: true,
  };

  const addProduct = () => {
    dispatch(addProductTC(newProduct));
  };

  return (
    <div className="container-fluid py-4" style={{ background: "#f8f9fa" }}>
      <div className="d-flex" style={{ alignItems: "flex-end", gap: "10px" }}>
        <h1 className="mb-4">Продукты / {filteredProducts.length}</h1>

        <div className="mb-4 d-flex">
          <Row className="g-3 flex-nowrap">
            <Col xs={6} md={12}>
              <Form.Group className="d-flex align-items-center gap-2">
                <Form.Label className={styles.formLabel}>Тип:</Form.Label>
                <Form.Select onChange={filterFunction}>
                  <option value="">All</option>
                  <option value="Monitors">Monitors</option>
                  <option value="Some Think">Some Think</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={6} md={12}>
              <Form.Group className="d-flex align-items-center gap-2">
                <Form.Label className={styles.formLabel}>
                  Спецификация:
                </Form.Label>
                <Form.Select>
                  <option></option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </div>
      </div>

      <ProductCards filteredProducts={filteredProducts} />

      <button onClick={addProduct} className="btn btn-primary mt-3">
        add
      </button>
    </div>
  );
};
