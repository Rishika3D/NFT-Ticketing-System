import { ArrowLeft, LogOut, User, Wallet, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { useWeb3Modal, useWeb3ModalAccount, useDisconnect } from '@web3modal/ethers/react';
import { useState } from 'react';
import React from 'react';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      localStorage.clear(); // Clear all auth data
      onBack(); // Go back to home
      window.location.href = '/'; // Force redirect to home
    } catch (error) {
      console.error("Disconnect error:", error);
    }
  };

  const handleSwitchWallet = () => {
    open(); // Opens Web3Modal to switch accounts
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>

        {isConnected && address ? (
          <div className="space-y-6">
            {/* Account Info Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <User className="w-4 h-4" />
                <span>Account Details</span>
              </div>

              {/* Wallet Address */}
              <div className="mb-4">
                <label className="text-xs text-gray-500 mb-2 block">Wallet Address</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 font-mono text-sm text-gray-900">
                    {address.slice(0, 10)}...{address.slice(-8)}
                  </div>
                  <button
                    onClick={handleCopyAddress}
                    className="p-3 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors"
                    title="Copy address"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Network */}
              <div className="mb-4">
                <label className="text-xs text-gray-500 mb-2 block">Network</label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-900">
                      {chainId === 11155111 ? 'Sepolia Testnet' : `Chain ID: ${chainId}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* View on Etherscan */}
              <a
                href={`https://sepolia.etherscan.io/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                View on Etherscan
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Wallet Actions */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Wallet className="w-4 h-4" />
                <span>Wallet Actions</span>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleSwitchWallet}
                  variant="outline"
                  className="w-full py-6 rounded-xl border-gray-200 hover:bg-gray-50"
                >
                  Switch Wallet / Account
                </Button>

                <Button
                  onClick={handleDisconnect}
                  variant="outline"
                  className="w-full py-6 rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect Wallet
                </Button>
              </div>
            </div>

            {/* Info Section */}
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
              <h3 className="font-semibold text-amber-900 mb-2">About Your Wallet</h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                Your wallet is connected to this app. You can disconnect at any time. 
                Your NFT tickets are stored on the blockchain and will remain yours even after disconnecting.
              </p>
            </div>
          </div>
        ) : (
          // Not Connected State
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No Wallet Connected</h2>
            <p className="text-gray-500 mb-6">Connect your wallet to view settings</p>
            <Button
              onClick={() => window.location.href = '/signin'}
              className="rounded-xl bg-gradient-to-r from-gray-900 to-gray-800"
            >
              Connect Wallet
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}