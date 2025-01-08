import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('products', 'routes/products.tsx'),
  // route('products/page/:page', 'routes/products.tsx'),
  route('products/:id', 'routes/product.tsx'),
  route('posts/:slug', 'routes/post.tsx'),
] satisfies RouteConfig;
