'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import FounderMode from './components/FounderMode';
import BackerMode from './components/BackerMode';
import ProjectList from './components/ProjectList';

export default function Home() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<'founder' | 'backer' | 'projects'>('projects');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                DAOnad
              </h1>
              <p className="text-gray-600">
                Decentralized crowdfunding powered by Monad&apos;s fast block times
              </p>
            </div>
            <ConnectButton />
          </div>

          {/* Navigation Tabs */}
          {isConnected && (
            <div className="flex space-x-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'projects'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setActiveTab('founder')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'founder'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Founder Mode
              </button>
              <button
                onClick={() => setActiveTab('backer')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'backer'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Backer Mode
              </button>
            </div>
          )}
        </header>

        {/* Main Content */}
        {!isConnected ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-6">
                Connect your wallet to start creating or backing projects on Monad testnet
              </p>
              <ConnectButton />
            </div>
          </div>
        ) : (
          <div className="mt-8">
            {activeTab === 'projects' && <ProjectList />}
            {activeTab === 'founder' && <FounderMode />}
            {activeTab === 'backer' && <BackerMode />}
          </div>
        )}
      </div>
    </main>
  );
}

