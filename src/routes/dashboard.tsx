import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router";
import { Outlet } from "react-router-dom";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import { HouseQuery } from "src/services/query/HouseQuery";

const IndexPage = lazy(() => import("src/pages/houses/houses"));

// Customers
const CustomerListPage = lazy(
  () => import("src/pages/dashboard/customers/list")
);
const CustomerDetailPage = lazy(() => import("src/pages/dashboard/customers/detail"));
const CustomerEditPage = lazy(
  () => import("src/pages/dashboard/customers/edit")
);
const CustomerAddPage = lazy(
  () => import("src/pages/dashboard/customers/add")
);
//Houses
const Houses = lazy(() => import("src/pages/houses/houses"));
const HousesAdd = lazy(() => import("src/pages/houses/add"));
const HousesDetailPage = lazy(() => import("src/pages/houses/detail"));
const HousesEditPage = lazy(() => import("src/pages/houses/edit"));

//Invoice
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoices/list'));
const InvoiceDetailPage = lazy(() => import('src/pages/dashboard/invoices/detail'));

// Other
const AccountPage = lazy(() => import("src/pages/dashboard/account"));
const CryptoPage = lazy(() => import("src/pages/dashboard/crypto"));
const FileManagerPage = lazy(() => import("src/pages/dashboard/file-manager"));

export const dashboardRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: (
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: "customers",
        children: [
          {
            index: true,
            element: <CustomerListPage />,
          },
          {
            path: ":customerId",
            element: <CustomerDetailPage />,
          },
          {
            path: ":customerId/edit",
            element: <CustomerEditPage />,
          },
          {
            path: "add",
            element: <CustomerAddPage />,
          },
        ],
      },

      {
        path: "account",
        element: <AccountPage />,
      },
      {
        path: "crypto",
        element: <CryptoPage />,
      },

      {
        path: "file-manager",
        element: <FileManagerPage />,
      },
      {
        path: 'invoices',
        children: [
          {
            index: true,
            element: <InvoiceListPage />
          },
          {
            path: ':invoiceId',
            element: <InvoiceDetailPage />
          }
        ]
      },
      {
        path: "houses",
        children: [
          {
            index: true,
            element: <Houses />,
          },
          {
            path: "detail/",
            element: <HousesDetailPage />,
          },
          {
            path: "add",
            element: <HousesAdd />,
          },
          {
            path: "edit",
            element: <HousesEditPage />,
          },
        ],
      },
    ],
  },
];
