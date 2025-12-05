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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Loader2, FilePlus, Edit, Plus, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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

const AdminBlog = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    // Dialog State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        image_url: "",
        category: "Actualités",
        author: "Équipe Horeb",
        is_published: true,
    });

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .order("published_at", { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de charger les articles: " + error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-generate slug from title if slug is empty or it was auto-generated
        if (name === "title" && !editingPost) {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
            }));
        }
    };

    const handleSwitchChange = (checked: boolean) => {
        setFormData(prev => ({ ...prev, is_published: checked }));
    };

    const openEditDialog = (post: any) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || "",
            content: post.content || "",
            image_url: post.image_url || "",
            category: post.category || "Actualités",
            author: post.author || "Équipe Horeb",
            is_published: post.is_published,
        });
        setIsDialogOpen(true);
    };

    const openCreateDialog = () => {
        setEditingPost(null);
        setFormData({
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            image_url: "",
            category: "Actualités",
            author: "Équipe Horeb",
            is_published: true,
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingPost) {
                // Update
                const { error } = await supabase
                    .from("posts")
                    .update({
                        ...formData,
                        updated_at: new Date().toISOString()
                    })
                    .eq("id", editingPost.id);

                if (error) throw error;
                toast({ title: "Article mis à jour", description: "Modifications enregistrées." });
            } else {
                // Create
                const { error } = await supabase
                    .from("posts")
                    .insert([{
                        ...formData,
                        published_at: formData.is_published ? new Date().toISOString() : null
                    }]);

                if (error) throw error;
                toast({ title: "Article créé", description: "Le nouvel article a été ajouté." });
            }

            setIsDialogOpen(false);
            fetchPosts();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: error.message,
            });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const { error } = await supabase.from("posts").delete().eq("id", id);
            if (error) throw error;

            setPosts(posts.filter((p) => p.id !== id));
            toast({ title: "Article supprimé" });
        } catch (error: any) {
            toast({ variant: "destructive", title: "Erreur", description: error.message });
        }
    };

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-navy" /></div>;
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="flex items-center gap-2">
                    <FilePlus className="h-5 w-5" />
                    Articles de Blog ({posts.length})
                </CardTitle>
                <Button onClick={openCreateDialog} className="bg-navy hover:bg-navy/90 text-white gap-2">
                    <Plus className="h-4 w-4" /> Nouvel Article
                </Button>
            </CardHeader>
            <CardContent>
                {posts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-lg">
                        Aucun article. Créez votre premier article !
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Titre</TableHead>
                                    <TableHead>Catégorie</TableHead>
                                    <TableHead>Auteur</TableHead>
                                    <TableHead>État</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell className="font-medium max-w-xs truncate" title={post.title}>
                                            {post.title}
                                            <div className="text-xs text-muted-foreground truncate">{post.slug}</div>
                                        </TableCell>
                                        <TableCell><Badge variant="outline">{post.category}</Badge></TableCell>
                                        <TableCell>{post.author}</TableCell>
                                        <TableCell>
                                            <Badge className={post.is_published ? "bg-green-500" : "bg-gray-400"}>
                                                {post.is_published ? "Publié" : "Brouillon"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="icon" onClick={() => openEditDialog(post)}>
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
                                                            <AlertDialogTitle>Supprimer l'article ?</AlertDialogTitle>
                                                            <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(post.id)} className="bg-red-600">
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

            {/* Edit/Create Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingPost ? "Modifier l'article" : "Nouvel article"}</DialogTitle>
                        <DialogDescription>
                            Remplissez les informations ci-dessous. Le slug est généré automatiquement.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Titre</Label>
                                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug (URL)</Label>
                                <Input id="slug" name="slug" value={formData.slug} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Catégorie</Label>
                                <Input id="category" name="category" value={formData.category} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="author">Auteur</Label>
                                <Input id="author" name="author" value={formData.author} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image_url">URL de l'image</Label>
                            <Input id="image_url" name="image_url" value={formData.image_url} onChange={handleInputChange} placeholder="https://..." />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="excerpt">Extrait (Court résumé)</Label>
                            <Textarea id="excerpt" name="excerpt" value={formData.excerpt} onChange={handleInputChange} rows={2} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Contenu</Label>
                            <ReactQuill
                                theme="snow"
                                value={formData.content}
                                onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                                className="h-64 mb-12"
                                modules={{
                                    toolbar: [
                                        [{ 'header': [1, 2, 3, false] }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                        ['link', 'image'],
                                        ['clean']
                                    ],
                                }}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch id="is_published" checked={formData.is_published} onCheckedChange={handleSwitchChange} />
                            <Label htmlFor="is_published">{formData.is_published ? "Publié immediatement" : "Brouillon"}</Label>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
                            <Button type="submit" className="bg-navy">{editingPost ? "Mettre à jour" : "Créer"}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default AdminBlog;
