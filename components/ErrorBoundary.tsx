import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Erro na renderização da página:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-slate-900 mb-3">Algo deu errado nesta página</h1>
            <p className="text-slate-600 text-sm mb-6">
              Tente voltar para a home. Se o problema continuar, nos avise.
            </p>
            <a href="/" className="inline-block px-6 py-3 bg-brand-600 text-white font-bold uppercase text-sm tracking-wide rounded-sm">
              Voltar para a Home
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
