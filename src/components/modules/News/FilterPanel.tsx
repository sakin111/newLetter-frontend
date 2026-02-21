import { useState, useEffect, useCallback } from "react";
import {
    Calendar,
    ChevronDown,
    ChevronUp,
    Filter,
    Search,
    X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { INewsFilters, INewsQueryParams } from "@/Types/news";
import { newsService } from "@/services/newsService";

interface FilterPanelProps {
    filters: INewsQueryParams;
    onFilterChange: (filters: INewsQueryParams) => void;
}

const DEFAULT_LANGUAGES = [
    { code: "en", label: "English" },
    { code: "fr", label: "French" },
    { code: "es", label: "Spanish" },
    { code: "de", label: "German" },
    { code: "ar", label: "Arabic" },
    { code: "zh", label: "Chinese" },
    { code: "hi", label: "Hindi" },
    { code: "pt", label: "Portuguese" },
    { code: "ru", label: "Russian" },
    { code: "ja", label: "Japanese" },
];

const DEFAULT_COUNTRIES = [
    { code: "us", label: "United States" },
    { code: "gb", label: "United Kingdom" },
    { code: "ca", label: "Canada" },
    { code: "au", label: "Australia" },
    { code: "in", label: "India" },
    { code: "de", label: "Germany" },
    { code: "fr", label: "France" },
    { code: "jp", label: "Japan" },
    { code: "br", label: "Brazil" },
    { code: "ae", label: "UAE" },
];

const DEFAULT_CATEGORIES = [
    "Business",
    "Technology",
    "Sports",
    "Entertainment",
    "Health",
    "Science",
    "Politics",
    "World",
    "Environment",
    "Food",
];

const DEFAULT_CONTENT_TYPES = [
    "News",
    "Blog",
    "Press Release",
    "Podcast",
    "Opinion",
];

export default function FilterPanel({
    filters,
    onFilterChange,
}: FilterPanelProps) {
    const [filterOptions, setFilterOptions] = useState<INewsFilters | null>(null);
    const [expandedSections, setExpandedSections] = useState<
        Record<string, boolean>
    >({
        date: true,
        author: true,
        language: true,
        country: true,
        category: true,
        contentType: true,
    });
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        newsService
            .fetchFilterOptions()
            .then(setFilterOptions)
            .catch(() => setFilterOptions(null));
    }, []);

    const languages = filterOptions?.languages?.length
        ? filterOptions.languages
        : DEFAULT_LANGUAGES;
    const countries = filterOptions?.countries?.length
        ? filterOptions.countries
        : DEFAULT_COUNTRIES;
    const categories = filterOptions?.categories?.length
        ? filterOptions.categories
        : DEFAULT_CATEGORIES;
    const contentTypes = filterOptions?.contentTypes?.length
        ? filterOptions.contentTypes
        : DEFAULT_CONTENT_TYPES;

    const toggleSection = (key: string) =>
        setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));

    const updateFilter = useCallback(
        (key: keyof INewsQueryParams, value: string | undefined) => {
            onFilterChange({ ...filters, [key]: value || undefined, page: 1 });
        },
        [filters, onFilterChange]
    );

    const toggleCategory = useCallback(
        (cat: string) => {
            const current = filters.category
                ? filters.category.split(",").filter(Boolean)
                : [];
            const next = current.includes(cat)
                ? current.filter((c) => c !== cat)
                : [...current, cat];
            updateFilter("category", next.join(",") || undefined);
        },
        [filters.category, updateFilter]
    );

    const clearAll = () => {
        onFilterChange({ page: 1, limit: filters.limit });
    };

    const activeCount = [
        filters.startDate,
        filters.endDate,
        filters.author,
        filters.language,
        filters.country,
        filters.category,
        filters.contentType,
    ].filter(Boolean).length;

    const selectedCategories = filters.category
        ? filters.category.split(",").filter(Boolean)
        : [];

    const panelContent = (
        <div className="space-y-1">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-sm text-card-foreground">
                        Filters
                    </h3>
                    {activeCount > 0 && (
                        <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold text-primary-foreground bg-primary rounded-full">
                            {activeCount}
                        </span>
                    )}
                </div>
                {activeCount > 0 && (
                    <button
                        onClick={clearAll}
                        className="text-xs text-destructive hover:text-destructive/80 font-medium transition-colors"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Date Range */}
            <FilterSection
                title="Date Range"
                icon={<Calendar className="w-3.5 h-3.5" />}
                expanded={expandedSections.date}
                onToggle={() => toggleSection("date")}
            >
                <div className="space-y-2">
                    <div>
                        <label className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-1 block">
                            From
                        </label>
                        <input
                            type="date"
                            value={filters.startDate ?? ""}
                            onChange={(e) => updateFilter("startDate", e.target.value)}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground
                         focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-1 block">
                            To
                        </label>
                        <input
                            type="date"
                            value={filters.endDate ?? ""}
                            onChange={(e) => updateFilter("endDate", e.target.value)}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground
                         focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        />
                    </div>
                </div>
            </FilterSection>

            {/* Author */}
            <FilterSection
                title="Author / Creator"
                icon={<Search className="w-3.5 h-3.5" />}
                expanded={expandedSections.author}
                onToggle={() => toggleSection("author")}
            >
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by author..."
                        value={filters.author ?? ""}
                        onChange={(e) => updateFilter("author", e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground
                       placeholder:text-muted-foreground/60
                       focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                    {filters.author && (
                        <button
                            onClick={() => updateFilter("author", undefined)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </FilterSection>

            {/* Language */}
            <FilterSection
                title="Language"
                expanded={expandedSections.language}
                onToggle={() => toggleSection("language")}
            >
                <select
                    value={filters.language ?? ""}
                    onChange={(e) => updateFilter("language", e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground
                     focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all
                     appearance-none cursor-pointer"
                >
                    <option value="">All Languages</option>
                    {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                            {lang.label}
                        </option>
                    ))}
                </select>
            </FilterSection>

            {/* Country */}
            <FilterSection
                title="Country"
                expanded={expandedSections.country}
                onToggle={() => toggleSection("country")}
            >
                <select
                    value={filters.country ?? ""}
                    onChange={(e) => updateFilter("country", e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground
                     focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all
                     appearance-none cursor-pointer"
                >
                    <option value="">All Countries</option>
                    {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                            {c.label}
                        </option>
                    ))}
                </select>
            </FilterSection>

            {/* Category — multi-select checkboxes */}
            <FilterSection
                title="Category"
                expanded={expandedSections.category}
                onToggle={() => toggleSection("category")}
                badge={selectedCategories.length || undefined}
            >
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                    {categories.map((cat) => {
                        const isActive = selectedCategories.includes(cat);
                        return (
                            <label
                                key={cat}
                                onClick={() => toggleCategory(cat)}
                                className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all text-sm
                  ${isActive
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all
                    ${isActive
                                            ? "bg-primary border-primary"
                                            : "border-input bg-background"
                                        }`}
                                >
                                    {isActive && (
                                        <svg
                                            className="w-2.5 h-2.5 text-primary-foreground"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={3}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    )}
                                </div>
                                {cat}
                            </label>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Content Type */}
            <FilterSection
                title="Content Type"
                expanded={expandedSections.contentType}
                onToggle={() => toggleSection("contentType")}
            >
                <select
                    value={filters.contentType ?? ""}
                    onChange={(e) => updateFilter("contentType", e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground
                     focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all
                     appearance-none cursor-pointer"
                >
                    <option value="">All Types</option>
                    {contentTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </FilterSection>
        </div>
    );

    return (
        <>
            {/* Mobile toggle */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full 
                   bg-primary text-primary-foreground shadow-2xl hover:shadow-primary/30 transition-all"
            >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-semibold">Filters</span>
                {activeCount > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-background text-primary rounded-full">
                        {activeCount}
                    </span>
                )}
            </button>

            {/* Mobile backdrop */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        onClick={() => setMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Mobile slide-over */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.aside
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="lg:hidden fixed inset-y-0 left-0 w-80 max-w-[85vw] z-50 
                       bg-card border-r border-border overflow-y-auto shadow-2xl"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <span className="font-semibold text-card-foreground">
                                Filters
                            </span>
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="p-1 rounded-md hover:bg-muted"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        {panelContent}
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
                <div className="sticky top-6 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                    {panelContent}
                </div>
            </aside>
        </>
    );
}

/* ─── Accordion Section ────────────────────────────── */

interface FilterSectionProps {
    title: string;
    icon?: React.ReactNode;
    expanded: boolean;
    onToggle: () => void;
    badge?: number;
    children: React.ReactNode;
}

function FilterSection({
    title,
    icon,
    expanded,
    onToggle,
    badge,
    children,
}: FilterSectionProps) {
    return (
        <div className="border-b border-border/50 last:border-b-0">
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-card-foreground
                   hover:bg-muted/50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    {icon && <span className="text-muted-foreground">{icon}</span>}
                    {title}
                    {badge && (
                        <span className="flex items-center justify-center w-4.5 h-4.5 text-[9px] font-bold text-primary-foreground bg-primary rounded-full">
                            {badge}
                        </span>
                    )}
                </div>
                {expanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
            </button>
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
