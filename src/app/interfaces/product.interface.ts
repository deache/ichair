export interface Product {
    color: string;
    description: string;
    imageUrl: string;
    name: string;
    price: number;
    sku: string;
    type: "house" | "outdoor" | "office";
}