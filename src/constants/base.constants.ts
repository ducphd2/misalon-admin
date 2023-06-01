export const BASE_API =
  process.env.REACT_APP_BASE_URL ?? 'https://api.ducph.click';

export const BASE_API_URL =
  `${process.env.REACT_APP_BASE_URL}/api` ?? 'https://api.ducph.click';

export const GOOGLE_MAP_KEY: string =
  process.env.REACT_APP_GOOGLE_MAPS_KEY || '';
