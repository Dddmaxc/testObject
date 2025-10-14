import { Navigate } from "react-router-dom";
import { Groups } from "@/components/navigateMenu/navigateMenuPages/Groups";
import { Users } from "@/components/navigateMenu/navigateMenuPages/Users";
import { Settings } from "@/components/navigateMenu/navigateMenuPages/Settings";
import { Error404 } from "@/components/errors/Error404";
import { App } from "@/App";
import { Orders } from "@/features/orders/Orders";
import { Products } from "@/features/products/Products";


export const PATH = {
  PRIHOD: "/prihod",
  GROUPS: "/group",
  PRODUCTS: "/products",
  USERS: "/users",
  SETTINGS: "/settings",
  ERROR: "/404",
} as const;

export const publicRoutes = [
  {
    element: <App />,
    children: [
      { path: "/", element: <Navigate to={PATH.PRIHOD} replace /> },
      { path: PATH.PRIHOD, element: <Orders /> },
      { path: PATH.GROUPS, element: <Groups /> },
      { path: PATH.PRODUCTS, element: <Products /> },
      { path: PATH.USERS, element: <Users /> },
      { path: PATH.SETTINGS, element: <Settings /> },
      { path: PATH.ERROR, element: <Error404 /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
];
