import { useState } from 'react';
import { ArrowLeft, LogOut, Save, User, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useStore } from '../lib/store';
import React from 'react';

export function Settings({ onBack, onLogout }: { onBack: () => void, onLogout: () => void }) {
  const { user, updateProfile } = useStore();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    updateProfile(name, email);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} size="icon" className="rounded-full hover:bg-gray-200">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <User className="w-5 h-5 text-amber-600" /> Profile Details
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Display Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email Address</label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
              </div>
            </div>
          </div>
          
          <Button onClick={handleSave} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 rounded-xl">
            <Save className="w-4 h-4 mr-2" /> Save Changes
          </Button>

          <div className="pt-6 mt-6 border-t border-gray-100">
            <Button onClick={onLogout} variant="outline" className="w-full text-red-600 border-red-100 hover:bg-red-50 py-6 rounded-xl">
              <LogOut className="w-4 h-4 mr-2" /> Disconnect Wallet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}