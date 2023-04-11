import { lazy } from 'react';
import Loadable from '@/components/Loadable';
import MainLayout from '@/layout/MainLayout';

const GridView = Loadable(lazy(() => import('@/view/GridView')));
const TradeInput = Loadable(lazy(() => import('@/view/TradeInput')));
const StockInput = Loadable(lazy(() => import('@/view/StockInput')));
const SignIn = Loadable(lazy(() => import('@/view/Login')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <GridView />,
    },
    {
      path: 'trade',
      element: <TradeInput />,
    },
    {
      path: 'stock',
      element: <StockInput />,
    },

    // {
    //   path: 'project',
    //   children: [
    //     {
    //       path: 'list',
    //       element: <ListPage />,
    //     },
    //   ],
    // },
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: <SignIn />,
        },
        // {
        //   path: 'wijmo',
        //   element: <Wijmo />,
        // },
        // {
        //   path: 'drag',
        //   element: <DragDrop />,
        // },
      ],
    },
  ],
};

export default MainRoutes;
