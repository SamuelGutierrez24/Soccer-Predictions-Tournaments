import React from 'react';

interface RewardsCardProps {
  position: string;
  positionColor: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageAlt: string;
}

export function RewardsCard({
  position,
  positionColor,
  title,
  description,
  imageUrl,
  imageAlt
}: RewardsCardProps) {
  return (
    <article className="w-[385px] bg-white shadow-[14px_14px_10px_rgba(0,0,0,0.25)] rounded-[9.232px] border-[2.77px] border-black">
      <header className="text-4xl font-bold text-center py-6" style={{ color: positionColor }}>
        {position}
      </header>
      <div className="p-6">
        <h3 className="text-black text-center text-[28px] mb-6 block font-bold">
          {title}
        </h3>
        <div className="text-black text-center text-xl mb-10">
          {description && <p>{description}</p>}
        </div>
        <div className="w-full h-px bg-black mb-6"></div>
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-[204px] rounded-[9.23px] object-cover"
        />
        <div className="w-full h-px bg-black mt-6"></div>
      </div>
    </article>
  );
}
