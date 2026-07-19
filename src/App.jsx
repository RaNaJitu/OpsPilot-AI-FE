import { Toaster } from "sonner";

import ErrorBoundary from "./components/feedback/ErrorBoundary";
import AppRoutes from "./routes/AppRoutes";
import { useTheme } from "./context/ThemeContext";

function ThemedToaster() {
  const { theme } = useTheme();
  return (
    <Toaster
      theme={theme === "light" ? "light" : "dark"}
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        className: "text-sm",
      }}
    />
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemedToaster />
      <AppRoutes />
    </ErrorBoundary>
  );
}
