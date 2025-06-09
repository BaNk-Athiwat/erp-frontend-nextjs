import { ProductionInterface } from "./productionInterface";

export interface ProductionLogInterface {
    id: number | null;
    production: ProductionInterface;
    qty: number;
    unitName: string;
    createdAt: string;
    remarks: string;
}