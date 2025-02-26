export interface Keychain {
  id: string;
  name: string;
  description: string;
  rarity: {
    id: string;
    name: string;
    color: string;
  };
  collections: {
    id: string;
    name: string;
    image: string;
  }[];
  market_hash_name: string;
  image: string;
}
