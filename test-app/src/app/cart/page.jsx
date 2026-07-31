"use client";

import { useState } from "react";

const INITIAL_PRODUCTS = [
  { id: 1, name: "Гар утас", price: 1200000, quantity: 5 },
  { id: 2, name: "Чихэвч", price: 85000, quantity: 12 },
  { id: 3, name: "Гар цүнх", price: 45000, quantity: 3 },
  { id: 4, name: "Ном", price: 25000, quantity: 20 },
  { id: 5, name: "Кофе", price: 8000, quantity: 1 },
]

const Page = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (product.quantity <= 0){
      return
    }
    setProducts(
      products.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    )

    const found = cart.find((cartItem) => cartItem.id === product.id);

    if (found) {
      const newCart = cart.map((cartItem) => {
        if (cartItem.id === product.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };

        }
        return cartItem;
      })
      setCart(newCart);
    } else {
      const newCartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      }
      setCart([...cart, newCartItem]);
    }
  }

  const increaseQty = (cartItem) => {
    const product = products.find((p) => p.id === cartItem.id)
      if(products.quantity <= 0){
        return
      }
    setProducts(
      products.map((item) => {
        if (item.id === cartItem.id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    )

    setCart(
      cart.map((item) => {
        if (item.id === cartItem.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    )
  }

  const decreaseQty = (cartItem) => {
    setProducts(
      
      products.map((item) => {
        if (item.id === cartItem.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    )
    if (cartItem.quantity === 1) {
      setCart(cart.filter((item) => item.id !== cartItem.id));
    } else {
      setCart(
        cart.map((item) => {
          if (item.id === cartItem.id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
      )
    }
  }
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div>
      {products.map((product, index) => {
        return (
          <div key={product.id} className="flex gap-4">
            <div>Name: {product.name}</div>
            <div>Price: {product.price}</div>
            <div>Quantity: {product.quantity}</div>
            <button onClick={() => addToCart(product)}>add to cart</button>
          </div>
        )
      })}
        <div>Sags ({totalQuantity})</div>
      {cart.map((cartItem, index) => {
        return (
          <div key={cartItem.id} className="flex gap-4">
            <div>
              {cartItem.name} x {cartItem.quantity} = {cartItem.price * cartItem.quantity}
              <div className="flex gap-4">
                  <button onClick={() => increaseQty(cartItem)}>add</button>
                  <button onClick={() => decreaseQty(cartItem)}>remove</button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Page;