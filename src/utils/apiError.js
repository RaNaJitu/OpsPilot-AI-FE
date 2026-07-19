export function isNetworkError(error) {
  if (typeof navigator !== "undefined" && navigator.onLine === false) return true;
  return (
    error?.code === "ERR_NETWORK" ||
    error?.message === "Network Error"
  );
}

export function getApiErrorCode(error) {
  return error?.response?.data?.error || error?.response?.data?.code || null;
}

export function getApiErrorMessage(error, fallback = "Something went wrong.") {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}

/**
 * Map an API/query error into ErrorState props.
 */
export function describeApiError(error, fallbackTitle = "Something went wrong") {
  if (isNetworkError(error)) {
    return {
      variant: "offline",
      title: "No Internet",
      description: "Check your connection and try again.",
      retryLabel: "Retry",
    };
  }

  const status = error?.response?.status;

  if (status === 403) {
    return {
      variant: "forbidden",
      title: "Access denied",
      description: "You don’t have permission to view this resource.",
      retryLabel: "Try again",
    };
  }

  if (status === 404) {
    return {
      variant: "notFound",
      title: "Not found",
      description: "This resource may have been moved or deleted.",
      retryLabel: "Try again",
    };
  }

  if (status >= 500) {
    return {
      variant: "server",
      title: "Something went wrong on our side",
      description: "Please try again in a moment.",
      retryLabel: "Retry",
    };
  }

  return {
    variant: "default",
    title: fallbackTitle,
    description: getApiErrorMessage(error, "Please try again."),
    retryLabel: "Try again",
  };
}
