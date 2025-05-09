import { notFound } from "next/navigation";
import { getProductById, products } from "@/lib/data/products";
import ProductDetails from "./productIdMain";

// Explicitly mark this page as statically generated
export const dynamic = 'force-static';

// Generate static params for static site generation
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

// Make this an async function to support async data fetching
export default async function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  
  // If getProductById is synchronous, you can keep this as-is.
  const product = getProductById(productId);
  
  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}