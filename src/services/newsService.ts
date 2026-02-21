import axiosInstance from "@/lib/axios";
import type {
    IArticle,
    IArticlesResponse,
    INewsFilters,
    INewsQueryParams,
} from "@/Types/news";

export const newsService = {
    async fetchArticles(
        params: INewsQueryParams = {}
    ): Promise<IArticlesResponse> {
        const cleanParams = Object.fromEntries(
            Object.entries(params).filter(
                ([, v]) => v !== undefined && v !== null && v !== ""
            )
        );
        const { data } = await axiosInstance.get("/news/articles", {
            params: cleanParams,
        });
        return data.data ?? data;
    },

    async fetchArticleById(id: string): Promise<IArticle> {
        const { data } = await axiosInstance.get(`/news/articles/${id}`);
        return data.data ?? data;
    },

    async fetchFilterOptions(): Promise<INewsFilters> {
        const { data } = await axiosInstance.get("/news/filters");
        return data.data ?? data;
    },
};
