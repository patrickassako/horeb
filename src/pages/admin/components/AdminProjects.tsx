import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Loader2, Briefcase, Edit, Plus, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const CATEGORIES = [
    "BTP & Construction",
    "Génie Civil",
    "Hydraulique & Forages",
    "Commerce Général & Négoce",
    "Prestations de Services",
    "Autre"
];

const AdminProjects = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        image_url: "",
        service_category: "BTP & Construction",
        client_name: "",
        is_featured: false,
    });

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de charger les projets: " + error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === "title" && !editingProject) {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
            }));
        }
    };

    const handleSwitchChange = (checked: boolean) => {
        setFormData(prev => ({ ...prev, is_featured: checked }));
    };

    const openEditDialog = (project: any) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            slug: project.slug,
            description: project.description || "",
            image_url: project.image_url || "",
            service_category: project.service_category || "BTP & Construction",
            client_name: project.client_name || "",
            is_featured: project.is_featured,
        });
        setIsDialogOpen(true);
    };

    const openCreateDialog = () => {
        setEditingProject(null);
        setFormData({
            title: "",
            slug: "",
            description: "",
            image_url: "",
            service_category: "BTP & Construction",
            client_name: "",
            is_featured: false,
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingProject) {
                const { error } = await supabase.from("projects").update(formData).eq("id", editingProject.id);
                if (error) throw error;
                toast({ title: "Projet mis à jour" });
            } else {
                const { error } = await supabase.from("projects").insert([formData]);
                if (error) throw error;
                toast({ title: "Projet créé" });
            }
            setIsDialogOpen(false);
            fetchProjects();
        } catch (error: any) {
            toast({ variant: "destructive", title: "Erreur", description: error.message });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const { error } = await supabase.from("projects").delete().eq("id", id);
            if (error) throw error;
            setProjects(projects.filter((p) => p.id !== id));
            toast({ title: "Projet supprimé" });
        } catch (error: any) {
            toast({ variant: "destructive", title: "Erreur", description: error.message });
        }
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-navy" /></div>;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Nos Réalisations ({projects.length})
                </CardTitle>
                <Button onClick={openCreateDialog} className="bg-navy hover:bg-navy/90 text-white gap-2">
                    <Plus className="h-4 w-4" /> Nouveau Projet
                </Button>
            </CardHeader>
            <CardContent>
                {projects.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-lg">
                        Aucun projet. Ajoutez votre première réalisation !
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Projet</TableHead>
                                    <TableHead>Catégorie</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead className="text-center">À la une</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {projects.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                {project.image_url && (
                                                    <img src={project.image_url} alt="" className="w-10 h-10 rounded object-cover" />
                                                )}
                                                <div>
                                                    <div>{project.title}</div>
                                                    <div className="text-xs text-muted-foreground truncate max-w-[150px]">{project.slug}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell><Badge variant="outline">{project.service_category}</Badge></TableCell>
                                        <TableCell>{project.client_name || "-"}</TableCell>
                                        <TableCell className="text-center">
                                            {project.is_featured && <Star className="h-4 w-4 text-yellow-500 mx-auto fill-yellow-500" />}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="icon" onClick={() => openEditDialog(project)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Supprimer le projet ?</AlertDialogTitle>
                                                            <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(project.id)} className="bg-red-600">
                                                                Supprimer
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingProject ? "Modifier le projet" : "Nouveau projet"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Titre du projet</Label>
                                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug (URL)</Label>
                                <Input id="slug" name="slug" value={formData.slug} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="service_category">Catégorie</Label>
                                <Select
                                    value={formData.service_category}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, service_category: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner une catégorie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map((cat) => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="client_name">Client (Optionnel)</Label>
                                <Input id="client_name" name="client_name" value={formData.client_name} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image_url">Image URL</Label>
                            <Input id="image_url" name="image_url" value={formData.image_url} onChange={handleInputChange} placeholder="https://..." />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description (Détails du projet)</Label>
                            <ReactQuill
                                theme="snow"
                                value={formData.description}
                                onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                                className="h-64 mb-12"
                                modules={{
                                    toolbar: [
                                        [{ 'header': [1, 2, 3, false] }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                        ['link', 'clean']
                                    ],
                                }}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch id="is_featured" checked={formData.is_featured} onCheckedChange={handleSwitchChange} />
                            <Label htmlFor="is_featured">Mettre à la une (Accueil)</Label>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
                            <Button type="submit" className="bg-navy">{editingProject ? "Mettre à jour" : "Créer"}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default AdminProjects;
