'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { useCart } from '@/components/shared/cartContext';
import { useWishlist } from '@/components/shared/wishlistContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface Product {
  _id: string;
  productName: string;
  category: string;
  price: number;
  inventory: number;
  status: string;
  description: string;
  imageUrl: string;
}

const ProductPage = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  // State to store product data
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State to track if the product has been added to the bag
  const [isAddedToBag, setIsAddedToBag] = useState<boolean>(false);

  useEffect(() => {
    // Fetch product details from Sanity using async/await
    const fetchProduct = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error
      try {
        const query = `*[_type == "product" && _id == $productId] {
          _id,
          productName,
          category,
          price,
          inventory,
          status,
          description,
          "imageUrl": image.asset->url
        }`;

        const productData = await client.fetch(query, { productId });
        if (productData && productData.length > 0) {
          setProduct(productData[0]);
        } else {
          setError('Product not found');
        }
      } catch {
        setError('Failed to load product details');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProduct();
  }, [productId]); // Re-run the effect when productId changes

  // If there's an error or loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  // If no product is found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">Product not found.</p>
      </div>
    );
  }

  const { _id, productName, category, price, status, description, imageUrl, inventory } = product;

  const handleWishlistToggle = () => {
    if (isInWishlist(_id)) {
      removeFromWishlist(_id); // Remove from wishlist
    } else {
      addToWishlist({
        id: _id,
        title: productName,
        image: imageUrl,
        price,
      }); // Add to wishlist
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: _id,
      title: productName,
      price,
      image: imageUrl,
      quantity: 1,
      category,
    });
    setIsAddedToBag(true); // Set the product as added to the bag
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex justify-center items-center">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={productName}
                width={1300}
                height={700}
                className="w-full h-full object-cover rounded-xl shadow-xl"
              />
            )}
          </div>

          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl font-semibold text-gray-900">{productName}</h1>
            <p className="text-lg text-gray-600">Category: {category}</p>
            <p className="text-3xl font-semibold text-black">${price}</p>
            <p
              className={`text-sm font-medium ${status === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}
            >
              {status}
            </p>
            <p className="text-sm text-gray-600">Stock: {inventory}</p>
            <p className="text-sm text-gray-700 mt-4">{description}</p>

            <div className="space-y-4 mt-6">
              <button
                onClick={handleAddToCart}
                className="bg-black text-white w-full px-6 py-3 rounded-full hover:bg-gray-800 transition-all"
              >
                {isAddedToBag ? 'Added to Bag' : 'Add to Bag'}
              </button>
              <button
                onClick={handleWishlistToggle}
                className="border border-gray-400 text-black w-full px-6 py-3 rounded-full hover:bg-gray-200 transition-all flex items-center justify-center"
              >
                {isInWishlist(_id) ? (
                  <FaHeart className="text-red-600 mr-2" />
                ) : (
                  <FaRegHeart className="text-gray-500 mr-2" />
                )}
                Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
