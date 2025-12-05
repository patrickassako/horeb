import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/data/blogData";

interface BlogCardProps {
    post: BlogPost;
    index?: number;
    featured?: boolean;
}

const BlogCard = ({ post, index = 0, featured = false }: BlogCardProps) => {
    const formattedDate = new Date(post.date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    if (featured) {
        return (
            <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative group"
            >
                <Link to={`/blog/${post.slug}`}>
                    <div className="relative h-[500px] rounded-3xl overflow-hidden">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                            <span className="inline-block px-4 py-1 bg-secondary text-navy text-sm font-semibold rounded-full mb-4">
                                {post.category}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-secondary transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-white/80 text-lg mb-6 max-w-2xl">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center gap-6 text-white/70">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {formattedDate}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime}
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.article>
        );
    }

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
        >
            <Link to={`/blog/${post.slug}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-56 overflow-hidden">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <span className="absolute top-4 left-4 px-3 py-1 bg-secondary text-navy text-xs font-semibold rounded-full">
                            {post.category}
                        </span>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formattedDate}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                            {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                        <span className="inline-flex items-center gap-2 text-navy font-semibold group-hover:text-secondary transition-colors">
                            Lire la suite
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

export default BlogCard;
