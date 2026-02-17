"use client";

import { useState, useEffect } from 'react';
import { Plus, Save, Eye, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import type { CatalogEdition, CatalogPage, CatalogProduct } from '@/types/catalog';
import { getEditions, saveEdition, getPages, savePages, getProducts } from '@/lib/catalog/data';
import Button from '@/components/ui/Button';

interface CatalogAdminProps {
  token: string;
}

export default function CatalogAdmin({ token }: CatalogAdminProps) {
  const [editions, setEditions] = useState<CatalogEdition[]>([]);
  const [selectedEdition, setSelectedEdition] = useState<CatalogEdition | null>(null);
  const [pages, setPages] = useState<CatalogPage[]>([]);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [editionsRes, productsRes] = await Promise.all([
        fetch(`/api/admin/catalog/editions?t=${token}`),
        fetch(`/api/admin/catalog/products?t=${token}`),
      ]);
      const editionsData = await editionsRes.json();
      const productsData = await productsRes.json();
      setEditions(editionsData);
      setProducts(productsData);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadPages = async (editionId: string) => {
    try {
      const res = await fetch(`/api/admin/catalog/pages/${editionId}?t=${token}`);
      const data = await res.json();
      setPages(data);
    } catch (err) {
      console.error('Failed to load pages:', err);
    }
  };

  useEffect(() => {
    if (selectedEdition) {
      loadPages(selectedEdition.id);
    }
  }, [selectedEdition, token]);

  const createEdition = () => {
    const newEdition: CatalogEdition = {
      id: `edition-${Date.now()}`,
      title: 'Nouvelle édition',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setEditions([...editions, newEdition]);
    setSelectedEdition(newEdition);
  };

  const saveEditionData = async () => {
    if (!selectedEdition) return;
    try {
      await fetch(`/api/admin/catalog/editions/${selectedEdition.id}?t=${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedEdition),
      });
      await loadData();
    } catch (err) {
      console.error('Failed to save edition:', err);
    }
  };

  const publishEdition = async () => {
    if (!selectedEdition) return;
    const published = { ...selectedEdition, status: 'published' as const, publishedAt: new Date().toISOString() };
    try {
      await fetch(`/api/admin/catalog/editions/${selectedEdition.id}?t=${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(published),
      });
      setSelectedEdition(published);
      await loadData();
    } catch (err) {
      console.error('Failed to publish:', err);
    }
  };

  const addPage = () => {
    if (!selectedEdition) return;
    const newPage: CatalogPage = {
      id: `page-${Date.now()}`,
      editionId: selectedEdition.id,
      index: pages.length + 1,
      templateType: 'GRID_4',
      slots: [],
    };
    setPages([...pages, newPage]);
  };

  const savePagesData = async () => {
    if (!selectedEdition) return;
    try {
      await fetch(`/api/admin/catalog/pages/${selectedEdition.id}?t=${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pages),
      });
    } catch (err) {
      console.error('Failed to save pages:', err);
    }
  };

  const previewEdition = () => {
    if (!selectedEdition) return;
    window.open(`/catalog-secret/edition/${selectedEdition.id}?t=${token}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-primary">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Administration Catalogue</h1>
          <p className="text-muted-foreground">Gérez vos éditions et pages de catalogue</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Editions List */}
          <div className="lg:col-span-1 bg-white rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-primary">Éditions</h2>
              <button
                onClick={createEdition}
                className="p-2 bg-accent text-primary rounded-lg hover:bg-accent/90 transition-colors"
                aria-label="Nouvelle édition"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {editions.map((edition) => (
                <button
                  key={edition.id}
                  onClick={() => setSelectedEdition(edition)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedEdition?.id === edition.id
                      ? 'border-accent bg-accent/10'
                      : 'border-border hover:bg-neutral/50'
                  }`}
                >
                  <div className="font-semibold text-primary">{edition.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {edition.status} • {pages.length} pages
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Edition Editor */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-border p-6">
            {selectedEdition ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Titre de l'édition
                  </label>
                  <input
                    type="text"
                    value={selectedEdition.title}
                    onChange={(e) =>
                      setSelectedEdition({ ...selectedEdition, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="flex gap-3">
                  <Button onClick={saveEditionData} className="bg-primary text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Enregistrer
                  </Button>
                  <Button
                    onClick={publishEdition}
                    className="bg-accent text-primary"
                    disabled={selectedEdition.status === 'published'}
                  >
                    Publier
                  </Button>
                  <Button onClick={previewEdition} variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Prévisualiser
                  </Button>
                </div>

                {/* Pages */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-primary">Pages</h3>
                    <button
                      onClick={addPage}
                      className="p-2 bg-accent text-primary rounded-lg hover:bg-accent/90 transition-colors"
                      aria-label="Ajouter une page"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {pages.map((page, index) => (
                      <div
                        key={page.id}
                        className="p-4 border border-border rounded-lg flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-primary">
                            Page {page.index} - {page.templateType}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {page.slots.length} produits
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <select
                            value={page.templateType}
                            onChange={(e) => {
                              const updated = [...pages];
                              updated[index].templateType = e.target.value as any;
                              setPages(updated);
                            }}
                            className="px-3 py-1 text-sm border border-border rounded"
                          >
                            <option value="HERO">HERO</option>
                            <option value="SPLIT_2">SPLIT_2</option>
                            <option value="GRID_4">GRID_4</option>
                            <option value="GRID_8">GRID_8</option>
                            <option value="STORY">STORY</option>
                            <option value="CATEGORY">CATEGORY</option>
                          </select>
                          <button
                            onClick={() => {
                              const updated = [...pages];
                              updated[index].index = Math.max(1, updated[index].index - 1);
                              setPages(updated.sort((a, b) => a.index - b.index));
                            }}
                            className="p-1 hover:bg-neutral/50 rounded"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              const updated = [...pages];
                              updated[index].index += 1;
                              setPages(updated.sort((a, b) => a.index - b.index));
                            }}
                            className="p-1 hover:bg-neutral/50 rounded"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {pages.length > 0 && (
                    <Button onClick={savePagesData} className="mt-4 bg-primary text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer les pages
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Sélectionnez une édition ou créez-en une nouvelle
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
