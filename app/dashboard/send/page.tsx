"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

export default function SendMoneySearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // SEARCH USERS
  useEffect(() => {
    if (!query) {
      setUsers([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/users/search?q=${query}`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  const handleSelectedUser = (name: string, accountNumber: number) => {
    if (!name || !accountNumber) return;
    localStorage.removeItem("selectedUser");
    localStorage.setItem(
      "selectedUser",
      JSON.stringify({ name, accountNumber })
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        {/* HEADER */}
        <div className="px-6 py-5 border-b">
          <h1 className="text-xl font-semibold text-gray-900">Send Money</h1>
          <p className="text-sm text-gray-500 mt-1">
            Search user by name or account
          </p>
        </div>

        {/* SEARCH */}
        <div className="p-6">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Type name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* RESULTS */}
          <div className="mt-4">
            {loading && (
              <p className="text-sm text-gray-500 text-center">Searching...</p>
            )}

            {!loading && query && users.length === 0 && (
              <p className="text-sm text-gray-400 text-center">
                No users found
              </p>
            )}

            {users.length > 0 && (
              <div className="mt-2 border rounded-lg overflow-hidden">
                {users.map((user) => (
                  <div
                    key={user.accountNumber}
                    className="px-4 py-3 flex justify-between items-center hover:bg-blue-50 cursor-pointer transition border-b last:border-none"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Account • {user.accountNumber}
                      </p>
                    </div>
                    <Link href="/dashboard/send/senduser">
                      <span
                        onClick={() =>
                          handleSelectedUser(user.fullName, user.accountNumber)
                        }
                        className="text-xs font-medium text-blue-600"
                      >
                        Select
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
