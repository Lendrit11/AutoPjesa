import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import Website from './layout/Website';
import Admin from './layout/Admin';
import AuthLayout from "./layout/Admin/AuthLayout/AuthLayout";
export const RenderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>
                  <Element />
                </Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  // Website Routes
  {
    path: '/login',
    layout: Website,
    element: lazy(() => import('./views/Website/login')),
  },
  {
    path: '/Product/:id',
    layout: Website,
    element: lazy(() => import('./views/Website/product')),
  },
  {
    path: '/Profile',
    layout: Website,
    element: lazy(() => import('./views/Website/my-account')),
  },
  {
    path: '/Contact',
    layout: Website,
    element: lazy(() => import('./views/Website/contact')),
  },
  {
    path: '/Checkout',
    layout: Website,
    element: lazy(() => import('./views/Website/checkout')),
  },
  {
    path: '/Blog',
    layout: Website,
    element: lazy(() => import('./views/Website/blog-list')),
  },
  {
    path: '/About',
    layout: Website,
    element: lazy(() => import('./views/Website/about-us')),
  },
  {
    path: '/Home',
    layout: Website,
    element: lazy(() => import('./views/Website/Home')),
  },  
  {
    path: '/Wishlist',
    layout: Website,
    element: lazy(() => import('./views/Website/wishlist')),
  },
  {
    path: '/Shop',
    layout: Website,
    element: lazy(() => import('./views/Website/shop')),
  },

  // Admin Routes
  {
    path: '/admin/dashboard',
    layout: Admin,
    element: lazy(() => import('./views/Admin/dashboard')),
  },
  {
    path: '/admin/supply',
    layout: Admin,
    element: lazy(() => import('./views/Admin/supply/index')),
  },
  {
  path: '/admin/login',
  layout: AuthLayout,  // Layout pa Navbar
  element: lazy(() => import('./views/Admin/login')),
},
  {
    path: '/admin/orders',
    layout: Admin,
    element: lazy(() => import('./views/Admin/orders/index')),
  },
  {
    path: '/admin/blog',
    layout: Admin,
    element: lazy(() => import('./views/Admin/blog/index')),
  },
  {
    path: '/admin/user',
    layout: Admin,
    element: lazy(() => import('./views/Admin/user/index')),
  },

  // Catch-all
  {
    path: '*',
    layout: Website,
    element: lazy(() => import('./views/Website/Home')),
  }
];

export default routes;
