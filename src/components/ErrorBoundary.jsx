import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: 'monospace', color: '#ff6b6b', background: '#0a0a0a', minHeight: '100vh' }}>
          <p style={{ fontWeight: 700, marginBottom: 8 }}>⚠️ Error de render</p>
          <pre style={{ fontSize: 12, whiteSpace: 'pre-wrap', color: '#ff9999' }}>
            {this.state.error.message}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
