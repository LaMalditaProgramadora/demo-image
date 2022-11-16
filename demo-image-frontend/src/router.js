import MemeListPage from "./pages/MemeListPage";
import MemeCreatePage from "./pages/MemeCreatePage";
import { useRoutes, Navigate} from "react-router-dom";

export const AppRouter = () => {
  return useRoutes([
    {
      path: "memes/list",
      element: <MemeListPage />,
    },
    {
      path: "memes/create",
      element: <MemeCreatePage />,
    },
    {
      path: "",
      element: <Navigate to="/memes/list" />
    },
  ]);
};

export default AppRouter;
