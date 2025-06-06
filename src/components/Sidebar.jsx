import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  TableIcon,
  ChartBarIcon,
  CalendarIcon,
  ClipboardListIcon,
} from '@heroicons/react/outline';

const links = [
  { name: 'Dashboard', to: '/dashboard', icon: HomeIcon },
  { name: 'Tables', to: '/tables', icon: TableIcon },
  { name: 'Charts', to: '/charts', icon: ChartBarIcon },
  { name: 'Calendar', to: '/calendar', icon: CalendarIcon },
  { name: 'Kanban Board', to: '/kanban', icon: ClipboardListIcon },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 h-full shadow-lg">
      <div className="p-6 text-2xl font-bold text-blue-600 border-b border-gray-300 dark:border-gray-700">
        Admin Panel
      </div>
      <nav className="mt-6">
        {links.map(({ name, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 my-1 transition-colors rounded-lg
              ${isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-gray-700'}`
            }
          >
            <Icon className="h-6 w-6 mr-3" />
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
