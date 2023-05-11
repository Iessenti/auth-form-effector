import { RouterProvider } from "atomic-router-react";
import { PagesList } from "~/pages";
import { router } from "~/shared/routing";

export const App = () => {
  return (
    <RouterProvider router={router}>
      <PagesList />
    </RouterProvider>
  );
};
