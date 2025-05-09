import { notFound } from "next/navigation";
import { getProductById, products } from "@/lib/data/products";
import ProductDetails from "./productIdMain";

// Generate static params for all product IDs
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  const product = getProductById(productId);
  
  if (!product) {
    notFound();
  }
  
  return <ProductDetails product={product} />;
}