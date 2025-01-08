import type { Product } from '~/types';
import type { Route } from './+types/products';
import { Link } from 'react-router';

export async function loader({ request, params }: Route.LoaderArgs): Promise<Product[]> {
  const page = new URL(request.url).searchParams.get('page') || '1';

  const skip = parseInt(page) * 2;
  // console.log(skip);

  const response = await fetch(`https://dummyjson.com/products?limit=3&skip=${skip}`);
  const data = await response.json();
  // console.log(product);
  return data?.products || [];
}

export function meta({ data }: Route.MetaArgs) {
  // console.log('dfd', data);
  return [{ title: 'Products' }, { name: 'description', content: 'Products Catalogue!' }];
}

export default function Products({ loaderData }: Route.ComponentProps) {
  const products = loaderData;
  return (
    <div className='container mx-auto'>
      <div className='bg-white'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
          <h2 className='mb-3 text-lg font-semibold'>Products</h2>

          <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8'>
            {products.map((product) => (
              <div
                key={product.id}
                className='group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white'
              >
                <img
                  src={product.thumbnail}
                  className='aspect-[3/4] w-full bg-gray-200 object-cover group-hover:opacity-75 sm:aspect-auto sm:h-96'
                />
                <div className='flex flex-1 flex-col space-y-2 p-4'>
                  <h3 className='text-sm font-medium text-gray-900'>
                    <a href={`/products/${product.id}`}>
                      <span aria-hidden='true' className='absolute inset-0' />
                      {product.title}
                    </a>
                  </h3>
                  <p className='text-sm text-gray-500'>{product.description}</p>
                  <div className='flex flex-1 flex-col justify-end'>
                    <p className='text-sm italic text-gray-500'>{product.category}</p>
                    <p className='text-base font-medium text-gray-900'>{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination />
        </div>
      </div>
    </div>
  );
}

export function Pagination() {
  return (
    <div className='flex items-center justify-between border-t border-gray-200 bg-white py-3'>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <nav aria-label='Pagination' className='isolate inline-flex -space-x-px rounded-md shadow-sm'>
            <Link
              to='/products?page=1'
              aria-current='page'
              className='relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              1
            </Link>
            <Link
              to='/products?page=2'
              className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            >
              2
            </Link>
            <Link
              to='/products?page=3'
              className='relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex'
            >
              3
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
