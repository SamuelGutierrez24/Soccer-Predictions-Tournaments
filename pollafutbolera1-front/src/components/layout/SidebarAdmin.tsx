'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  BarChart2,
  HomeIcon,
  Users,
  Upload,
  Trophy,
  Gift,
  TrendingUp,
  PanelLeft,
  PanelRight,
  Pen,
} from 'lucide-react';
import { title } from 'process';

const menuItems = [
  { title: 'Inicio', path: '', icon: <HomeIcon /> },
  { title: 'Participantes', path: 'participantes', icon: <Users /> },
  { title: 'Precarga', path: 'preload', icon: <Upload /> },
  { title: 'Ranking', path: 'ranking', icon: <Trophy /> },
  { title: 'Premios', path: 'rewards', icon: <Gift /> },
  { title: 'Puntaje', path: 'rules', icon: <TrendingUp /> },
  { title: 'Editar polla', path: 'update', icon: <Pen /> },
];

export const AdminSidebar = ({ pollaId }: { pollaId: string }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`bg-white shadow-xs h-screen transition-all duration-300 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header del sidebar solo con el botón a la derecha */}
      <div className="p-4 flex justify-end items-center border-b">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-gray-700"
        >
          {collapsed ? <PanelRight size={20} /> : <PanelLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1">
        <ul className="py-2 space-y-1">
          {/* Volver al panel con flecha ← */}
          <li>
            <Link href="/admin">
              <div
                className={`px-4 py-3 flex items-center space-x-3 cursor-pointer transition-colors text-gray-700 hover:bg-gray-100`}
              >
                <span className="text-xl">←</span>
                {!collapsed && (
                  <span className="text-sm font-medium">Volver al Panel</span>
                )}
              </div>
            </Link>
          </li>

          {/* Menú dinámico */}
          {menuItems.map((item, index) => {
            const fullPath = `/admin/${pollaId}/${item.path}`;
            const isActive =
              pathname === fullPath ||
              (pathname === `/admin/${pollaId}` && item.path === '') ||
              (pathname === '/user/preLoad' && item.path === 'participantes');

            return (
              <li key={index}>
                <Link href={fullPath}>
                  <div
                    className={`px-4 py-3 flex items-center space-x-3 cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {!collapsed && (
                      <span className="text-sm font-medium">{item.title}</span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
