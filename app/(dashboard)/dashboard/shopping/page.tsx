import { ProductList } from './_components/ProductList';
import { getProducts } from './server';

export default async function Page() {
  const products = await getProducts();
  return <ProductList initialProducts={products} />;
}