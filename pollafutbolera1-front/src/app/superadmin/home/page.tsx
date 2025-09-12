"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import Footer from '@/src/components/layout/Footer';
import Navbar from '@/src/components/layout/Navbar';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

import AdminHeader from '@/src/components/admin/AdminHeader';
import ViewToggle from '@/src/components/admin/ViewToggle';
import ContentSection from '@/src/components/admin/ContentSection';
import { getPollas } from '@/src/hooks/polla/usePolla';
import { getAllCompanies } from '@/src/hooks/company/useCompany';
import { Company } from '@/src/interfaces/company.interface';
import EditCompanyModal from '@/src/components/superadmin/companies/EditCompanyModal';
import DeleteCompanyModal from '@/src/components/superadmin/companies/DeleteCompanyModal';

interface PollaResponse {
  id: string;
  company: {
    name: string;
  };
  imageUrl: string;
  tournament: {
    description: string;
    name: string;
  };
  color: string;
}

interface pollaData{
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  color: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [showPolls, setShowPolls] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pollsData, setPollsData] = useState<pollaData[]>([]);
  const [companiesData, setCompaniesData] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const before = ["Vive", "Experimenta", "Disfruta", "Celebra", "Acompaña", "Participa en", "Únete a", "Conquista"];
      const after = ["junto a", "con", "en compañía de", "al lado de", "en colaboración con", "en alianza con", "en asociación con"];
      getPollas()
        .then((response) => {
          const pollas: pollaData[] = response.map((item: PollaResponse) => ({
            id: item.id,
            imageUrl: item.imageUrl,
            title: item.tournament.name,
            description: `${before[Math.floor(Math.random() * before.length)]} la ${item.tournament.description} ${after[Math.floor(Math.random() * after.length)]} ${item.company.name}`,
            color: item.color
          }));
          console.log('Pollas', pollas);
          setPollsData(pollas);
          getAllCompanies()
            .then((response) => {
              console.log('Companies:', response);
              setCompaniesData(response);
            })
            .catch((error) => {
              console.error('Error fetching companies:', error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.error('Error fetching pollas:', error);
        })


    };

    fetchData();
    
  }, []);

  const handleCreatePoll = () => {
    router.push('/polla/polla-configuration');
  };

  const handleLoadUsers = () => {
    console.log('Load Users clicked');
    // Navigate to load users page
    // router.push('/admin/load-users');
  };

  const handleInviteUsers = () => {
    console.log('Invite Users clicked');
    // Navigate to invite users page
    // router.push('/admin/invite-users');
  };

  const handleCreateCompany = () => {
    router.push('/superadmin/company/create');
  };

  const handleToggleView = () => {
    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      setShowPolls(!showPolls);
      setIsLoading(false);
    }, 1000);
  };

  const handlePollaClick = (pollaId: string) => {
    Cookies.set("pollaId", pollaId, { expires: 1 });
    //CAMBIAR ESTO POR LA RUTA DE LA PANTALLA DE MATASCA Y JACOBO
    router.push(`/polla/${pollaId}`);
  };

  const handleEditCompany = (company: Company) => {
    setSelectedCompany(company);
    setShowEditModal(true);
  };

  const handleDeleteCompany = (company: Company) => {
    setSelectedCompany(company);
    setShowDeleteModal(true);
  };

  const handleCloseModals = () => {
    setSelectedCompany(null);
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  const refreshCompanies = async () => {
    try {
      const response = await getAllCompanies();
      setCompaniesData(response);
    } catch (error) {
      console.error('Error refreshing companies:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto py-8 px-4 md:px-8">
        <AdminHeader
          showPolls={showPolls}
          isLoading={isLoading}
          handleCreatePoll={handleCreatePoll}
          handleLoadUsers={handleLoadUsers}
          handleInviteUsers={handleInviteUsers}
          handleCreateCompany={handleCreateCompany}
        />
        
        <ViewToggle
          showPolls={showPolls}
          isLoading={isLoading}
          handleToggleView={handleToggleView}
        />
        
        <ContentSection
          showPolls={showPolls}
          isLoading={isLoading}
          pollsData={pollsData}
          companiesData={companiesData}
          onPollaClick={handlePollaClick}
          onEditCompany={handleEditCompany}
          onDeleteCompany={handleDeleteCompany}
        />

        {showEditModal && selectedCompany && (
          <EditCompanyModal
            company={selectedCompany}
            onClose={handleCloseModals}
            onSuccess={() => {
              toast.success('¡Empresa editada con éxito!');
              refreshCompanies();
              handleCloseModals();
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
              refreshCompanies();
              handleCloseModals();
            }}
            onError={() => toast.error('Hubo un error al eliminar la empresa')}
          />
        )}
      </main>
      <Footer />
      <ToastContainer position="bottom-right" />
    </div>
  );
}