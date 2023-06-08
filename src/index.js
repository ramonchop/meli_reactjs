import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import HomePage from './presentation/home/HomePage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from './presentation/error/ErrorPage';
import SearchResultsPage, { loader as resultLoader } from './presentation/search_results/SearchResultsPage';
import ProductDetailPage, { loader as detailLoader} from './presentation/product_detail/ProductDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "items",
        loader: resultLoader,
        element: <SearchResultsPage />,
      },
      {
        path: "items/:id",
        loader: detailLoader,
        element: <ProductDetailPage />,
      },
      
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
