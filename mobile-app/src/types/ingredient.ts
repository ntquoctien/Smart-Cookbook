export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  confidence?: number;
  available?: boolean;
}
