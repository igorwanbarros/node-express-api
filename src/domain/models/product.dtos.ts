import { Product } from "@prisma/client";

export type ProductCreateDto = {
    name: string;
    price: number;
    description?: string;
};

export type ProductUpdateDto = {
    name?: string;
    price?: number;
    description?: string;
};

export type ProductFilterDto =  {
    id?: string;
    name?: string;
    price?: number;
    description?: string;
    created_at?: Date;
    active?: boolean;
};

export type ProductDto = Omit<Product, 'updated_at' | 'deleted_at'> & {
    active: boolean;
};

export const convertToProductDto = (product: Product): ProductDto => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    created_at: product.created_at,
    active: product.deleted_at === null,
});
