"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
}

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerTarget = useRef(null);

  const fetchProducts = async (currentSkip: number) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${currentSkip}`
      );
      const data = await res.json();

      if (data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
        setSkip(currentSkip + 10);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchProducts(skip);
        }
      },
      { threshold: 1.0 }
    );

    const currentObserverTarget = observerTarget.current;
    if (currentObserverTarget) {
      observer.observe(currentObserverTarget);
    }

    return () => {
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget);
      }
    };
  }, [loading, hasMore, skip]);

  useEffect(() => {
    // Initial fetch on component mount
    fetchProducts(0);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {product.title}
              </h2>
              <p className="text-gray-600 mt-2 line-clamp-2">
                {product.description}
              </p>
              <p className="text-lg font-bold text-gray-900 mt-4">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-8">
          <p className="text-lg text-gray-500">Loading more products...</p>
        </div>
      )}
      {!hasMore && (
        <div className="flex justify-center items-center mt-8">
          <p className="text-lg text-gray-500">
            You've reached the end of the list.
          </p>
        </div>
      )}
      <div ref={observerTarget} className="h-10" />
    </div>
  );
};

export default Page;
