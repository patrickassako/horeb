import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { categories } from "@/data/blogData";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image_url: string;
    category: string;
    author: string;
    published_at: string;
    read_time: string; // Ensure this field exists or compute it
}

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState("Tous");
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("posts")
                    .select("*")
                    .eq("is_published", true)
                    .order("published_at", { ascending: false });

                if (error) throw error;
                setPosts(data || []);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const filteredPosts =
        activeCategory === "Tous"
            ? posts
            : posts.filter((post) => post.category === activeCategory);

    const featuredPost = filteredPosts[0];
    const otherPosts = filteredPosts.slice(1);

    // Helper to adapt Supabase data to BlogCard props if needed
    const adaptPost = (p: any) => ({
        ...p,
        image: p.image_url,
        date: p.published_at,
        readTime: "5 min", // Default or needs to be added to DB
    });

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Blog & Actualités - Horeb Group Sarl</title>
                <meta
                    name="description"
                    content="Découvrez nos actualités, conseils et réalisations dans le domaine du BTP et des services généraux au Cameroun."
                />
            </Helmet>
            <Navbar />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative py-20 bg-navy overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold text-white mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Blog & Actualités
                        </motion.h1>
                        <motion.p
                            className="text-xl text-gray-300 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Conseils, réalisations et actualités du secteur BTP au Cameroun.
                        </motion.p>
                    </div>
                </section>

                {/* Category Filter */}
                <section className="py-8 bg-muted/30 sticky top-20 z-40 backdrop-blur-sm">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-5 py-2 rounded-full font-medium transition-all ${activeCategory === category
                                            ? "bg-navy text-white"
                                            : "bg-white text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {loading ? (
                    <div className="container mx-auto px-4 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-4">
                                    <Skeleton className="h-48 w-full rounded-xl" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Featured Post */}
                        {featuredPost && (
                            <section className="py-12">
                                <div className="container mx-auto px-4">
                                    <BlogCard post={adaptPost(featuredPost)} featured />
                                </div>
                            </section>
                        )}

                        {/* Other Posts */}
                        {otherPosts.length > 0 && (
                            <section className="py-12 bg-muted/20">
                                <div className="container mx-auto px-4">
                                    <h2 className="text-3xl font-bold text-navy mb-8">
                                        Autres articles
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {otherPosts.map((post, index) => (
                                            <BlogCard key={post.id} post={adaptPost(post)} index={index} />
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Empty State */}
                        {filteredPosts.length === 0 && (
                            <section className="py-20">
                                <div className="container mx-auto px-4 text-center">
                                    <p className="text-gray-500 text-lg">
                                        Aucun article trouvé dans cette catégorie.
                                    </p>
                                </div>
                            </section>
                        )}
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Blog;
