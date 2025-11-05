import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-center py-10 text-red-600">Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;