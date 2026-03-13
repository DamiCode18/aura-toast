import React, { useState } from 'react';
import { AuraProvider, auraToast } from './index';
import './styles/demo.css';

const PRESETS = {
  success: `auraToast.success('Changes saved successfully!', {
  description: 'Your updates have been applied to the production server.',
  glassy: true,
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo clicked'),
  }
});`,
  error: `auraToast.error('Upload failed', {
  description: 'The server responded with a 500 status code. Please try again later.',
  glassy: true
});`,
  info: `auraToast.info('New Update', {
  description: 'AuraToast v1.1.0 is now available with promise support.',
  glassy: true
});`,
  warning: `auraToast.warning('Critical Warning', {
  description: 'Your session is about to expire in 5 minutes.',
  glassy: true
});`,
  custom: `auraToast.info('System Update', {
  description: 'A new version of AuraToast is now available for download.',
  duration: 0,
  glassy: true,
  style: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    '--type-color': '#fff',
    '--type-glow': 'rgba(255, 255, 255, 0.5)',
  }
});`,
  promise: `const myPromise = new Promise((resolve) => setTimeout(resolve, 2000));
auraToast.promise(myPromise, {
  loading: 'Updating profile...',
  success: 'Profile updated successfully!',
  error: 'Failed to update profile'
});`,
};

const App: React.FC = () => {
  const [code, setCode] = useState(PRESETS.success);
  const [activePreset, setActivePreset] = useState<keyof typeof PRESETS>('success');
  const [isGlassy, setIsGlassy] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [position, setPosition] = useState<any>('top-right');

  const handleSetPreset = (key: keyof typeof PRESETS) => {
    let newCode = PRESETS[key];
    // Sync position in new preset code
    newCode = newCode.replace(/position: '[^']+'/, `position: '${position}'`);
    if (!newCode.includes('position:')) {
      newCode = newCode.replace(/glassy: [^,}]+/, `$&,\n  position: '${position}'`);
    }
    setCode(newCode);
    setActivePreset(key);
  };

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

  // Sync code with position change
  const handlePositionChange = (pos: string) => {
    setPosition(pos);
    setCode(prev => {
      if (prev.includes('position:')) {
        return prev.replace(/position: '[^']+'/, `position: '${pos}'`);
      } else {
        return prev.replace(/glassy: [^,}]+/, `$&,\n  position: '${pos}'`);
      }
    });
  };

  const runCode = () => {
    try {
      // Create a safe-ish execution environment
      const execute = new Function('auraToast', code);
      execute(auraToast);
    } catch (err) {
      auraToast.error(`Execution Error: ${err instanceof Error ? err.message : String(err)}`, { 
        description: 'Check your syntax and try again.',
        glassy: isGlassy,
        position: position
      });
    }
  };

  const triggerSuccess = () => auraToast.success('Changes saved successfully!', { 
    description: 'Your updates have been applied.',
    glassy: isGlassy,
    position: position
  });
  const triggerError = () => auraToast.error('An error occurred', { 
    description: 'We could not complete your request at this time.',
    glassy: isGlassy,
    position: position
  });
  const triggerInfo = () => auraToast.info('New Update', { 
    description: 'AuraToast v1.1.0 is now available.',
    glassy: isGlassy,
    position: position
  });
  const triggerWarning = () => auraToast.warning('Critical Warning', { 
    description: 'Your session is about to expire in 5 minutes.',
    glassy: isGlassy,
    position: position
  });

  const triggerPromise = () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 3000));
    auraToast.promise(promise, {
      loading: 'Processing request...',
      success: 'Request completed!',
      error: 'Request failed.'
    }, { glassy: isGlassy, position: position });
  };

  return (
    <AuraProvider className={!isDarkMode ? 'light-mode' : ''}>
      <div className={`theme-container ${!isDarkMode ? 'light-mode' : ''}`}>
        <div className="demo-page">
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
          <button onClick={triggerPromise} className="btn" style={{ background: '#64748b', color: 'white' }}>Show Promise</button>
        </section>

        <section className="playground-section">
          <h2>Live Playground</h2>
          <p>Test the code directly here. Feel free to modify the snippets below!</p>
          
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div className="presets">
                <button 
                  className={`preset-chip ${activePreset === 'success' ? 'active' : ''}`} 
                  onClick={() => handleSetPreset('success')}
                >
                  Success Preset
                </button>
                <button 
                  className={`preset-chip ${activePreset === 'error' ? 'active' : ''}`} 
                  onClick={() => handleSetPreset('error')}
                >
                  Error Preset
                </button>
                <button 
                  className={`preset-chip ${activePreset === 'info' ? 'active' : ''}`} 
                  onClick={() => handleSetPreset('info')}
                >
                  Info Preset
                </button>
                <button 
                  className={`preset-chip ${activePreset === 'warning' ? 'active' : ''}`} 
                  onClick={() => handleSetPreset('warning')}
                >
                  Warning Preset
                </button>
                <button 
                  className={`preset-chip ${activePreset === 'custom' ? 'active' : ''}`} 
                  onClick={() => handleSetPreset('custom')}
                >
                  Custom Styling
                </button>
                <button 
                  className={`preset-chip ${activePreset === 'promise' ? 'active' : ''}`} 
                  onClick={() => handleSetPreset('promise')}
                >
                  Promise Toast
                </button>
              </div>

          <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
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

            <div className="toggle-row">
              <label className="toggle-label">Position</label>
              <select 
                value={position} 
                onChange={(e) => handlePositionChange(e.target.value)}
                style={{
                  background: 'var(--editor-bg)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--card-border)',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  outline: 'none',
                  fontSize: '0.875rem'
                }}
              >
                <option value="top-left">Top Left</option>
                <option value="top-center">Top Center</option>
                <option value="top-right">Top Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-right">Bottom Right</option>
              </select>
            </div>
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
              <button className="playground-btn reset-btn" onClick={() => handleSetPreset('success')}>Reset</button>
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
      </div>
    </AuraProvider>
  );
};

export default App;
