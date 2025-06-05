import { MaterialInterface } from "./materialInterface";
import { ProductionInterface } from "./productionInterface";

export interface FormularInterface {
    id: number;
    name: string;
    unitName: string;
    qty: number;
    material: MaterialInterface;
    production: ProductionInterface;
}