export interface Collection {
  id: string;
  name: string;
  crates: {
    id: string;
    name: string;
    image: string;
  }[];
  contains: {
    id: string;
    name: string;
    rarity: {
      id: string;
      name: string;
      color: string;
    };
    paint_index: string;
    image: string;
  }[];
  image: string;
}
