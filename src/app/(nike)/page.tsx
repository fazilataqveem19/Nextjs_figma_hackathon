import { client } from '@/sanity/lib/client';
import Bestofairmax from "@/components/homepage/bestofairmax";
import Downloadappbanner from "@/components/homepage/downloadappbanner";
import Essentials from "@/components/homepage/essentials";
import Gearup from "@/components/homepage/gearup";
import Intro from "@/components/homepage/intro";
import Link from "next/link";
import Image from 'next/image';

type Product = {
  _id: string;
  productName: string;
  category: string;
  price: number;
  inventory: number;
  colors: string[];
  status: string;
  description: string;
  imageUrl: string;
};

const intro = {
  image: "/home/intro.png",
  span: "First Look",
  title: "NIKE AIR MAX PULSE",
  para: "Extreme comfort. Hyper durable. Max volume. Introducing the Air Max Pulse designed to push you past your limits and help you go to the max."
};

const featuredArr = {
  image: "/home/featuredpage.png",
  title: "STEP INTO WHAT FEELS GOOD",
  para: "Cause everyone should know the feeling of running in that perfect pair."
};

const dontMisspage = {
  image: "/home/dontmiss.png",
  title: "FLIGHT ESSENTIALS",
  para: "Your built-to-last, all-week wears—but with style only Jordan Brand can deliver."
};

const query = `*[_type == "product"]{
  _id,
  productName,
  category,
  price,
  inventory,
  colors,
  status,
  description,
  "imageUrl": image.asset->url
}`;

export default async function Home() {
  const products = await client.fetch(query);

  return (
    <div className="max-w-[1344px] m-auto px-3 text-[#111]">
      <Downloadappbanner />
      <Intro data={intro}>
        <Link href={"/"} className='px-6 py-2 bg-[#111111] text-white text-sm rounded-full'>Notify Me</Link>
        <Link href={"/products"} className='px-6 py-2 bg-[#111111] text-white text-sm rounded-full'>Shop Air Max</Link>
      </Intro>
      <Bestofairmax introTitle="Best Of Air Max" cardSize="lg" />

      <section className="py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-[#111] mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            Discover Our Premium Collection
          </h2>
          <p className="text-sm text-black-300">Browse through a variety of exclusive, high-quality products designed for ultimate comfort and style.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product: Product) => (
            <div key={product._id} className="p-4 rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
              {product.imageUrl && (
                <Image
                  src={product.imageUrl}
                  alt={product.productName}
                  width={300}
                  height={224}
                  className="w-full h-56 object-cover mb-4 rounded-lg"
                />
              )}
              <h3 className="text-sm font-semibold mb-2">{product.productName}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <p className="text-gray-800 font-semibold mb-2"> ${product.price}</p>
              <p
                className={`text-sm font-medium ${product.status === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}
              >
                {product.status}
              </p>
              <Link href={`/product/${product._id}`} className="mt-4 inline-block px-6 py-2 bg-[#111] text-white text-sm rounded-full hover:bg-[#333] transition-all duration-300">
                View Product
              </Link>
            </div>
          ))}
        </div>
      </section>

      <p className="text-2xl font-medium py-4">Featured</p>
      <Intro data={featuredArr}>
        <Link href={"/products"} className='px-6 py-2 bg-[#111111] text-white text-sm rounded-full'>Find Your Shoe</Link>
      </Intro>
      <p className="text-2xl font-medium py-4">Gear Up</p>
      <Gearup />
      <p className="text-2xl font-medium py-4">Don&apos;t Miss</p>
      <Intro data={dontMisspage}>
        <Link href={"/products"} className='px-6 py-2 bg-[#111111] text-white text-sm rounded-full'>Shop</Link>
      </Intro>
      <p className="text-2xl font-medium py-4">The Essentials</p>
      <Essentials />
    </div>
  );
}
