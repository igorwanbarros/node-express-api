import { ProductCreateDto, ProductDto, ProductFilterDto, ProductUpdateDto, convertToProductDto } from "@domain/models/product.dtos";
import { ProductRepository } from "@infra/database/repositories/product.repository";

export class ProductService {
    public constructor(
        private readonly repository: ProductRepository
    ) { }

    public async list(dto: ProductFilterDto): Promise<ProductDto[]> {
        if (typeof dto?.active === 'string') {
            dto.active = dto.active === 'true';
        }

        const products = await this.repository.all(dto);

        return products?.map(product => convertToProductDto(product));
    }

    public async create(dto: ProductCreateDto): Promise<ProductDto> {
        const product = await this.repository.create(dto);

        return convertToProductDto(product);
    }

    public async update(id: string, dto: ProductUpdateDto): Promise<ProductDto> {
        const product = await this.repository.find(id);
        const update = await this.repository.update(product.id, dto);

        return convertToProductDto(update);
    }

    public async delete(id: string): Promise<ProductDto> {
        const product = await this.repository.find(id);
        const update = await this.repository.delete(product.id);

        return convertToProductDto(update);
    }
}
