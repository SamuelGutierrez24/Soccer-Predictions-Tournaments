'use client';

import React from 'react';

interface BreadcrumbProps {
  text: string;
}

export default function Breadcrumb({ text }: BreadcrumbProps) {
  return (
    <div className="flex justify-start mb-8">
      <span className="text-sm text-gray-500">{text}</span>
    </div>
  );
}
