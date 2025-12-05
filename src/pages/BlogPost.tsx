import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            if (!slug) return;

            try {
                // Fetch current post
                const { data: currentPost, error } = await supabase
                    .from("posts")
                    .select("*")
                    .eq("slug", slug)
                    .single();

                if (error) throw error;
                setPost(currentPost);

                // Fetch related posts (same category, exclude current)
                if (currentPost) {
                    const { data: related, error: relatedError } = await supabase
                        .from("posts")
                        .select("*")
                        .eq("category", currentPost.category)
                        .neq("id", currentPost.id)
                        .limit(2);

                    if (!relatedError) setRelatedPosts(related || []);
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="pt-20 pb-20">
                    <div className="container mx-auto px-4 py-12">
                        <Skeleton className="h-[50vh] w-full rounded-xl mb-8" />
                        <Skeleton className="h-8 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="pt-32 pb-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold text-navy mb-4">
                            Article non trouvé
                        </h1>
                        <p className="text-gray-600 mb-8">
                            L'article que vous recherchez n'existe pas.
                        </p>
                        <Link to="/blog">
                            <Button>Retour au blog</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const formattedDate = new Date(post.published_at).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    // Helper to adapt Supabase data to BlogCard props
    const adaptPost = (p: any) => ({
        ...p,
        image: p.image_url,
        date: p.published_at,
        readTime: "5 min",
    });

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{post.title} - Blog Horeb Group Sarl</title>
                <meta name="description" content={post.excerpt} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.image_url} />
                <meta property="og:type" content="article" />
            </Helmet>
            <Navbar />

            <main className="pt-20">
                {/* Hero Image */}
                <section className="relative h-[50vh] md:h-[60vh]">
                    <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <div className="container mx-auto">
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Retour au blog
                            </Link>
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-block px-4 py-1 bg-secondary text-navy text-sm font-semibold rounded-full mb-4"
                            >
                                {post.category}
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-4xl"
                            >
                                {post.title}
                            </motion.h1>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-wrap items-center gap-6 text-white/80"
                            >
                                <span className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    {post.author}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {formattedDate}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    5 min
                                </span>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="prose prose-lg prose-navy max-w-none"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>
                    </div>
                </section>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="py-16 bg-muted/20">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-navy mb-8">
                                Articles similaires
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {relatedPosts.map((relatedPost, index) => (
                                    <BlogCard
                                        key={relatedPost.id}
                                        post={adaptPost(relatedPost)}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default BlogPost;
