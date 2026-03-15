import React, { useState } from 'react';
import { AuraProvider, auraToast } from './index';
import './styles/demo.css';

const PRESETS = {
  success: `auraToast.success({
  title: 'Changes saved successfully!',
  description: 'Your updates have been applied to the production server.',
  glassy: true,
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo clicked'),
  }
});`,
  error: `auraToast.error({
  title: 'Upload failed',
  description: 'The server responded with a 500 status code. Please try again later.',
  glassy: true
});`,
  info: `auraToast.info({
  description: 'AuraToast v1.1.0 is now available without a title.',
  glassy: true
});`,
  warning: `auraToast.warning({
  title: 'Critical Warning',
  description: 'Your session is about to expire in 5 minutes.',
  glassy: true
});`,
  custom: `auraToast.info({
  title: 'System Update',
  description: 'A new version of AuraToast is now available for download.',
  duration: 0,
  glassy: true,
  style: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    '--type-color': '#fff',
    '--type-glow': 'rgba(255, 255, 255, 0.5)',
    '--toast-font-size-title': '1rem',
    '--toast-font-size-desc': '0.875rem'
  }
});`,
  promise: `const myPromise = new Promise((resolve, reject) => setTimeout(Math.random() > 0.5 ? resolve : reject, 2000));
auraToast.promise(myPromise, {
  loading: { title: 'Updating profile...' },
  success: { title: 'Profile updated successfully!' },
  error: { title: 'Failed to update profile' }
});`,
};

const App: React.FC = () => {
  const [code, setCode] = useState(PRESETS.success);
  const [activePreset, setActivePreset] = useState<keyof typeof PRESETS>('success');
  const [isGlassy, setIsGlassy] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [position, setPosition] = useState<any>('top-right');
  const [duration, setDuration] = useState(4000);
  const [isStacked, setIsStacked] = useState(false);

  const handleSetPreset = (key: keyof typeof PRESETS) => {
    let newCode = PRESETS[key];
    // Sync position and duration in new preset code
    newCode = newCode.replace(/position: '[^']+'/, `position: '${position}'`);
    newCode = newCode.replace(/duration: \d+/, `duration: ${duration}`);
    
    if (!newCode.includes('position:')) {
      newCode = newCode.replace(/glassy: [^,}]+/, `$&,\n  position: '${position}'`);
    }
    if (!newCode.includes('duration:')) {
      newCode = newCode.replace(/position: [^,}]+/, `$&,\n  duration: ${duration}`);
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

  // Sync code with duration change
  const handleDurationChange = (dur: number) => {
    setDuration(dur);
    setCode(prev => {
      if (prev.includes('duration:')) {
        return prev.replace(/duration: \d+/, `duration: ${dur}`);
      } else {
        return prev.replace(/position: [^,}]+/, `$&,\n  duration: ${dur}`);
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
        position: position,
        duration: duration
      });
    }
  };

  const triggerSuccess = () => auraToast.success({ 
    title: 'Changes saved successfully!',
    description: 'Your updates have been applied.',
    glassy: isGlassy,
    position: position,
    duration: duration
  });
  const triggerError = () => auraToast.error({ 
    title: 'An error occurred',
    description: 'We could not complete your request at this time.',
    glassy: isGlassy,
    position: position,
    duration: duration
  });
  const triggerInfo = () => auraToast.info({ 
    title: 'New Update',
    description: 'AuraToast v1.1.0 is now available.',
    glassy: isGlassy,
    position: position,
    duration: duration
  });
  const triggerWarning = () => auraToast.warning({ 
    title: 'Critical Warning',
    description: 'Your session is about to expire in 5 minutes.',
    glassy: isGlassy,
    position: position,
    duration: duration
  });

  const triggerPromise = () => {
    const promise = new Promise((resolve, reject) => setTimeout(Math.random() > 0.5 ? resolve : reject, 3000));
    auraToast.promise(promise, {
      loading: { title: 'Processing request...' },
      success: { title: 'Request completed!' },
      error: { title: 'Request failed.' }
    }, { glassy: isGlassy, position: position, duration: duration });
  };

  return (
    <AuraProvider className={!isDarkMode ? 'light-mode' : ''} stack={isStacked}>
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
              <label className="toggle-label" htmlFor="stack-toggle">Stack Toasts</label>
              <label className="switch">
                <input 
                  type="checkbox" 
                  id="stack-toggle"
                  checked={isStacked} 
                  onChange={(e) => setIsStacked(e.target.checked)} 
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

            <div className="toggle-row">
              <label className="toggle-label">Duration</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="500"
                  value={duration} 
                  onChange={(e) => handleDurationChange(parseInt(e.target.value))}
                  style={{ cursor: 'pointer', width: '100px' }}
                />
                <span style={{ fontSize: '0.875rem', width: '3.5rem', opacity: 0.8 }}>
                  {duration === 0 ? 'Sticky' : `${(duration / 1000).toFixed(1)}s`}
                </span>
              </div>
            </div>
          </div>
          </div>

          <div className="editor-container">
            <div className="editor-header">
              <div className="header-left">
                <div className="mac-controls">
                  <div className="mac-dot close"></div>
                  <div className="mac-dot minimize"></div>
                  <div className="mac-dot expand"></div>
                </div>
                <span className="editor-title">Interactive Editor</span>
              </div>
              <button 
                className="copy-btn" 
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  auraToast.success('Copied to clipboard!', { position: 'bottom-center' });
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy
              </button>
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
