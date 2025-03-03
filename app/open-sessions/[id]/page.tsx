"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useMockSession } from '@/lib/mock-auth-provider';
import { formatDate, formatTimeRange, formatCurrency } from '@/lib/utils';

export default function OpenSessionDetailPage({ params }: { params: { id: string } }) {
  const [sessionDetails, setSessionDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);
  const router = useRouter();
  const { session, status } = useMockSession();

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await fetch(`/api/mock/open-sessions/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch session details");
        }
        const data = await response.json();
        setSessionDetails(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [params.id]);

  const handleJoinSession = async () => {
    if (!session) {
      alert("Demo Mode: In a real app, you would be redirected to sign in first.");
      return;
    }

    setJoining(true);
    try {
      const response = await fetch("/api/mock/open-sessions/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: params.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to join session");
      }

      // Redirect to payment page
      router.push(`/mock-payment/${data.participantId}`);
    } catch (err: any) {
      setError(err.message);
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          Error: {error}
        </div>
        <Link
          href="/open-sessions"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ← Back to all sessions
        </Link>
      </div>
    );
  }

  if (!sessionDetails) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4">
          Session not found
        </div>
        <Link
          href="/open-sessions"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ← Back to all sessions
        </Link>
      </div>
    );
  }

  const isCreator = session?.user.id === sessionDetails.creator.id;
  const hasJoined = sessionDetails.participants.some(
    (p: any) => p.userId === session?.user.id
  );
  const availableSpots =
    sessionDetails.maxPlayers - sessionDetails.participants.length;
  const hasPaid = hasJoined && 
    sessionDetails.participants.find((p: any) => p.userId === session?.user.id).hasPaid;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/open-sessions"
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6 inline-block"
      >
        ← Back to all sessions
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {sessionDetails.court.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {sessionDetails.description}
              </p>
            </div>
            <span
              className={`mt-2 md:mt-0 px-3 py-1 text-sm font-bold rounded-full ${
                sessionDetails.status === "OPEN"
                  ? "bg-green-100 text-green-800"
                  : sessionDetails.status === "FULL"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {sessionDetails.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Session Details
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 w-24">
                    Organizer:
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {sessionDetails.creator.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 w-24">
                    Date:
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {formatDate(new Date(sessionDetails.startTime))}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 w-24">
                    Time:
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {formatTimeRange(
                      new Date(sessionDetails.startTime),
                      new Date(sessionDetails.endTime)
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 w-24">
                    Total Cost:
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {formatCurrency(sessionDetails.totalCost)}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 w-24">
                    Cost/Player:
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {formatCurrency(
                      sessionDetails.totalCost / Math.max(1, sessionDetails.participants.length)
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 w-24">
                    Players:
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {sessionDetails.participants.length}/{sessionDetails.maxPlayers}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Participants
              </h2>
              {sessionDetails.participants.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">
                  No participants yet. Be the first to join!
                </p>
              ) : (
                <ul className="space-y-3">
                  {sessionDetails.participants.map((participant: any) => (
                    <li
                      key={participant.id}
                      className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-medium">
                            {participant.userName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {participant.userName}
                          {participant.userId === session?.user.id && " (You)"}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          participant.hasPaid
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {participant.hasPaid ? "Paid" : "Pending Payment"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            {isCreator ? (
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6">
                <p className="text-blue-800 dark:text-blue-300">
                  You are the organizer of this session.
                </p>
              </div>
            ) : hasJoined ? (
              hasPaid ? (
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg mb-6">
                  <p className="text-green-800 dark:text-green-300">
                    You've joined this session and completed your payment. See you on the court!
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg mb-6">
                  <p className="text-yellow-800 dark:text-yellow-300 mb-2">
                    You've joined this session but haven't paid yet.
                  </p>
                  <button
                    onClick={() => {
                      // Find participant ID
                      const participant = sessionDetails.participants.find(
                        (p: any) => p.userId === session?.user.id
                      );
                      if (participant) {
                        router.push(`/mock-payment/${participant.id}`);
                      }
                    }}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                  >
                    Complete Payment
                  </button>
                </div>
              )
            ) : (
              <>
                {sessionDetails.status === "OPEN" && availableSpots > 0 ? (
                  <button
                    onClick={handleJoinSession}
                    disabled={joining}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                  >
                    {joining ? "Joining..." : "Join Session"}
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full md:w-auto bg-gray-400 text-white font-bold py-3 px-6 rounded cursor-not-allowed"
                  >
                    {sessionDetails.status === "FULL"
                      ? "Session Full"
                      : "Session Unavailable"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 