'use client';

import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { DAONAD_ABI, USDC_ABI } from '../config/abis';
import { formatAddress } from '../utils/format';

export default function BackerMode() {
  const { address } = useAccount();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [backingAmount, setBackingAmount] = useState('');

  // Get user's backed projects
  const { data: backedProjects } = useContractRead({
    address: process.env.NEXT_PUBLIC_DAONAD_ADDRESS as `0x${string}`,
    abi: DAONAD_ABI,
    functionName: 'getBackerProjects',
    args: address ? [address] : undefined,
    enabled: !!address,
  });

  const { write: approveWrite, data: approveHash, isLoading: isApproving } = useContractWrite({
    address: process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`,
    abi: USDC_ABI,
    functionName: 'approve',
  });
  
  const { write: backWrite, data: backHash, isLoading: isBacking } = useContractWrite({
    address: process.env.NEXT_PUBLIC_DAONAD_ADDRESS as `0x${string}`,
    abi: DAONAD_ABI,
    functionName: 'backProject',
  });
  
  const { isLoading: isApproveConfirming, isSuccess: isApproveSuccess } = useWaitForTransaction({
    hash: approveHash?.hash,
    enabled: !!approveHash?.hash,
  });
  
  const { isLoading: isBackConfirming, isSuccess: isBackSuccess } = useWaitForTransaction({
    hash: backHash?.hash,
    enabled: !!backHash?.hash,
  });

  const handleBackProject = async (projectId: number) => {
    if (!backingAmount || !selectedProject) return;

    const amount = parseUnits(backingAmount, 6);
    const daonadAddress = process.env.NEXT_PUBLIC_DAONAD_ADDRESS as `0x${string}`;

    // First approve USDC
    approveWrite({
      args: [daonadAddress, amount],
    });
  };

  // After approval, back the project
  useEffect(() => {
    if (isApproveSuccess && selectedProject !== null && backingAmount) {
      backWrite({
        args: [BigInt(selectedProject), parseUnits(backingAmount, 6)],
      });
    }
  }, [isApproveSuccess, selectedProject, backingAmount, backWrite]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6">Back Projects</h2>
        <p className="text-gray-600 mb-8">
          Support projects by backing them with USDC. You&apos;ll receive governance tokens
          proportional to your backing amount.
        </p>

        {/* Backing Form */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Back a Project</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Project ID</label>
              <input
                type="number"
                value={selectedProject || ''}
                onChange={(e) => setSelectedProject(Number(e.target.value))}
                placeholder="Enter project ID"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Amount (USDC)</label>
              <input
                type="number"
                step="0.01"
                value={backingAmount}
                onChange={(e) => setBackingAmount(e.target.value)}
                placeholder="Minimum 10 USDC"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <button
              onClick={() => selectedProject && handleBackProject(selectedProject)}
              disabled={isApproving || isApproveConfirming || isBacking || isBackConfirming || !selectedProject || !backingAmount}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {isApproving || isApproveConfirming
                ? 'Approving...'
                : isBacking || isBackConfirming
                  ? 'Backing...'
                  : isBackSuccess
                    ? 'Backed Successfully!'
                    : 'Back Project'}
            </button>
            
            {isBackSuccess && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">
                  Successfully backed project! You received governance tokens.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* My Backed Projects */}
        {backedProjects && backedProjects.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">My Backed Projects</h3>
            <div className="space-y-4">
              {backedProjects.map((projectId: bigint) => (
                <BackedProjectCard key={projectId.toString()} projectId={Number(projectId)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BackedProjectCard({ projectId }: { projectId: number }) {
  const { data: project } = useContractRead({
    address: process.env.NEXT_PUBLIC_DAONAD_ADDRESS as `0x${string}`,
    abi: DAONAD_ABI,
    functionName: 'getProject',
    args: [BigInt(projectId)],
  });

  if (!project) return null;

  return (
    <div className="border rounded-lg p-4">
      <h4 className="font-semibold text-lg">{project.title}</h4>
      <p className="text-gray-600 text-sm mt-1">{project.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Status: {project.status === 1 ? 'Active' : project.status === 2 ? 'Funded' : 'Pending'}
        </span>
        <span className="text-sm font-medium">
          {formatUnits(project.totalBacked, 6)} / {formatUnits(project.targetAmount, 6)} USDC
        </span>
      </div>
    </div>
  );
}

