import { Col, Row } from "react-bootstrap"
import { StorageItem } from "../components/StorageItem"
//import storageItems from "../data/items.json"
import { useProducts } from "../hooks/useProducts"

export function Storage() {
  const { storageItems, loading, error } = useProducts();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1>Storage</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storageItems.map(item => (
          <Col key={item._id}>
            <StorageItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  )
}