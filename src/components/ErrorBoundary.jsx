import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para mostrar la UI de error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes enviar el error a un servicio de reporte de errores
    console.error('Error capturado por el ErrorBoundary: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier UI alternativa
      return <h1>Algo salió mal. Por favor, intenta de nuevo más tarde.</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;