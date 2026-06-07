import { Route, Routes } from "react-router";
import CreateLine from "../../features/create-line/views/create-line";
import Lines from "../../features/lines/views/lines";
import Login from "../../features/login/views/login";
import Register from "../../features/register/views/register";
import { PATHS } from "../../types/paths";
import { ProtectedRoutes } from "./protected-route";

export const RouterContents = () => {
  return (
    <Routes>
      <Route path={PATHS.index} element={<Lines />} />
      <Route
        path={PATHS.create}
        element={
          <ProtectedRoutes>
            <CreateLine />
          </ProtectedRoutes>
        }
      />
      <Route path={PATHS.register} element={<Register />} />
      <Route path={PATHS.login} element={<Login />} />
    </Routes>
  );
};
