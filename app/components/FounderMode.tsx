'use client';

import { useState } from 'react';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseUnits } from 'viem';
import { DAONAD_ABI } from '../config/abis';
import { formatAddress } from '../utils/format';

const QUESTIONS = [
  'What are you trying to do? How many milestones are there in your project?',
  'How is it done today, and what are the limits of current practice?',
  'What is new in your approach and why do you think it will be successful?',
  'Who cares? If you are successful, what difference will it make?',
  'What are the risks?',
  'How much will it cost?',
  'How long will it take?',
  'What are the mid-term and final "exams" to check for success?',
];

export default function FounderMode() {
  const { address } = useAccount();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    deadline: '',
    milestones: [{ description: '', amount: '', deadline: '' }],
    questionAnswers: Array(8).fill(''),
  });

  const { write, data: hash, isLoading: isPending } = useContractWrite({
    address: process.env.NEXT_PUBLIC_DAONAD_ADDRESS as `0x${string}`,
    abi: DAONAD_ABI,
    functionName: 'createProject',
  });
  const { isLoading: isConfirming, isSuccess } = useWaitForTransaction({
    hash,
  });

  const addMilestone = () => {
    setFormData({
      ...formData,
      milestones: [...formData.milestones, { description: '', amount: '', deadline: '' }],
    });
  };

  const updateMilestone = (index: number, field: string, value: string) => {
    const updated = [...formData.milestones];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, milestones: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const milestoneDescriptions = formData.milestones.map((m) => m.description);
    const milestoneAmounts = formData.milestones.map((m) =>
      parseUnits(m.amount, 6).toString()
    );
    const milestoneDeadlines = formData.milestones.map((m) =>
      Math.floor(new Date(m.deadline).getTime() / 1000).toString()
    );
    const deadline = Math.floor(new Date(formData.deadline).getTime() / 1000);

    write({
      args: [
        formData.title,
        formData.description,
        parseUnits(formData.targetAmount, 6),
        BigInt(deadline),
        milestoneDescriptions,
        milestoneAmounts.map((a) => BigInt(a)),
        milestoneDeadlines.map((d) => BigInt(d)),
        formData.questionAnswers,
      ],
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6">Create Your Project</h2>
        <p className="text-gray-600 mb-8">
          Fill out the form below to propose your project. Your proposal will be reviewed
          by AI to ensure it&apos;s not spam or a duplicate before going live.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Basic Information</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Project Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Target Amount (USDC)
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={formData.targetAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, targetAmount: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Funding Deadline</label>
                <input
                  type="datetime-local"
                  required
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 8 Questions */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Project Questions</h3>
            {QUESTIONS.map((question, index) => (
              <div key={index}>
                <label className="block text-sm font-medium mb-2">
                  {index + 1}. {question}
                </label>
                <textarea
                  required
                  value={formData.questionAnswers[index]}
                  onChange={(e) => {
                    const updated = [...formData.questionAnswers];
                    updated[index] = e.target.value;
                    setFormData({ ...formData, questionAnswers: updated });
                  }}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          {/* Milestones */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Milestones</h3>
              <button
                type="button"
                onClick={addMilestone}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add Milestone
              </button>
            </div>
            {formData.milestones.map((milestone, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <h4 className="font-medium">Milestone {index + 1}</h4>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    required
                    value={milestone.description}
                    onChange={(e) =>
                      updateMilestone(index, 'description', e.target.value)
                    }
                    rows={2}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Amount (USDC)
                    </label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      value={milestone.amount}
                      onChange={(e) =>
                        updateMilestone(index, 'amount', e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Deadline</label>
                    <input
                      type="datetime-local"
                      required
                      value={milestone.deadline}
                      onChange={(e) =>
                        updateMilestone(index, 'deadline', e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={isPending || isConfirming}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending || isConfirming
              ? 'Submitting...'
              : isSuccess
                ? 'Project Created!'
                : 'Create Project'}
          </button>

          {isSuccess && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">
                Transaction successful! Hash: {formatAddress(hash || '')}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

