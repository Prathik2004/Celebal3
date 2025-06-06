import React, { useState, useMemo } from 'react';

const data = [
  { id: 1, name: 'John Doe', age: 28, role: 'Developer' },
  { id: 2, name: 'Jane Smith', age: 34, role: 'Designer' },
  { id: 3, name: 'Sam Johnson', age: 25, role: 'QA' },
  { id: 4, name: 'Alice Brown', age: 30, role: 'Manager' },
];

export default function Tables() {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedFilteredData = useMemo(() => {
    let filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.role.toLowerCase().includes(search.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [search, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">User Table</h2>
      <input
        type="text"
        placeholder="Search by name or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-4 py-2 border rounded w-full dark:bg-gray-700 dark:text-white"
      />
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
            <th
              className="cursor-pointer px-4 py-2"
              onClick={() => requestSort('name')}
            >
              Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th
              className="cursor-pointer px-4 py-2"
              onClick={() => requestSort('age')}
            >
              Age {sortConfig.key === 'age' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th
              className="cursor-pointer px-4 py-2"
              onClick={() => requestSort('role')}
            >
              Role {sortConfig.key === 'role' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedFilteredData.map(({ id, name, age, role }) => (
            <tr
              key={id}
              className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <td className="px-4 py-2">{name}</td>
              <td className="px-4 py-2">{age}</td>
              <td className="px-4 py-2">{role}</td>
            </tr>
          ))}
          {sortedFilteredData.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-500 dark:text-gray-400">
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
