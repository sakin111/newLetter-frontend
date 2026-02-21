import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Calendar,
    ExternalLink,
    Globe,
    Languages,
    Tag,
    User,
} from "lucide-react";
import dayjs from "dayjs";
import { newsService } from "@/services/newsService";
import type { IArticle } from "@/Types/news";

export default function ArticlePage() {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<IArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError(null);
        newsService
            .fetchArticleById(id)
            .then(setArticle)
            .catch(() => setError("Failed to load article."))
            .finally(() => setLoading(false));
    }, [id]);

    /* ─── Loading ─────────────────────────── */
    if (loading) {
        return (
            <div className="min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="animate-pulse space-y-6">
                        <div className="h-5 w-32 bg-muted rounded" />
                        <div className="h-10 w-3/4 bg-muted rounded" />
                        <div className="flex gap-4">
                            <div className="h-4 w-24 bg-muted rounded" />
                            <div className="h-4 w-20 bg-muted rounded" />
                            <div className="h-4 w-28 bg-muted rounded" />
                        </div>
                        <div className="h-72 bg-muted rounded-xl" />
                        <div className="space-y-3">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-4 bg-muted rounded"
                                    style={{ width: `${85 + Math.random() * 15}%` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* ─── Error ───────────────────────────── */
    if (error || !article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
                        <ExternalLink className="w-8 h-8 text-destructive" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                        Article not found
                    </h2>
                    <p className="text-muted-foreground mb-6">
                        {error ?? "The article you're looking for doesn't exist."}
                    </p>
                    <Link
                        to="/news"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg 
                       bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Feed
                    </Link>
                </div>
            </div>
        );
    }

    const formattedDate = article.pubDate
        ? dayjs(article.pubDate).format("MMMM DD, YYYY · h:mm A")
        : "Unknown date";

    const authors = article.creator?.join(", ") ?? "Unknown Author";

    return (
        <div className="min-h-screen">
            {/* Gradient background */}
            <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <article className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Link
                        to="/news"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary 
                       font-medium transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back to Feed
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="mb-8"
                >
                    {/* Categories */}
                    {article.category && article.category.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {article.category.map((cat) => (
                                <span
                                    key={cat}
                                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold uppercase tracking-wider
                             rounded-full bg-primary/10 text-primary"
                                >
                                    <Tag className="w-3 h-3" />
                                    {cat}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-tight tracking-tight text-foreground mb-6">
                        {article.title}
                    </h1>

                    {/* Meta bar */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <User className="w-4 h-4" />
                            <span className="font-medium text-foreground">{authors}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={article.pubDate}>{formattedDate}</time>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <Globe className="w-4 h-4" />
                            <span className="font-medium text-primary">
                                {article.source_name}
                            </span>
                        </div>

                        {article.language && (
                            <div className="flex items-center gap-1.5">
                                <Languages className="w-4 h-4" />
                                <span className="uppercase font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                                    {article.language}
                                </span>
                            </div>
                        )}

                        {article.country && article.country.length > 0 && (
                            <span className="uppercase font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                                {article.country.join(", ")}
                            </span>
                        )}

                        {article.content_type && (
                            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border border-border bg-muted text-muted-foreground">
                                {article.content_type}
                            </span>
                        )}
                    </div>
                </motion.header>

                {/* Hero Image */}
                {article.image_url && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="mb-10"
                    >
                        <div className="relative rounded-xl overflow-hidden shadow-lg border border-border">
                            <img
                                src={article.image_url}
                                alt={article.title}
                                className="w-full h-auto max-h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl" />
                        </div>
                    </motion.div>
                )}

                {/* Description */}
                {article.description && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="mb-8"
                    >
                        <p className="text-lg sm:text-xl leading-relaxed text-foreground/90 font-medium border-l-4 border-primary pl-5 py-1">
                            {article.description}
                        </p>
                    </motion.div>
                )}

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="prose prose-lg max-w-none dark:prose-invert
                     prose-headings:text-foreground prose-p:text-foreground/85 prose-p:leading-[1.8]
                     prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-foreground prose-blockquote:border-primary/40"
                >
                    {article.content ? (
                        article.content.split("\n").map((paragraph, idx) =>
                            paragraph.trim() ? (
                                <p key={idx}>{paragraph}</p>
                            ) : (
                                <br key={idx} />
                            )
                        )
                    ) : (
                        <p className="text-muted-foreground italic">
                            Full content is not available. Visit the original source for the
                            complete article.
                        </p>
                    )}
                </motion.div>

                {/* Source link */}
                {article.source_url && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                        className="mt-12 pt-8 border-t border-border"
                    >
                        <a
                            href={article.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg
                         border border-border bg-card text-card-foreground 
                         hover:bg-primary hover:text-primary-foreground hover:border-primary
                         transition-all duration-200 shadow-sm group"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Read on {article.source_name}
                            <ArrowLeft className="w-3 h-3 rotate-180 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        </a>
                    </motion.div>
                )}
            </article>
        </div>
    );
}
