'use client';

import { useState } from 'react';
import { authService } from '@/lib/api';

export default function Login() {

  const [authType, setAuthType] = useState('login');
  const [formData, setFormData] = useState({ email: '', password: '', name: '', secret: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (authType === 'login') {
        await authService.login(formData);
      } else {
        await authService.register(formData);
      }
      window.location.href = '/';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main>
      <h1>{authType === 'login' ? 'Login' : 'Register'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        
        {authType === 'register' && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="password"
              name="secret"
              placeholder="Secret"
              value={formData.secret}
              onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
              required
            />
          </>
        )}
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit">{authType === 'login' ? 'Login' : 'Register'}</button>
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
          <input
            type="checkbox"
            checked={authType === 'register'}
            onChange={(e) => {
              setAuthType(e.target.checked ? 'register' : 'login');
              setFormData({ email: '', password: '', name: '', secret: '' });
              setError('');
            }}
          />
          <span>Register mode</span>
        </label>
      </form>
    </main>
  );
}
