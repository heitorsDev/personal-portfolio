'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authService } from '@/lib/api';
import styles from '@/styles/Form.module.css';

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
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <span className={styles.tag}>{authType === 'login' ? 'Welcome Back' : 'Create Account'}</span>
            <h1 className={styles.title}>{authType === 'login' ? 'Login' : 'Register'}</h1>
            <p className={styles.subtitle}>
              {authType === 'login' ? 'Sign in to manage your portfolio' : 'Create an account to get started'}
            </p>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={styles.input}
                required
              />
            </div>

            {authType === 'register' && (
              <>
                <div className={styles.field}>
                  <label className={styles.label}>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Secret</label>
                  <input
                    type="password"
                    name="secret"
                    placeholder="Enter secret code"
                    value={formData.secret}
                    onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
                    className={styles.input}
                    required
                  />
                </div>
              </>
            )}

            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                id="registerMode"
                checked={authType === 'register'}
                onChange={(e) => {
                  setAuthType(e.target.checked ? 'register' : 'login');
                  setFormData({ email: '', password: '', name: '', secret: '' });
                  setError('');
                }}
                className={styles.checkbox}
              />
              <label htmlFor="registerMode" className={styles.checkboxLabel}>
                I need to create an account
              </label>
            </div>

            <button type="submit" className={styles.btnPrimary}>
              {authType === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>

        <div className={styles.linkWrapper}>
          <Link href="/" className={styles.backLink}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
