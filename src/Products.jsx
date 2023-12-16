import React from 'react'
import { products } from '../backend/tools/product'

export const Products = () => {
  return (
    <div>
      {products.map((el, idx) => {
        return (
          <div key={idx} >
            <p>Producto: {el.name}</p>
            <p>Precio: {el.price}</p>
            <p>Cantidad: {el.price * 2}</p>
          </div>
        );
      })}
    </div>
  )
}
