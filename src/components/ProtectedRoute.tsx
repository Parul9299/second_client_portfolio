import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const adminUnlocked = sessionStorage.getItem("adminUnlocked");

  if (adminUnlocked !== "true") {
    return <Navigate to="/gallery" replace />;
  }

  return <>{children}</>;
}