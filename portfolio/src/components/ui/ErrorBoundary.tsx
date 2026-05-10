import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <main className="section">
        <div className="shell">
          <span className="label-num">§ error</span>
          <h1 style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            Something stopped working.
          </h1>
          <p className="lede measure" style={{ marginBottom: '1.5rem' }}>
            {this.state.error?.message ?? 'Unknown error.'}
          </p>
          <button className="btn" onClick={this.handleReset}>Try again</button>
        </div>
      </main>
    );
  }
}
