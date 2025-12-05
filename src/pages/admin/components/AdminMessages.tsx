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
import { Trash2, Loader2, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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

const AdminMessages = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("contacts")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setMessages(data || []);
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de charger les messages: " + error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const { error } = await supabase.from("contacts").delete().eq("id", id);
            if (error) throw error;

            setMessages(messages.filter((msg) => msg.id !== id));
            toast({
                title: "Message supprimé",
                description: "Le message a été supprimé avec succès.",
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de supprimer le message: " + error.message,
            });
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
                    <Mail className="h-5 w-5" />
                    Messages Reçus ({messages.length})
                </CardTitle>
            </CardHeader>
            <CardContent>
                {messages.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-lg">
                        Aucun message reçu pour le moment.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Email / Tél</TableHead>
                                    <TableHead>Sujet</TableHead>
                                    <TableHead className="w-[40%]">Message</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {messages.map((msg) => (
                                    <TableRow key={msg.id}>
                                        <TableCell className="whitespace-nowrap">
                                            {new Date(msg.created_at).toLocaleDateString("fr-FR")}
                                            <br />
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(msg.created_at).toLocaleTimeString("fr-FR", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-medium">{msg.name}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col text-sm">
                                                <a href={`mailto:${msg.email}`} className="hover:text-primary">
                                                    {msg.email}
                                                </a>
                                                <a href={`tel:${msg.phone}`} className="text-muted-foreground hover:text-primary">
                                                    {msg.phone}
                                                </a>
                                            </div>
                                        </TableCell>
                                        <TableCell>{msg.subject || "-"}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            <div className="max-h-24 overflow-y-auto whitespace-pre-wrap">
                                                {msg.message}
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
                                                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Êtes-vous sûr de vouloir supprimer ce message de {msg.name} ? Cette action est irréversible.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(msg.id)}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            Supprimer
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default AdminMessages;
