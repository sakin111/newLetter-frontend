import { motion } from "framer-motion";
import { Calendar, User, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import type { IArticle } from "@/Types/news";
import dayjs from "dayjs";

interface ArticleCardProps {
    article: IArticle;
}

export default function ArticleCard({ article }: ArticleCardProps) {
    const formattedDate = article.pubDate
        ? dayjs(article.pubDate).format("MMM DD, YYYY")
        : "Unknown date";

    const authors = article.creator?.join(", ") ?? "Unknown Author";
    const snippet =
        article.description?.slice(0, 160) ??
        article.content?.slice(0, 160) ??
        "No description available.";

    return (
        <Link to={`/news/${article.article_id}`} className="block group">
            <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm 
                   hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full flex flex-col"
            >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    {article.image_url ? (
                        <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-accent flex items-center justify-center">
                            <ExternalLink className="w-10 h-10 text-primary/40" />
                        </div>
                    )}

                    {/* Category badges */}
                    {article.category && article.category.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            {article.category.slice(0, 2).map((cat) => (
                                <span
                                    key={cat}
                                    className="px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-full 
                             bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-sm"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Content type badge */}
                    {article.content_type && (
                        <span
                            className="absolute top-3 right-3 px-2.5 py-0.5 text-[11px] font-medium rounded-full
                         bg-card/80 text-card-foreground backdrop-blur-sm border border-border/50"
                        >
                            {article.content_type}
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                    {/* Source */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                            {article.source_name}
                        </span>
                        {article.language && (
                            <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono uppercase">
                                {article.language}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold leading-snug text-card-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-2">
                        {article.title}
                    </h3>

                    {/* Snippet */}
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
                        {snippet}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/60">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <User className="w-3.5 h-3.5" />
                            <span className="truncate max-w-[120px]">{authors}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            <time dateTime={article.pubDate}>{formattedDate}</time>
                        </div>
                    </div>
                </div>

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.article>
        </Link>
    );
}
