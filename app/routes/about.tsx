import type { Route } from './+types/about';

export async function loader({ params }: Route.LoaderArgs) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const product = await response.json();
  // console.log(product);
  return product;
}

export function meta({ data }: Route.MetaArgs) {
  // console.log('dfd', data);
  return [{ title: data?.title }, { name: 'description', content: 'Welcome to React Router!' }];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>{loaderData.title}</h1>
      {loaderData.body}
    </div>
  );
}
