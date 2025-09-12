'use client';

import React, { useEffect, useState } from 'react';
import { Company } from '../../../interfaces/company.interface';
import CompanyTable from '@/src/components/superadmin/companies/CompaniesTable';
import EditCompanyModal from '@/src/components/superadmin/companies/EditCompanyModal';
import DeleteCompanyModal from '@/src/components/superadmin/companies/DeleteCompanyModal';
import { companyApi } from '@/src/apis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';



export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleCreateCompany = () => {
    router.push('/superadmin/company/create');
  };


  const fetchCompanies = async () => {
    try {
      const data = await companyApi.getAllCompanies();
      setCompanies(data);
      setError(false);
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchCompanies();
    }, 200);
  }, []);

  const handleEdit = (company: Company) => {
    setSelectedCompany(company);
    setShowEditModal(true);
  };

  const handleDelete = (company: Company) => {
    setSelectedCompany(company);
    setShowDeleteModal(true);
  };

  const handleCloseModals = () => {
    setSelectedCompany(null);
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  const renderSkeletonRow = (key: number) => (
    <tr key={key} className="animate-pulse border-t">
      {Array.from({ length: 5 }).map((_, idx) => (
        <td key={idx} className="px-4 py-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </td>
      ))}
    </tr>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Empresas</h1>
      <button
      onClick={handleCreateCompany}
      className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Crear Empresa
      </button>

      {loading ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium">Nombre</th>
                <th className="px-4 py-2 text-left text-sm font-medium">NIT</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Dirección</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Contacto</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => renderSkeletonRow(i))}
            </tbody>
          </table>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 bg-red-100 border border-red-300 p-4 rounded">
          No se pudieron cargar las empresas. Verifica la conexión con el servidor.
        </div>
      ) : companies.length === 0 ? (
        <div className="text-center text-gray-600 bg-gray-100 border border-gray-300 p-4 rounded">
          No hay empresas disponibles.
        </div>
      ) : (
        <CompanyTable
          companies={companies}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      
      {showEditModal && selectedCompany && (
        <EditCompanyModal
        company={selectedCompany}
        onClose={handleCloseModals}
        onSuccess={() => {
          toast.success('¡Empresa editada con éxito!');
          fetchCompanies();
          }}
          onError={() => toast.error('Hubo un error al editar la empresa')}
          />
      )}


      {showDeleteModal && selectedCompany && (
        <DeleteCompanyModal
          company={selectedCompany}
          onClose={handleCloseModals}
          onSuccess={() => {
            toast.success(`Empresa "${selectedCompany.name}" eliminada correctamente.`); 
            fetchCompanies();
          }}
          onError={() => toast.error('Hubo un error al eliminar la empresa')}
        />
      )}
      <ToastContainer 
        position="bottom-right" 
      />
    </div>
  );
}
