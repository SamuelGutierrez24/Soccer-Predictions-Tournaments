'use client';

import React, { useState } from 'react';
import { Company } from '../../../interfaces/company.interface';
import { companyApi } from '@/src/apis';
import { EditCompanySchema } from '@/src/schemas/company/index';
import { z } from 'zod';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ReceiptIcon from '@mui/icons-material/Receipt';

interface Props {
  company: Company;
  onClose: () => void;
  onSuccess: () => void;
  onError?: () => void;
}

export default function EditCompanyModal({ company, onClose, onSuccess }: Props) {
  const [form, setForm] = useState({
    name: company.name,
    nit: company.nit,
    address: company.address,
    contact: company.contact,
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      EditCompanySchema.parse(form);
  
      await companyApi.updateCompany(company.id, {
        name: form.name,
        address: form.address,
        contact: form.contact,
      });
  
      onSuccess();
      onClose(); 
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: any = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
      setIsSubmitting(false);
    }
  };
  

  return (
  <div className="fixed inset-0 bg-gray-800/70 backdrop-blur-sm flex items-center justify-center z-50">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8"
      onClick={e => e.stopPropagation()}
    >
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            <EditIcon sx={{ fontSize: 32, color: '#2563EB' }} />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Editar Empresa</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BusinessIcon sx={{ color: errors.name ? '#EF4444' : '#6B7280', fontSize: '1.2rem' }} />
              </div>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nombre de la empresa"
                className={`w-full pl-10 p-3 border rounded-lg focus:outline-none transition-colors duration-200 ${
                  errors.name 
                    ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400'
                }`}
              />
            </div>
            {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
          </div>

          <div>
            <label htmlFor="nit" className="block text-sm font-medium text-gray-700 mb-1">NIT</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <ReceiptIcon sx={{ color: '#6B7280', fontSize: '1.2rem' }} />
              </div>
              <input
                id="nit"
                name="nit"
                value={form.nit}
                disabled
                className="w-full pl-10 p-3 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed text-gray-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <LocationOnIcon sx={{ color: errors.address ? '#EF4444' : '#6B7280', fontSize: '1.2rem' }} />
              </div>
              <input
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Dirección de la empresa"
                className={`w-full pl-10 p-3 border rounded-lg focus:outline-none transition-colors duration-200 ${
                  errors.address 
                    ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400'
                }`}
              />
            </div>
            {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contacto</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <ContactPhoneIcon sx={{ color: errors.contact ? '#EF4444' : '#6B7280', fontSize: '1.2rem' }} />
              </div>
              <input
                id="contact"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="Número de contacto"
                className={`w-full pl-10 p-3 border rounded-lg focus:outline-none transition-colors duration-200 ${
                  errors.contact 
                    ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400'
                }`}
              />
            </div>
            {errors.contact && <div className="text-red-500 text-sm mt-1">{errors.contact}</div>}
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-70 flex items-center justify-center min-w-[100px]"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </>
              ) : 'Guardar'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
