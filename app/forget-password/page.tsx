"use client"
import React, { useState } from 'react';
import { Mail, KeyRound, Lock, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Define the phases
type ResetPhase = 'email' | 'verification' | 'newPassword';

const PasswordResetFlow = () => {
  const [currentPhase, setCurrentPhase] = useState<ResetPhase>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  // Handle email submission (Phase 1)
  const handleEmailSubmit = async () => {
    if (!email) return;
    
    setIsLoading(true);
    try {
      // API call to send reset code
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setCurrentPhase('verification');
      }
    } catch (error) {
      console.error('Failed to send code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle verification code submission (Phase 2)
  const handleCodeVerification = async () => {
    if (!verificationCode) return;
    
    setIsLoading(true);
    try {
      // API call to verify code
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  resetCode: verificationCode }),
      });
      
      if (response.ok) {
        setCurrentPhase('newPassword');
      }
    } catch (error) {
      console.error('Failed to verify code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password reset (Phase 3)
  const handlePasswordReset = async () => {
    if (!newPassword || !confirmPassword || newPassword !== confirmPassword) return;
    
    setIsLoading(true);
    try {
      // API call to reset password
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          newPassword 
        }),
      });

      
      if (response.ok) {
        toast.success('Password reset successful!');
        router.push("/")        
      }
    } catch (error) {
      console.error('Failed to reset password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to previous phase
  const goBack = () => {
    if (currentPhase === 'verification') {
      setCurrentPhase('email');
      setVerificationCode('');
    } else if (currentPhase === 'newPassword') {
      setCurrentPhase('verification');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  // Phase 1: Email Input
  const renderEmailPhase = () => (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <Mail className="mx-auto h-12 w-12 text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Reset Your Password</h2>
        <p className="text-gray-600 mt-2">
          Enter your email address and we&lsquo;ll send you a verification code.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            disabled={isLoading}
          />
        </div>
        
        <button
          onClick={handleEmailSubmit}
          disabled={isLoading || !email}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Sending...' : 'Send Verification Code'}
        </button>
      </div>
    </div>
  );

  // Phase 2: Verification Code
  const renderVerificationPhase = () => (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <KeyRound className="mx-auto h-12 w-12 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Enter Verification Code</h2>
        <p className="text-gray-600 mt-2">
          We&lsquo;ve sent a verification code to <strong>{email}</strong>
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Verification Code
          </label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-lg tracking-widest"
            placeholder="Enter 6-digit code"
            maxLength={6}
            disabled={isLoading}
          />
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={goBack}
            className="flex items-center justify-center w-12 h-10 border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleCodeVerification}
            disabled={isLoading || !verificationCode}
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>
        </div>
      </div>
    </div>
  );

  // Phase 3: New Password
  const renderPasswordPhase = () => (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <Lock className="mx-auto h-12 w-12 text-purple-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Set New Password</h2>
        <p className="text-gray-600 mt-2">
          Create a strong password for your account.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter new password"
            minLength={8}
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Confirm new password"
            disabled={isLoading}
          />
          {newPassword && confirmPassword && newPassword !== confirmPassword && (
            <p className="text-red-500 text-sm mt-1">Passwords don&lsquo;t match</p>
          )}
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={goBack}
            className="flex items-center justify-center w-12 h-10 border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handlePasswordReset}
            disabled={isLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
            className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </div>
      </div>
    </div>
  );

  // Main render - shows current phase
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Progress indicator */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentPhase === 'email' ? 'bg-blue-500 text-white' : 
            ['verification', 'newPassword'].includes(currentPhase) ? 'bg-green-500 text-white' : 'bg-gray-300'
          }`}>
            1
          </div>
          <div className={`w-16 h-1 ${
            ['verification', 'newPassword'].includes(currentPhase) ? 'bg-green-500' : 'bg-gray-300'
          }`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentPhase === 'verification' ? 'bg-green-500 text-white' : 
            currentPhase === 'newPassword' ? 'bg-green-500 text-white' : 'bg-gray-300'
          }`}>
            2
          </div>
          <div className={`w-16 h-1 ${
            currentPhase === 'newPassword' ? 'bg-purple-500' : 'bg-gray-300'
          }`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentPhase === 'newPassword' ? 'bg-purple-500 text-white' : 'bg-gray-300'
          }`}>
            3
          </div>
        </div>
      </div>

      {/* Render current phase */}
      {currentPhase === 'email' && renderEmailPhase()}
      {currentPhase === 'verification' && renderVerificationPhase()}
      {currentPhase === 'newPassword' && renderPasswordPhase()}
    </div>
  );
};

export default PasswordResetFlow;