'use client';
import Image from 'next/image';
import { AiOutlineDelete, AiFillHeart } from 'react-icons/ai';
import { FiHeart } from 'react-icons/fi';
import { useCart } from '@/components/shared/cartContext';
import { useWishlist } from '@/components/shared/wishlistContext';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const Bagitems = () => {
  const { cart, removeFromCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const removeFromBag = (id: string) => {
    removeFromCart(id);
  };

  const toggleWishlist = (item: CartItem) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <div className="flex-1 md:p-2">
      {/* Free Delivery Banner */}
      <div className="w-full rounded-lg bg-[#F5F5F5] py-3 px-5">
        <span className="text-lg font-medium">Free Delivery</span>
        <p className="text-sm">
          Applies to orders of ₹ 14 000.00 or more. <span className="underline ml-2">View details</span>
        </p>
      </div>

      {/* Bag Section */}
      <h1 className="text-2xl font-medium py-4">Bag</h1>
      <div className="w-full">
        {cart.length === 0 ? (
          <p>Your bag is empty</p>
        ) : (
          cart.map((item) => (
            <div className="w-full flex justify-between items-start py-8 border-b" key={item.id}>
              <div className="flex gap-3">
                <div className="w-36 h-36">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={600}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[#757575] flex flex-col justify-between">
                  <div>
                    <h3 className="sm:text-lg font-medium text-[#111]">{item.title}</h3>
                    <p className="sm:text-sm xs:text-xs">Men&apos;s Short-Sleeve Running Top</p>
                    <p className="sm:text-sm xs:text-xs">Ashen Slate/Cobalt Bliss</p>
                    <p className="flex gap-10 sm:text-sm xs:text-xs py-1">
                      <span>Size L</span>
                      <span>Quantity {item.quantity}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-[#111] text-xl">
                    {isInWishlist(item.id) ? (
                      <AiFillHeart
                        onClick={() => toggleWishlist(item)}
                        className="cursor-pointer text-red-600"
                      />
                    ) : (
                      <FiHeart onClick={() => toggleWishlist(item)} className="cursor-pointer" />
                    )}
                    <AiOutlineDelete
                      onClick={() => removeFromBag(item.id)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="md:text-lg sm:text-sm xs:text-xs">MRP: ${item.price}.00</div>
            </div>
          ))
        )}
      </div>

      {/* Favorites Section */}
      <h1 className="text-2xl font-medium py-4">Favorites</h1>
      <div className="w-full">
        {wishlist.length === 0 ? (
          <p>No items in your favorites.</p>
        ) : (
          wishlist.map((item) => (
            <div className="w-full flex justify-between items-start py-8 border-b" key={item.id}>
              <div className="flex gap-3">
                <div className="w-36 h-36">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={600}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[#757575] flex flex-col justify-between">
                  <div>
                    <h3 className="sm:text-lg font-medium text-[#111]">{item.title}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-[#111] text-xl">
                    <AiOutlineDelete
                      onClick={() => removeFromWishlist(item.id)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="md:text-lg sm:text-sm xs:text-xs">MRP: ${item.price}.00</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bagitems;
