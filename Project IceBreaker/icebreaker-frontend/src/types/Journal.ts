export interface Journal {
    id: string;
    opening: string;
    rating: '😞 Downer' | '🎉 Hype';
    content: string;
    likes: number;
    isLiked?: boolean;
}