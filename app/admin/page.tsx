"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PersonTab } from '@/components/admin/person-tab';
import { ProjectsTab } from '@/components/admin/projects-tab';
import { ExperiencesTab } from '@/components/admin/experiences-tab';
import { MessagesTab } from '@/components/admin/messages-tab';
import { LogOut, Shield, User, Briefcase, Code, Mail } from 'lucide-react';



// Simple JWT decode function as fallback
function decodeJWT(token: string) {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('person');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Verify token client-side
    try {
      const decoded = decodeJWT(token); // Use fallback decode function
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < currentTime) {
        throw new Error('Token expired');
      }

      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

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