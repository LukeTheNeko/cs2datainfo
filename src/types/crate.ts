export interface Crate {
  id: string;
  name: string;
  description: string | null;
  type: string | null;
  first_sale_date: string;
  contains: {
    id: string;
    name: string;
    rarity: {
      id: string;
      name: string;
      color: string;
    };
    paint_index: string | null;
    image: string;
    phase?: string | null;
  }[];
  contains_rare: {
    id: string;
    name: string;
    rarity: {
      id: string;
      name: string;
      color: string;
    };
    paint_index: string | null;
    image: string;
    phase?: string | null;
  }[];
  market_hash_name: string;
  rental: boolean;
  image: string;
  model_player: string | null;
}
