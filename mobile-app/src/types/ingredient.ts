export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  count?: number;
  unit?: string;
  confidence?: number;
  available?: boolean;
}
