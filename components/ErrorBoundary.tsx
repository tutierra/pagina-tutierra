"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center bg-brand-ink text-white">
          <h2 className="font-display text-[1.8rem] text-tech-green">Cargando información...</h2>
          <p className="mt-2 text-[0.95rem] text-brand-gray/70 max-w-[45ch]">
            Estamos sincronizando la información actualizada. Por favor recarga la página en unos segundos.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-tech-green px-6 py-2.5 text-[0.9rem] text-brand-ink font-semibold hover:scale-[0.98] transition-transform"
          >
            Recargar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
