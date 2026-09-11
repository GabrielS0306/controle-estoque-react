export type MovementType = "Entrada" | "Saída";

export type Movement = {
  id: number;
  productId: number;
  productName: string;
  type: MovementType;
  quantity: number;
  date: string;
  note: string;
};
