'use client'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
;
import { useState } from 'react';

const AdminSidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
  { title: 'Dashboard', path: '/admin' },
  { title: 'Pollas',  path: '/admin/pollas' },
  { title: 'Participantes',  path: '/admin/select/participantes' },
  { title: 'Precarga',  path: '/admin/select/preload' },
  { title: 'Configuración polla',  path: '/admin/polla-configuration' }
  
  ];

  return (
    <div className={`bg-white shadow-md h-screen transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 flex justify-between items-center">
        
        
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="text-gray-500 hover:text-gray-700"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="flex-1">
        <ul className='py-2'>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.path} passHref>
                <div
                  className={`px-4 py-3 flex items-center cursor-pointer transition-colors ${
                    pathname === item.path
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className={collapsed ? 'hidden' : 'block'}>{item.title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;