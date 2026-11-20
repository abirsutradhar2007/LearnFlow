import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function AuthStatus({ message, onRetry }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-[#55534C]">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-md bg-[#201F1A] px-4 py-2 font-medium text-[#FFFDF2] transition hover:bg-black/80"
        >
          Try again
        </button>
      )}
    </div>
  );
}

function useRouteAuthStatus() {
  const { isLoading, authError, refreshUser } = useAuth();

  if (isLoading) {
    return <AuthStatus message="Checking your session..." />;
  }

  if (authError) {
    const retry = () => refreshUser().catch(() => {});
    return (
      <AuthStatus
        message="We couldn't verify your session. Check your connection and try again."
        onRetry={retry}
      />
    );
  }

  return null;
}

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  const authStatus = useRouteAuthStatus();

  if (authStatus) {
    return authStatus;
  }

  return user ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export function GuestRoute({ children }) {
  const { user } = useAuth();
  const authStatus = useRouteAuthStatus();

  if (authStatus) {
    return authStatus;
  }

  return user ? <Navigate to="/" replace /> : children;
}
