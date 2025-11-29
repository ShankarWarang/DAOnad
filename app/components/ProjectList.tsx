'use client';

import { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import { formatUnits } from 'viem';
import { DAONAD_ABI } from '../config/abis';
import ProjectCard from './ProjectCard';

export default function ProjectList() {
  const [projectIds, setProjectIds] = useState<number[]>([]);
  const [projectCounter, setProjectCounter] = useState(0);

  // Get project counter
  const { data: counter } = useContractRead({
    address: process.env.NEXT_PUBLIC_DAONAD_ADDRESS as `0x${string}`,
    abi: DAONAD_ABI,
    functionName: 'projectCounter',
  });

  useEffect(() => {
    if (counter) {
      const count = Number(counter);
      setProjectCounter(count);
      setProjectIds(Array.from({ length: count }, (_, i) => i + 1));
    }
  }, [counter]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">All Projects</h2>
        <p className="text-gray-600">
          Discover and support innovative projects on Monad testnet
        </p>
      </div>

      {projectIds.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No projects yet. Be the first to create one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectIds.map((id) => (
            <ProjectCard key={id} projectId={id} />
          ))}
        </div>
      )}
    </div>
  );
}

