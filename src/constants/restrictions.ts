export const FEATURES = {
  dashboard: 'DASHBOARD',
} as const;

export type Feature = ValueOf<typeof FEATURES>;
