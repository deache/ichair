export type Product = {
    name: string;
    sku: string;
    price: number;
    description: string;
    imageUrl: string;
    type: 'office' | 'house' | 'outdoor';
    color: string;
};