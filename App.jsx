import { useState } from 'react';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!code) {
      setMessage('❌ Please enter your verification code.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://145.239.65.119:5000/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Verified successfully!');
      } else {
        setMessage(`❌ ${data.error || 'Verification failed.'}`);
      }
    } catch (err) {
      setMessage('❌ Could not reach the verification server.');
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Discord Verification</h1>
      <input
        type="text"
        placeholder="Enter your verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleVerify} disabled={loading}>
        {loading ? 'Verifying...' : 'Verify'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;