import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
//import storageItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"
import { useProducts } from "../hooks/useProducts"

type CartItemProps = {
  _id: string
  quantity: number
}

export function CartItem({ _id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart()
  
  const { storageItems, loading, error } = useProducts()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  const item = storageItems.find(i => i._id === _id)
  if (item == null) return null

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imagePath}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name} {" "}
          {quantity > 1 && (
            <span
              className="text-muted"
              style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div
          className="text-muted"
          style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item._id)}
        >&times;</Button>
    </Stack>
  )
}
