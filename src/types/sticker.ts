export interface Sticker {
  id: string;
  name: string;
  description: string;
  rarity: {
    id: string;
    name: string;
    color: string;
  };
  crates: {
    id: string;
    name: string;
    image: string;
  }[];
  tournament_event: string;
  type: string;
  market_hash_name: string | null;
  effect: string;
  image: string;
}
