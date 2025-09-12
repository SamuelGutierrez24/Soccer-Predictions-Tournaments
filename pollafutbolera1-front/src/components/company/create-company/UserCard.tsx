import React from "react";
import Image from "next/image";
import { User } from "@/src/interfaces/user.interface";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="flex items-center space-x-4">
      <div>
        <h3 className="font-semibold">{user.nickname}</h3>
        <p className="text-sm text-gray-600">CC {user.cedula}</p>
        <p className="text-sm">
          {user.name} {user.lastName}
        </p>
      </div>
    </div>
  );
}