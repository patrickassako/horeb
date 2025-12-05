import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LayoutDashboard, MessageSquare, FileText, FilePlus, LogOut, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminMessages from "./components/AdminMessages";
import AdminQuotes from "./components/AdminQuotes";
import AdminBlog from "./components/AdminBlog";
import AdminProjects from "./components/AdminProjects";

const AdminDashboard = () => {
    const { signOut, user } = useAuth();
    const [activeTab, setActiveTab] = useState("overview");
    const [stats, setStats] = useState({
        messages: 0,
        quotes: 0,
        posts: 0,
        projects: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            // Parallel fetching for dashboard stats
            const [
                { count: msgCount },
                { count: quoteCount },
                { count: postCount },
                { count: projectCount }
            ] = await Promise.all([
                supabase.from("contacts").select("*", { count: 'exact', head: true }),
                supabase.from("quote_requests").select("*", { count: 'exact', head: true }),
                supabase.from("posts").select("*", { count: 'exact', head: true }),
                supabase.from("projects").select("*", { count: 'exact', head: true }),
            ]);

            setStats({
                messages: msgCount || 0,
                quotes: quoteCount || 0,
                posts: postCount || 0,
                projects: projectCount || 0
            });
        };

        if (activeTab === "overview") {
            fetchStats();
        }
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow pt-24 pb-12 px-4 container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-navy">Dashboard Admin</h1>
                        <p className="text-gray-500">Bienvenue, {user?.email}</p>
                    </div>
                    <Button variant="outline" onClick={signOut} className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                        <LogOut className="h-4 w-4" />
                        Déconnexion
                    </Button>
                </div>

                <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:w-[800px] mb-8 h-auto">
                        <TabsTrigger value="overview" className="gap-2 py-3">
                            <LayoutDashboard className="h-4 w-4" />
                            <span className="hidden sm:inline">Vue d'ensemble</span>
                        </TabsTrigger>
                        <TabsTrigger value="messages" className="gap-2 py-3">
                            <MessageSquare className="h-4 w-4" />
                            <span className="hidden sm:inline">Messages</span>
                        </TabsTrigger>
                        <TabsTrigger value="quotes" className="gap-2 py-3">
                            <FileText className="h-4 w-4" />
                            <span className="hidden sm:inline">Devis</span>
                        </TabsTrigger>
                        <TabsTrigger value="blog" className="gap-2 py-3">
                            <FilePlus className="h-4 w-4" />
                            <span className="hidden sm:inline">Blog</span>
                        </TabsTrigger>
                        <TabsTrigger value="projects" className="gap-2 py-3">
                            <Briefcase className="h-4 w-4" />
                            <span className="hidden sm:inline">Réalisations</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab("messages")}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Messages Reçus</CardTitle>
                                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.messages}</div>
                                    <p className="text-xs text-muted-foreground">Total messages</p>
                                </CardContent>
                            </Card>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab("quotes")}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Demandes de Devis</CardTitle>
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.quotes}</div>
                                    <p className="text-xs text-muted-foreground">Total demandes</p>
                                </CardContent>
                            </Card>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab("blog")}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Articles de Blog</CardTitle>
                                    <FilePlus className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.posts}</div>
                                    <p className="text-xs text-muted-foreground">Articles publiés et brouillons</p>
                                </CardContent>
                            </Card>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab("projects")}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Projets Réalisés</CardTitle>
                                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.projects}</div>
                                    <p className="text-xs text-muted-foreground">Projets dans le portfolio</p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="messages">
                        <AdminMessages />
                    </TabsContent>

                    <TabsContent value="quotes">
                        <AdminQuotes />
                    </TabsContent>

                    <TabsContent value="blog">
                        <AdminBlog />
                    </TabsContent>

                    <TabsContent value="projects">
                        <AdminProjects />
                    </TabsContent>
                </Tabs>
            </main>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
