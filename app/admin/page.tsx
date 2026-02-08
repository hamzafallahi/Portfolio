"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PersonTab } from '@/components/admin/person-tab';
import { ProjectsTab } from '@/components/admin/projects-tab';
import { ExperiencesTab } from '@/components/admin/experiences-tab';
import { MessagesTab } from '@/components/admin/messages-tab';
import { LogOut, Shield, User, Briefcase, Code, Mail } from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('person');
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const tabs = [
    { id: 'person', label: 'Person', icon: User },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'experiences', label: 'Experiences', icon: Briefcase },
    { id: 'messages', label: 'Messages', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-background ">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary py-14" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        <div className="mt-6">
          {activeTab === 'person' && <PersonTab />}
          {activeTab === 'projects' && <ProjectsTab />}
          {activeTab === 'experiences' && <ExperiencesTab />}
          {activeTab === 'messages' && <MessagesTab />}
        </div>
      </div>
    </div>
  );
}