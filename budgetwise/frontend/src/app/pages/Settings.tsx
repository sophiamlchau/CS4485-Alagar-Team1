import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';

export function Settings() {
  const { user } = useAuth();

  const displayName = user?.name || 'Student';
  const displayEmail = user?.email || '';

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">
            Manage your BudgetTracker student profile. More settings will be added here soon.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Signed in as</div>
              <div className="text-xl font-semibold text-gray-900">{displayName}</div>
              {displayEmail ? (
                <div className="text-sm text-gray-600">{displayEmail}</div>
              ) : null}
            </div>
          </div>

          <div className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-500">
            This is a preview of the settings page. In the future, you&apos;ll be able to update your
            profile and notification preferences here.
          </div>
        </div>
      </div>
    </div>
  );
}

