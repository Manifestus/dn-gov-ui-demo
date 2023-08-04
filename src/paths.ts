export const paths = {
  index: "/dashboard",
  checkout: "/checkout",
  auth: {
    auth0: {
      callback: "/auth/auth0/callback",
      login: "/auth/auth0/login",
    },
  },
  dashboard: {
    index: "/dashboard",
    account: "/dashboard/account",
    crypto: "/dashboard/crypto",
    customers: {
      index: "/dashboard/customers",
      details: "/dashboard/customers/:customerId",
      edit: "/dashboard/customers/:customerId/edit",
      add: "/dashboard/customers/add",
    },
    invoices: {
      index: "/dashboard/invoices",
      details: "/dashboard/invoices/:orderId",
    },
    houses: {
      index: "/dashboard/houses",
      details: "/dashboard/houses/detail",
      add: "/dashboard/houses/add",
      edit: "/dashboard/houses/edit",
    },
    fileManager: "/dashboard/file-manager",
  },
  401: "/401",
  404: "/404",
  500: "/500",
};
