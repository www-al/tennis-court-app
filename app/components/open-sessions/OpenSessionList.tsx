"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDate, formatTimeRange, formatCurrency } from '@/lib/utils';

// Define the type for an open session
type OpenSession = {
  id: string;
  court: {
    id: string;
    name: string;
  };
  creator: {
    id: string;
    name: string;
  };
  startTime: string;
  endTime: string;
  totalCost: number;
  maxPlayers: number;
  description: string;
  status: "OPEN" | "FULL" | "CANCELLED" | "COMPLETED";
  participants: {
    id: string;
    userId: string;
    userName: string;
    hasPaid: boolean;
  }[];
};

export default function OpenSessionList() {
  const [sessions, setSessions] = useState<OpenSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/mock/open-sessions');
        if (!response.ok) {
          throw new Error('Failed to fetch open sessions');
        }
        const data = await response.json();
        setSessions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        Error: {error}
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Open Sessions</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          There are currently no open sessions. Be the first to create one!
        </p>
        <Link
          href="/open-sessions/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Session
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200"
        >
          <Link href={`/open-sessions/${session.id}`} className="block">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {session.court.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Organized by {session.creator.name}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                      session.status === "OPEN"
                        ? "bg-green-100 text-green-800"
                        : session.status === "FULL"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {session.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formatDate(new Date(session.startTime))}</span>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mt-2">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatTimeRange(new Date(session.startTime), new Date(session.endTime))}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>
                      {session.participants.length}/{session.maxPlayers} Players
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mt-2">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      {formatCurrency(session.totalCost / Math.max(session.participants.length, 1))} per player
                    </span>
                  </div>
                </div>
              </div>

              {session.description && (
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-4 line-clamp-2">
                  {session.description}
                </p>
              )}
            </div>
            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right">
              <span className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-800 dark:hover:text-blue-300">
                View Details →
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
} 