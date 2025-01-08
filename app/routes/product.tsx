import type { Product } from '~/types';
import type { Route } from './+types/product';

export async function loader({ params }: Route.LoaderArgs): Promise<Product> {
  console.log(params);
  const response = await fetch(`https://dummyjson.com/products/${params.id}`);
  const product = await response.json();
  return product;
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: `${data.title}` }, { name: 'description', content: data.description }];
}

export default function Products({ loaderData }: Route.ComponentProps) {
  const product = loaderData;
  return (
    <div className='container mx-auto'>
      <div className='bg-white'>
        <div className='mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
          {/* Product */}
          <div className='lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16'>
            {/* Product image */}
            <div className='lg:col-span-4 lg:row-end-1'>
              <img src={product.images[0]} className='aspect-[4/3] w-full rounded-lg bg-gray-100 object-cover' />
            </div>

            {/* Product details */}
            <div className='mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none'>
              <div className='flex flex-col-reverse'>
                <div className='mt-4'>
                  <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>{product.title}</h1>

                  <h2 id='information-heading' className='sr-only'>
                    Product information
                  </h2>
                  <p className='mt-2 text-sm text-gray-500'>
                    <time dateTime={product.meta.createdAt}>{product.meta.createdAt}</time>)
                  </p>
                </div>
              </div>

              <p className='mt-6 text-gray-500'>{product.description}</p>

              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2'>
                <button
                  type='button'
                  className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
                >
                  Pay {product.price}
                </button>
                <button
                  type='button'
                  className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
                >
                  Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
