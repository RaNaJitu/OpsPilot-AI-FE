import { Component } from "react";

import ErrorState from "./ErrorState";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("UI error boundary:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-lg p-6 md:p-10">
          <ErrorState
            variant="server"
            title="Something went wrong"
            description="An unexpected error occurred. You can try reloading this view."
            retryLabel="Reload view"
            onRetry={this.handleRetry}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
