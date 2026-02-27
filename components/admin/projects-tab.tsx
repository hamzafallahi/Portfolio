"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, X, GripVertical, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from '@hello-pangea/dnd';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  github: string;
  demo: string;
  linkedinPost: string;
  tags: string[];
  featured: boolean;
  sortOrder: number;
}

export function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({ tags: [] });
  const [newTag, setNewTag] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ tags: [] });
    setNewTag('');
    setEditingProject(null);
  };

  const openDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({ ...project });
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      const method = editingProject ? 'PATCH' : 'POST';
      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: `Project ${editingProject ? 'updated' : 'created'} successfully`,
        });
        setDialogOpen(false);
        resetForm();
        fetchProjects();
      } else {
        throw new Error('Failed to save');
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Project deleted successfully",
        });
        fetchProjects();
      } else {
        throw new Error('Failed to delete');
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }));
  };

  // Derived lists
  const featuredProjects = projects
    .filter(p => p.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const regularProjects = projects
    .filter(p => !p.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const saveOrder = useCallback(async (featured: Project[], regular: Project[]) => {
    try {
      const res = await fetch('/api/projects/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          featuredIds: featured.map(p => p.id),
          regularIds: regular.map(p => p.id),
        }),
      });

      if (!res.ok) throw new Error('Failed to save order');
    } catch {
      toast({
        title: "Error",
        description: "Failed to save order. Refreshing...",
        variant: "destructive",
      });
      fetchProjects();
    }
  }, [toast]);

  const onDragEnd = useCallback((result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceDroppable = source.droppableId as 'featured' | 'regular';
    const destDroppable = destination.droppableId as 'featured' | 'regular';

    // Build mutable copies
    const featured = [...featuredProjects];
    const regular = [...regularProjects];

    const sourceList = sourceDroppable === 'featured' ? featured : regular;
    const destList = destDroppable === 'featured' ? featured : regular;

    // Remove from source
    const [moved] = sourceList.splice(source.index, 1);

    // Update featured flag if moving between sections
    if (sourceDroppable !== destDroppable) {
      moved.featured = destDroppable === 'featured';
    }

    // Insert into destination
    destList.splice(destination.index, 0, moved);

    // Re-index sortOrder
    const updatedFeatured = featured.map((p, i) => ({ ...p, sortOrder: i, featured: true }));
    const updatedRegular = regular.map((p, i) => ({ ...p, sortOrder: i, featured: false }));

    setProjects([...updatedFeatured, ...updatedRegular]);
    saveOrder(updatedFeatured, updatedRegular);
  }, [featuredProjects, regularProjects, saveOrder]);

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  const renderProjectItem = (project: Project, index: number) => (
    <Draggable
      key={project.id}
      draggableId={String(project.id)}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
            snapshot.isDragging
              ? 'bg-primary/10 border-primary shadow-lg'
              : 'bg-card hover:bg-muted/50 border-border'
          }`}
        >
          <div
            {...provided.dragHandleProps}
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
          >
            <GripVertical className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium truncate">{project.title}</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{project.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openDialog(project)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(project.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </Draggable>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects Management</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input
                    id="github"
                    value={formData.github || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="demo">Demo URL</Label>
                  <Input
                    id="demo"
                    value={formData.demo || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, demo: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="linkedinPost">LinkedIn Post URL</Label>
                  <Input
                    id="linkedinPost"
                    value={formData.linkedinPost || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, linkedinPost: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>

              <div>
                <Label>Tags</Label>
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
                  {formData.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1">
                  {editingProject ? 'Update' : 'Create'} Project
                </Button>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <p className="text-sm text-muted-foreground">
        Drag and drop to reorder projects within a section, or drag between sections to change featured status.
      </p>

      <DragDropContext onDragEnd={onDragEnd}>
        {/* Featured Projects Section */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <h3 className="text-lg font-semibold">Featured Projects</h3>
            <Badge variant="secondary" className="ml-auto">{featuredProjects.length}</Badge>
          </div>

          <Droppable droppableId="featured">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-2 min-h-[60px] rounded-md p-2 transition-colors ${
                  snapshot.isDraggingOver ? 'bg-yellow-500/5 border border-dashed border-yellow-500/30' : ''
                }`}
              >
                {featuredProjects.map((project, index) => renderProjectItem(project, index))}
                {provided.placeholder}
                {featuredProjects.length === 0 && !snapshot.isDraggingOver && (
                  <div className="text-center py-4 text-sm text-muted-foreground">
                    No featured projects. Drag a project here to feature it.
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </Card>

        {/* Regular Projects Section */}
        <Card className="p-4 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-lg font-semibold">Other Projects</h3>
            <Badge variant="secondary" className="ml-auto">{regularProjects.length}</Badge>
          </div>

          <Droppable droppableId="regular">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-2 min-h-[60px] rounded-md p-2 transition-colors ${
                  snapshot.isDraggingOver ? 'bg-primary/5 border border-dashed border-primary/30' : ''
                }`}
              >
                {regularProjects.map((project, index) => renderProjectItem(project, index))}
                {provided.placeholder}
                {regularProjects.length === 0 && !snapshot.isDraggingOver && (
                  <div className="text-center py-4 text-sm text-muted-foreground">
                    No other projects. Drag a project here to un-feature it.
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </Card>
      </DragDropContext>
    </div>
  );
}
