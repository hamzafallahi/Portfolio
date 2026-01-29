"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Edit, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Person {
  id: number;
  full_name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  image_url: string;
  technology_tags: string[];
  social_links: {
    github: string;
    linkedin: string;
    facebook: string;
    codeforces: string;
  };
}

export function PersonTab() {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Person>>({});
  const [newTag, setNewTag] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchPerson();
  }, []);

  const fetchPerson = async () => {
    try {
      const res = await fetch('/api/person');
      if (res.ok) {
        const data = await res.json();
        setPerson(data);
        setFormData(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch person data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/person', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Person updated successfully",
        });
        setEditing(false);
        fetchPerson();
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update person",
        variant: "destructive",
      });
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.technology_tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        technology_tags: [...(prev.technology_tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      technology_tags: prev.technology_tags?.filter(t => t !== tag) || []
    }));
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!person) {
    return <div className="text-center py-8">No person data found</div>;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Person Information</h2>
        <Button
          onClick={() => setEditing(!editing)}
          variant={editing ? "outline" : "default"}
        >
          {editing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
          {editing ? 'Cancel' : 'Edit'}
        </Button>
      </div>

      {editing ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={formData.email || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              value={formData.image_url || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
            />
          </div>

          <div>
            <Label>Social Links</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Input
                placeholder="GitHub URL"
                value={formData.social_links?.github || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  social_links: { ...prev.social_links!, github: e.target.value }
                }))}
              />
              <Input
                placeholder="LinkedIn URL"
                value={formData.social_links?.linkedin || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  social_links: { ...prev.social_links!, linkedin: e.target.value }
                }))}
              />
              <Input
                placeholder="Facebook URL"
                value={formData.social_links?.facebook || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  social_links: { ...prev.social_links!, facebook: e.target.value }
                }))}
              />
              <Input
                placeholder="Codeforces URL"
                value={formData.social_links?.codeforces || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  social_links: { ...prev.social_links!, codeforces: e.target.value }
                }))}
              />
            </div>
          </div>

          <div>
            <Label>Technology Tags</Label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Add tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <Button onClick={addTag} type="button">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.technology_tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                  {tag} <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Basic Information</h3>
              <p><strong>Name:</strong> {person.full_name}</p>
              <p><strong>Title:</strong> {person.title}</p>
              <p><strong>Email:</strong> {person.email}</p>
              <p><strong>Phone:</strong> {person.phone}</p>
              <p><strong>Location:</strong> {person.location}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Social Links</h3>
              <p><strong>GitHub:</strong> {person.social_links.github}</p>
              <p><strong>LinkedIn:</strong> {person.social_links.linkedin}</p>
              <p><strong>Facebook:</strong> {person.social_links.facebook}</p>
              <p><strong>Codeforces:</strong> {person.social_links.codeforces}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Bio</h3>
            <p>{person.bio}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Technology Tags</h3>
            <div className="flex flex-wrap gap-2">
              {person.technology_tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}