export interface Environment {
  appName: string;
  punkAPIBase: string;
  resourceBase: string;
}

export interface BeerVolume {
  value: number;
  unit: string; // liters, celsius, kilograms
}

export type BeerMethodName = 'mash_temp' | 'fermentation' | 'twist';

export interface BeerMethod {
  temp: BeerVolume;
  duration?: number;
}

export type BeerIngredientName = 'malt' | 'hops' | 'yeast';

export interface BeerIngredient {
  name: string;
  amount: BeerVolume;
  add?: string;
  attribute?: string;
}

export interface Beer {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string; // mm/yyyy
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: BeerVolume;
  boil_volume: BeerVolume;
  method: Record<BeerMethodName, BeerMethod | BeerMethod[] | null>;
  ingredients: Record<BeerIngredientName, BeerIngredient | BeerIngredient[] | string | null>;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}

export interface ABV {
  drink: string;
  lowest: number;
  highest: number;
}

export interface EBC {
  style: string;
  lowest: number;
  highest: number;
}

export interface IBU {
  style: string;
  lowest: number;
  highest: number;
}
