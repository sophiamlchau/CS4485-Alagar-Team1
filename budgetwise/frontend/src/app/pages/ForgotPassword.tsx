'use client';

import { useState } from 'react';
import { apiJson } from '../lib/api';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setMessage('');
    setError('');

    try {
      await apiJson('/api/auth/resetPassword', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      setMessage('Password reset successfully.');
    } catch (err: any) {
      setError(err.message || 'Reset failed.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Reset Password
        </h1>

        <p className="text-gray-600 mb-6">
          Enter your account email and a new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          {message && (
            <p className="text-green-600 text-sm">{message}</p>
          )}

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}