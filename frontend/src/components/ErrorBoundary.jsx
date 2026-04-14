import { Component } from 'react';
export class ErrorBoundary extends Component {
    state = {
        hasError: false,
    };
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (<div className="error-boundary" style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: '#fafafa',
                    backgroundColor: '#0e0e0e',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Oops! Something went wrong</h1>
          <p style={{ marginBottom: '20px' }}>We're sorry for the inconvenience.</p>
          <button onClick={() => window.location.reload()} style={{
                    padding: '12px 24px',
                    backgroundColor: '#ccff00',
                    color: '#000',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                }}>
            Reload Page
          </button>
        </div>);
        }
        return this.props.children;
    }
}
