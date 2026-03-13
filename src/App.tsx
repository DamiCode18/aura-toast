import React from 'react';
import { AuraProvider, auraToast } from './index';
import './styles/demo.css';

const App: React.FC = () => {
  const triggerSuccess = () => {
    auraToast.success('Project "QuantumLeap" changes were saved successfully!', {
      action: {
        label: 'View Project',
        onClick: () => console.log('Action clicked'),
      }
    });
  };

  const triggerError = () => {
    auraToast.error('An unexpected error occurred while processing your request.');
  };

  const triggerInfo = () => {
    auraToast.info('A new version of the application is available.', {
      duration: 10000,
    });
  };

  const triggerWarning = () => {
    auraToast.warning('Your subscription is expiring in 3 days.', {
      duration: 3000,
    });
  };

  const triggerCustom = () => {
    auraToast.info('This is a completely custom styled toast!', {
      duration: 0, // Sticky
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        '--type-color': '#fff',
        '--type-glow': 'rgba(255, 255, 255, 0.5)',
      } as any,
    });
  };

  return (
    <AuraProvider>
      <div className="demo-page">
        <header>
          <h1>AuraToast</h1>
          <p>Premium Glassmorphism Toast Manager</p>
        </header>

        <section className="controls">
          <button onClick={triggerSuccess} className="btn success">Show Success</button>
          <button onClick={triggerError} className="btn error">Show Error</button>
          <button onClick={triggerInfo} className="btn info">Show Info</button>
          <button onClick={triggerWarning} className="btn warning">Show Warning</button>
          <button onClick={triggerCustom} className="btn custom" style={{background: '#764ba2', color: 'white'}}>Show Custom & Sticky</button>
        </section>

        <section className="features">
          <div className="feature-card">
            <h3>Single Toast Constraint</h3>
            <p>Clicking another button will replace the current toast instantly with a smooth transition. No more cluttered screens.</p>
          </div>
          <div className="feature-card">
            <h3>Glassmorphism UI</h3>
            <p>Ultra-modern design with backdrop-blur, subtle borders, and soft shadows.</p>
          </div>
        </section>
      </div>
    </AuraProvider>
  );
};

export default App;
