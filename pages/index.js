import { useEffect, useState } from "react";
import {useCart} from "../store/store";
import Header from "../components/Header";
import { products } from "../lib/products";

export default function Home() {
  const [cart, setCart] = useState([]);
  const total = useCart((state) => state.total);
  const addTocart = useCart((state) => state.addTocart);
  const updatecartincrease = useCart((state) => state.updatecartincrease);
  const updatecartdeacrease = useCart((state) => state.updatecartdeacrease);
  const mycart = useCart((state) => state.cartContent);
  const addProduct = (params) => {
    const product = mycart.findIndex((item) => item.id === params.id);
    if (product !== -1) {
      mycart[product].quantity++;
      updatecartincrease({ params, mycart });
    } else {
      addTocart(params);
    }
  };

  const removeProduct = (params) => {
    const product = mycart.findIndex((item) => item.id === params.id);
    if (product !== -1) {
      if (mycart[product].quantity > 0) {
        mycart[product].quantity--;
        updatecartdeacrease({ params, mycart });
      }
    }
  };

  useEffect(() => {
    setCart(mycart);
  }, [total]);

  return (
    <>
      <Header />
      <div className="container mx-auto pt-4">
        <div className="pb-4">PRODUCTS</div>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                ${product.price}
              </p>
              <div className="flex space-x-8">
                <button
                  onClick={() =>
                    addProduct({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                    })
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Increase
                </button>
                <p className="m-1 text-lg font-medium text-gray-900">
                  {cart.find((item) => item.id === product.id)?.quantity
                    ? cart.find((item) => item.id === product.id)?.quantity
                    : 0}
                </p>
                <button
                  onClick={() => {
                    removeProduct({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                    });
                  }}
                  className={
                    cart.find((item) => item.id === product.id)?.quantity > 0
                      ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      : "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
                  }
                >
                  Decrease
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
