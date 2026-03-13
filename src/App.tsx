import React, { useState } from 'react';
import { AuraProvider, auraToast } from './index';
import './styles/demo.css';

const PRESETS = {
  success: `auraToast.success('Changes saved successfully!', {
  glassy: true,
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo clicked'),
  }
});`,
  error: `auraToast.error('An unexpected error occurred while processing your request.', {
  glassy: true
});`,
  custom: `auraToast.info('This is a completely custom styled toast!', {
  duration: 0,
  glassy: true,
  style: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    '--type-color': '#fff',
    '--type-glow': 'rgba(255, 255, 255, 0.5)',
  }
});`,
};

const App: React.FC = () => {
  const [code, setCode] = useState(PRESETS.success);
  const [isGlassy, setIsGlassy] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Sync code with glassy toggle
  const handleToggleGlassy = (enabled: boolean) => {
    setIsGlassy(enabled);
    setCode(prev => {
      if (enabled) {
        return prev.replace(/glassy: false/g, 'glassy: true');
      } else {
        return prev.replace(/glassy: true/g, 'glassy: false');
      }
    });
  };

  const runCode = () => {
    try {
      // Create a safe-ish execution environment
      const execute = new Function('auraToast', code);
      execute(auraToast);
    } catch (err) {
      auraToast.error(`Execution Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const triggerSuccess = () => auraToast.success('Project "QuantumLeap" changes were saved successfully!', { glassy: isGlassy });
  const triggerError = () => auraToast.error('An unexpected error occurred.', { glassy: isGlassy });
  const triggerInfo = () => auraToast.info('A new version is available.', { glassy: isGlassy });
  const triggerWarning = () => auraToast.warning('Your subscription is expiring soon.', { glassy: isGlassy });

  return (
    <AuraProvider>
      <div className={`demo-page ${!isDarkMode ? 'light-mode' : ''}`}>
        <header>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-2rem' }}>
            <div className="toggle-row" style={{ margin: 0 }}>
              <label className="toggle-label" htmlFor="theme-toggle">{isDarkMode ? '🌙 Dark' : '☀️ Light'}</label>
              <label className="switch">
                <input 
                  type="checkbox" 
                  id="theme-toggle"
                  checked={!isDarkMode} 
                  onChange={(e) => setIsDarkMode(!e.target.checked)} 
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
          <h1>AuraToast</h1>
          <p>Premium Glassmorphism Toast Manager</p>
        </header>

        <section className="controls">
          <button onClick={triggerSuccess} className="btn success">Show Success</button>
          <button onClick={triggerError} className="btn error">Show Error</button>
          <button onClick={triggerInfo} className="btn info">Show Info</button>
          <button onClick={triggerWarning} className="btn warning">Show Warning</button>
        </section>

        <section className="playground-section">
          <h2>Live Playground</h2>
          <p>Test the code directly here. Feel free to modify the snippets below!</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div className="presets">
              <button className="preset-chip" onClick={() => setCode(PRESETS.success)}>Success Preset</button>
              <button className="preset-chip" onClick={() => setCode(PRESETS.error)}>Error Preset</button>
              <button className="preset-chip" onClick={() => setCode(PRESETS.custom)}>Custom Styling</button>
            </div>

            <div className="toggle-row">
              <label className="toggle-label" htmlFor="glassy-toggle">Glassy Look</label>
              <label className="switch">
                <input 
                  type="checkbox" 
                  id="glassy-toggle"
                  checked={isGlassy} 
                  onChange={(e) => handleToggleGlassy(e.target.checked)} 
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div className="editor-container">
            <div className="editor-header">
              <span className="editor-title">Interactive Editor</span>
            </div>
            <textarea 
              className="code-textarea" 
              value={code} 
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
            />
            <div className="playground-actions">
              <button className="playground-btn reset-btn" onClick={() => setCode(PRESETS.success)}>Reset</button>
              <button className="playground-btn run-btn" onClick={runCode}>Run Snippet</button>
            </div>
          </div>
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
