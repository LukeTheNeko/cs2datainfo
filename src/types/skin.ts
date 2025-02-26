export interface Skin {
  id: string;
  name: string;
  description: string;
  weapon: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  pattern: {
    id: string;
    name: string;
  };
  min_float: number;
  max_float: number;
  rarity: {
    id: string;
    name: string;
    color: string;
  };
  stattrak: string;
  souvenir: string;
  style: {
    id: string;
    name: string;
    url: string;
  };
  paint_index: string;
  wears: Array<{
    id: string;
    name: string;
  }>;
  collections: Array<{
    id: string;
    name: string;
    image: string;
  }>;
  crates: Array<{
    id: string;
    name: string;
    image: string;
  }>;
  phase: string;
  team: {
    id: string;
    name: string;
  };
  image: string;
}
