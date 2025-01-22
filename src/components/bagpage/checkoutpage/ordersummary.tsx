'use client';
import Image from 'next/image';
import { useCart } from '@/components/shared/cartContext';

const Ordersummary = () => {
  const { cart } = useCart();

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="md:w-[420px] w-full md:px-6">
      <h1 className="text-2xl font-medium py-4">Order Summary</h1>
      <div className="space-y-4 py-4 text-zinc-500">
        <p className="flex justify-between items-center">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </p>
        <p className="flex justify-between items-center">
          <span>Estimated Delivery & Handling</span>
          <span>Free</span>
        </p>
        <p className="flex justify-between items-center py-4 text-base border-y text-[#111]">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </p>
      </div>
      <p className="text-xs text-[#757575]">
        (The total reflects the price of your order, including all duties and taxes)
      </p>
      <div className="py-6 space-y-3">
        {cart.map((item, index) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="w-24 h-24">
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={600}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-[#757575]">
              <p className="text-[#111]">{item.title}</p>
              <p className="sm:text-sm xs:text-xs">{item.category}</p>
              <span className="text-sm">${item.price}</span>
              <p className="sm:text-sm xs:text-xs">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ordersummary;
