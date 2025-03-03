"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMockSession } from '@/lib/mock-auth-provider';

export default function CreateOpenSessionPage() {
  const [courts, setCourts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { session, status } = useMockSession();

  const [formData, setFormData] = useState({
    courtId: '',
    startTime: '',
    endTime: '',
    maxPlayers: 4,
    description: '',
  });

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await fetch('/api/mock/courts');
        if (!response.ok) {
          throw new Error('Failed to fetch courts');
        }
        const data = await response.json();
        setCourts(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, courtId: data[0].id }));
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      alert("Demo Mode: In a real app, you would need to be signed in to create a session.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Calculate total cost based on court hourly rate and duration
      const selectedCourt = courts.find(court => court.id === formData.courtId);
      const startTime = new Date(formData.startTime);
      const endTime = new Date(formData.endTime);
      
      if (endTime <= startTime) {
        throw new Error("End time must be after start time");
      }
      
      const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
      const totalCost = selectedCourt.hourlyRate * durationHours;

      const sessionData = {
        ...formData,
        totalCost,
      };

      const response = await fetch('/api/mock/open-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create session');
      }

      const data = await response.json();
      router.push(`/open-sessions/${data.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Set default date and time values for the form
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Set start time to tomorrow at 10:00 AM
    tomorrow.setHours(10, 0, 0, 0);
    const startTime = tomorrow.toISOString().slice(0, 16);
    
    // Set end time to tomorrow at 12:00 PM
    const endTime = new Date(tomorrow);
    endTime.setHours(12, 0, 0, 0);
    
    setFormData(prev => ({
      ...prev,
      startTime,
      endTime: endTime.toISOString().slice(0, 16),
    }));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/open-sessions"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ← Back to all sessions
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
          Create Open Session
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Create a new open session for others to join
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          Error: {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="courtId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tennis Court
            </label>
            <select
              id="courtId"
              name="courtId"
              value={formData.courtId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {courts.map(court => (
                <option key={court.id} value={court.id}>
                  {court.name} - ${court.hourlyRate}/hour
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Time
              </label>
              <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Time
              </label>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="maxPlayers" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Maximum Players
            </label>
            <input
              type="number"
              id="maxPlayers"
              name="maxPlayers"
              value={formData.maxPlayers}
              onChange={handleChange}
              min="2"
              max="8"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe your session (skill level, game type, etc.)"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 px-4 rounded-md font-medium text-white ${
                submitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition duration-200`}
            >
              {submitting ? 'Creating...' : 'Create Session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 