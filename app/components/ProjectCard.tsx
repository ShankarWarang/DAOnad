'use client';

import { useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { DAONAD_ABI } from '../config/abis';
import { formatAddress } from '../utils/format';
import { formatDistanceToNow } from 'date-fns';

export default function ProjectCard({ projectId }: { projectId: number }) {
  const { data: project, isLoading } = useReadContract({
    address: process.env.NEXT_PUBLIC_DAONAD_ADDRESS as `0x${string}`,
    abi: DAONAD_ABI,
    functionName: 'getProject',
    args: [BigInt(projectId)],
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  if (!project || project.founder === '0x0000000000000000000000000000000000000000') {
    return null;
  }

  const progress = Number(project.totalBacked) / Number(project.targetAmount);
  const statusLabels = ['Pending', 'Active', 'Funded', 'Rejected', 'Cancelled'];
  const statusColors = [
    'bg-gray-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-red-500',
    'bg-yellow-500',
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            statusColors[Number(project.status)]
          }`}
        >
          {statusLabels[Number(project.status)]}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

      <div className="space-y-3 mb-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-semibold">
              {formatUnits(project.totalBacked, 6)} / {formatUnits(project.targetAmount, 6)} USDC
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(progress * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <p>Founder: {formatAddress(project.founder)}</p>
          <p>Milestones: {project.milestoneCount.toString()}</p>
          <p>
            Deadline:{' '}
            {formatDistanceToNow(new Date(Number(project.deadline) * 1000), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t">
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}

