import { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type CheckAuthProps = {
  isAuthenticated: boolean;
  children?: ReactNode;
  redirectPath?: string;
};

export function CheckAuthRoot({
  isAuthenticated,
  children,
  redirectPath = "/",
}: CheckAuthProps) {
  const location = useLocation();
  const { pathname } = location;
  const publicRoutes = ["/login", "/sign-up"];

  const isOnPublicRoute = publicRoutes.includes(pathname);
  const shouldRedirectToLogin = !isAuthenticated && !isOnPublicRoute;
  const shouldRedirectToHome = isAuthenticated && isOnPublicRoute;

  if (shouldRedirectToLogin)
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace={true}
      />
    );
  if (shouldRedirectToHome)
    return <Navigate to={redirectPath} replace={true} />;

  return <>{children}</>;
}

export const CheckAuth = ({
  isAuthenticated,
  redirectPath,
}: CheckAuthProps) => {
  return (
    <CheckAuthRoot
      isAuthenticated={isAuthenticated}
      redirectPath={redirectPath}
    >
      <Outlet />
    </CheckAuthRoot>
  );
};
