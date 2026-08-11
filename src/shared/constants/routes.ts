export const routes = {
  home: "/",
  app: "/app",
  purchases: "/app/purchases",
  purchaseNew: "/app/purchases/new",
  purchaseDetail: (id: string) => `/app/purchases/${id}`,
  purchaseEdit: (id: string) => `/app/purchases/${id}/edit`,
  actionsNeeded: "/app/actions-needed",
  api: {
    health: "/api/health",
  },
} as const;