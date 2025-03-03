import OpenSessionList from '../components/open-sessions/OpenSessionList';
import Link from 'next/link';

export const metadata = {
  title: 'Open Sessions | Tennis Court Booking',
  description: 'Browse open tennis court sessions in your area',
};

export default function OpenSessionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Open Tennis Sessions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse and join open tennis court sessions
          </p>
        </div>
        
        <Link
          href="/open-sessions/create"
          className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
        >
          Create New Session
        </Link>
      </div>
      
      <OpenSessionList />
    </div>
  );
} 