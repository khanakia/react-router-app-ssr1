import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('products', 'routes/products.tsx'),
  route('products/:id', 'routes/product.tsx'),
] satisfies RouteConfig;
