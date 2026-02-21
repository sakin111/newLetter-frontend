export interface IArticle {
    article_id: string;
    title: string;
    description: string | null;
    content: string | null;
    pubDate: string;
    image_url: string | null;
    source_name: string;
    source_url: string | null;
    creator: string[] | null;
    language: string | null;
    country: string[] | null;
    category: string[] | null;
    content_type: string | null;
}

export interface INewsFilters {
    authors: string[];
    languages: { code: string; label: string }[];
    countries: { code: string; label: string }[];
    categories: string[];
    contentTypes: string[];
}

export interface INewsQueryParams {
    startDate?: string;
    endDate?: string;
    author?: string;
    language?: string;
    country?: string;
    category?: string; // comma-separated
    contentType?: string;
    page?: number;
    limit?: number;
}

export interface IArticlesResponse {
    data: IArticle[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
