import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  _id: string
  quantity: number
}

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (_id: string) => number
  increaseCartQuantity: (_id: string) => void
  decreaseCartQuantity: (_id: string) => void
  removeFromCart: (_id: string) => void
  cartQuantity: number
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }:
  ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  function getItemQuantity(_id: string) {
    return cartItems.find(item => item._id === _id)?.quantity || 0
  }

  function increaseCartQuantity(_id: string) {
    setCartItems(currItems => {
      if (currItems.find(item => item._id === _id) == null) {
        return [...currItems, { _id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item._id === _id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          } 
        })
      }
    })
  }

  function decreaseCartQuantity(_id: string) {
    setCartItems(currItems => {
      if (currItems.find(item => item._id === _id)?.quantity === 1) {
        return currItems.filter(item => item._id !== _id)
      } else {
        return currItems.map(item => {
          if (item._id === _id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(_id: string) {
    setCartItems(currItems => {
      return currItems.filter(item => item._id !== _id)
    })
  }

  return <ShoppingCartContext.Provider
    value={{
      getItemQuantity,
      increaseCartQuantity,
      decreaseCartQuantity,
      removeFromCart,
      openCart,
      closeCart,
      cartItems,
      cartQuantity
    }}
  >
    {children}
    <ShoppingCart isOpen={isOpen} />
  </ShoppingCartContext.Provider>
}