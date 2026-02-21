export default function ArticleSkeleton() {
    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden animate-pulse">
            {/* Image skeleton */}
            <div className="h-48 bg-muted" />

            <div className="p-5 space-y-3">
                {/* Source */}
                <div className="h-3 w-20 bg-muted rounded" />

                {/* Title */}
                <div className="space-y-2">
                    <div className="h-5 w-full bg-muted rounded" />
                    <div className="h-5 w-3/4 bg-muted rounded" />
                </div>

                {/* Snippet */}
                <div className="space-y-1.5">
                    <div className="h-3.5 w-full bg-muted rounded" />
                    <div className="h-3.5 w-full bg-muted rounded" />
                    <div className="h-3.5 w-2/3 bg-muted rounded" />
                </div>

                {/* Meta */}
                <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                    <div className="h-3 w-24 bg-muted rounded" />
                    <div className="h-3 w-20 bg-muted rounded" />
                </div>
            </div>
        </div>
    );
}
