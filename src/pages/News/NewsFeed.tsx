import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Newspaper, SearchX } from "lucide-react";
import ArticleCard from "@/components/modules/News/ArticleCard";
import ArticleSkeleton from "@/components/modules/News/ArticleSkeleton";
import FilterPanel from "@/components/modules/News/FilterPanel";
import { newsService } from "@/services/newsService";
import type { IArticle, INewsQueryParams } from "@/Types/news";

const ITEMS_PER_PAGE = 12;

export default function NewsFeed() {
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState<INewsQueryParams>({
        page: 1,
        limit: ITEMS_PER_PAGE,
    });

    const loadArticles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await newsService.fetchArticles(filters);
            setArticles(res.data ?? []);
            setTotalPages(res.meta?.totalPages ?? 1);
        } catch (err) {
            console.error("Failed to load articles:", err);
            setError("Failed to load articles. Please try again later.");
            setArticles([]);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        loadArticles();
    }, [loadArticles]);

    const handleFilterChange = (newFilters: INewsQueryParams) => {
        setFilters({ ...newFilters, limit: ITEMS_PER_PAGE });
    };

    const currentPage = filters.page ?? 1;

    return (
        <div className="min-h-screen">
            {/* Hero Header */}
            <section className="relative overflow-hidden py-16 mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/5" />
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                            <Newspaper className="w-4 h-4" />
                            Latest Headlines
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-3">
                            News <span className="gradient-text">Feed</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                            Stay informed with the latest articles from trusted sources worldwide.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="flex gap-8">
                    {/* Filter Sidebar */}
                    <FilterPanel filters={filters} onFilterChange={handleFilterChange} />

                    {/* Articles Grid */}
                    <main className="flex-1 min-w-0">
                        {/* Results count */}
                        {!loading && !error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm text-muted-foreground mb-6"
                            >
                                Showing{" "}
                                <span className="font-semibold text-foreground">
                                    {articles.length}
                                </span>{" "}
                                articles
                                {totalPages > 1 && (
                                    <>
                                        {" · "}Page {currentPage} of {totalPages}
                                    </>
                                )}
                            </motion.p>
                        )}

                        {/* Loading state */}
                        {loading && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <ArticleSkeleton key={i} />
                                ))}
                            </div>
                        )}

                        {/* Error state */}
                        {error && !loading && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                                    <SearchX className="w-8 h-8 text-destructive" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    Something went wrong
                                </h3>
                                <p className="text-sm text-muted-foreground max-w-md mb-6">
                                    {error}
                                </p>
                                <button
                                    onClick={loadArticles}
                                    className="px-5 py-2.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground 
                             hover:bg-primary/90 transition-colors shadow-sm"
                                >
                                    Try Again
                                </button>
                            </motion.div>
                        )}

                        {/* Empty state */}
                        {!loading && !error && articles.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                    <Newspaper className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    No articles found
                                </h3>
                                <p className="text-sm text-muted-foreground max-w-md">
                                    Try adjusting your filters to discover more articles.
                                </p>
                            </motion.div>
                        )}

                        {/* Articles Grid */}
                        {!loading && !error && articles.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                            >
                                {articles.map((article, index) => (
                                    <motion.div
                                        key={article.article_id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                    >
                                        <ArticleCard article={article} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* Pagination */}
                        {!loading && totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-10">
                                <button
                                    onClick={() =>
                                        handleFilterChange({
                                            ...filters,
                                            page: Math.max(1, currentPage - 1),
                                        })
                                    }
                                    disabled={currentPage <= 1}
                                    className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-card text-card-foreground
                             hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>

                                {generatePageNumbers(currentPage, totalPages).map((page, i) =>
                                    page === "..." ? (
                                        <span
                                            key={`dots-${i}`}
                                            className="px-2 text-muted-foreground"
                                        >
                                            …
                                        </span>
                                    ) : (
                                        <button
                                            key={page}
                                            onClick={() =>
                                                handleFilterChange({
                                                    ...filters,
                                                    page: page as number,
                                                })
                                            }
                                            className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors
                        ${page === currentPage
                                                    ? "bg-primary text-primary-foreground shadow-sm"
                                                    : "border border-border bg-card text-card-foreground hover:bg-muted"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}

                                <button
                                    onClick={() =>
                                        handleFilterChange({
                                            ...filters,
                                            page: Math.min(totalPages, currentPage + 1),
                                        })
                                    }
                                    disabled={currentPage >= totalPages}
                                    className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-card text-card-foreground
                             hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

/* ─── Pagination Helpers ────────────────────────────── */
function generatePageNumbers(
    current: number,
    total: number
): (number | string)[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: (number | string)[] = [1];
    if (current > 3) pages.push("...");
    for (
        let i = Math.max(2, current - 1);
        i <= Math.min(total - 1, current + 1);
        i++
    ) {
        pages.push(i);
    }
    if (current < total - 2) pages.push("...");
    pages.push(total);
    return pages;
}
