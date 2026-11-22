export interface Greet {
    id: string;
    title: string;
    description: string;
    author: string;
    createdAt?: string;
    updatedAt?: string;
    message?: string | null;
    error?: string | null;
}
