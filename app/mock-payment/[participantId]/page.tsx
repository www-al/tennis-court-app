"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MockPaymentPage({ params }: { params: { participantId: string } }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCompletePayment = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the mock payment API
      const response = await fetch('/api/mock/payments/open-session', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ participantId: params.participantId }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Payment failed');
      }
      
      // Redirect to the sessions page
      router.push('/open-sessions');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Mock Payment
      </h1>
      
      <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
        <p className="text-yellow-800 dark:text-yellow-300 text-sm">
          This is a mock payment page for demonstration purposes. In a real application, 
          this would be integrated with a payment processor like Stripe.
        </p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Payment Details
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Participant ID:</span>
            <span className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {params.participantId}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Amount:</span>
            <span className="text-gray-800 dark:text-gray-200">$25.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
            <span className="text-gray-800 dark:text-gray-200">Mock Credit Card</span>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <button
        onClick={handleCompletePayment}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-md font-medium text-white ${
          loading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        } transition duration-200`}
      >
        {loading ? 'Processing...' : 'Complete Payment'}
      </button>
      
      <button
        onClick={() => router.push('/open-sessions')}
        className="w-full mt-4 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
      >
        Cancel
      </button>
    </div>
  );
} 