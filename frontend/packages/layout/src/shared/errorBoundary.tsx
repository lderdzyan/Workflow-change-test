import { reportGuiError } from "@repo/gui-sdk";
import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  componentDidCatch(error: Error) {
    reportGuiError({
      uri: decodeURIComponent(window.location.href),
      error: error.message,
      stacktrace: error.stack,
    });
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;

