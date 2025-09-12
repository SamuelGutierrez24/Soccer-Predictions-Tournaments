'use client';

import React from 'react';
import { Company } from '../../../interfaces/company.interface';
import { Pencil, Trash2 } from 'lucide-react';

interface Props {
  companies: Company[];
  onEdit: (company: Company) => void;
  onDelete: (company: Company) => void;
}

export default function CompanyTable({ companies, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">NIT</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Dirección</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contacto</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {companies.map((company) => (
            <tr key={company.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-800">{company.name}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{company.nit}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{company.address}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{company.contact}</td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(company)}
                    className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                    title="Editar"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(company)}
                    className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
