import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useUser } from "../../hooks/use-user";
import { PATHS } from "../../types/paths";

type Props = { children: ReactNode };

export const ProtectedRoutes = (props: Props) => {
  const { children } = props;

  const location = useLocation();
  const { isLoggedIn } = useUser();

  return isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to={PATHS.index} state={{ from: location }} replace />
  );
};
