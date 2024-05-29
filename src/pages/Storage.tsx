import { Col, Row } from "react-bootstrap"
import { StorageItem } from "../components/StorageItem"
import storageItems from "../data/items.json"

export function Storage() {
  return (
    <>
      <h1>Storage</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storageItems.map(item => (
          <Col key={item.id}>
            <StorageItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  )
}