import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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
import { Trash2, Loader2, FileText, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

const AdminQuotes = () => {
    const [quotes, setQuotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchQuotes = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("quote_requests")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setQuotes(data || []);
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de charger les devis: " + error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from("quote_requests")
                .update({ status: newStatus })
                .eq("id", id);

            if (error) throw error;

            setQuotes(quotes.map((q) => (q.id === id ? { ...q, status: newStatus } : q)));
            toast({
                title: "Statut mis à jour",
                description: `Le devis est maintenant marqué comme ${getStatusSource(newStatus).label}.`,
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Erreur lors de la mise à jour: " + error.message,
            });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const { error } = await supabase.from("quote_requests").delete().eq("id", id);
            if (error) throw error;

            setQuotes(quotes.filter((q) => q.id !== id));
            toast({
                title: "Devis supprimé",
                description: "La demande de devis a été supprimée.",
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de supprimer: " + error.message,
            });
        }
    };

    const getStatusSource = (status: string) => {
        switch (status) {
            case "completed":
                return { label: "Traité", color: "bg-green-100 text-green-800", value: "completed" };
            case "processing":
                return { label: "En cours", color: "bg-blue-100 text-blue-800", value: "processing" };
            default:
                return { label: "En attente", color: "bg-yellow-100 text-yellow-800", value: "pending" };
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-navy" />
            </div>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Demandes de Devis ({quotes.length})
                </CardTitle>
            </CardHeader>
            <CardContent>
                {quotes.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-lg">
                        Aucune demande de devis reçue.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Service / Projet</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead className="w-[30%]">Détails</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {quotes.map((quote) => {
                                    const status = getStatusSource(quote.status || "pending");
                                    return (
                                        <TableRow key={quote.id}>
                                            <TableCell className="whitespace-nowrap">
                                                {new Date(quote.created_at).toLocaleDateString("fr-FR")}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{quote.name}</div>
                                                {quote.company && <div className="text-xs text-muted-foreground">{quote.company}</div>}
                                                <div className="text-xs mt-1">
                                                    <a href={`mailto:${quote.email}`} className="text-blue-600 hover:underline block">{quote.email}</a>
                                                    <a href={`tel:${quote.phone}`} className="text-gray-500 hover:text-gray-700 block">{quote.phone}</a>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="mb-1">{quote.service_category}</Badge>
                                                {quote.budget_range && <div className="text-xs text-muted-foreground mt-1">Budget: {quote.budget_range}</div>}
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    defaultValue={status.value}
                                                    onValueChange={(val) => handleStatusChange(quote.id, val)}
                                                >
                                                    <SelectTrigger className={`w-[130px] h-8 text-xs ${status.color} border-0`}>
                                                        <SelectValue>{status.label}</SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="pending">En attente</SelectItem>
                                                        <SelectItem value="processing">En cours</SelectItem>
                                                        <SelectItem value="completed">Traité</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                <div className="max-h-24 overflow-y-auto whitespace-pre-wrap">
                                                    {quote.project_details}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Supprimer la demande ?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Êtes-vous sûr de vouloir supprimer cette demande de devis de {quote.name} ?
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleDelete(quote.id)}
                                                                className="bg-red-600 hover:bg-red-700"
                                                            >
                                                                Supprimer
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default AdminQuotes;
