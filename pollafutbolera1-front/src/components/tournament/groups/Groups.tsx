"use client";

import { FC } from "react";
import GroupCard from "./GroupCard";
import { Group, GroupsStage } from "@/src/interfaces/polla/group.interface";

interface GroupsProps {
  groups?: Group[];
}

const Groups: FC<GroupsProps> = ({ groups }) => {
  if (!groups || groups.length === 0) {
    return <div className="text-center py-8 text-gray-500">No hay grupos disponibles.</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map(group => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default Groups;
