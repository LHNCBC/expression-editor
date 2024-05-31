// Conversion table for simple units
export interface Unit {
  unit: string;
  factor: number;
}

// Supported unit conversions. Key is the "from" and value is the "to" array
export const UNIT_CONVERSION: { [key: string]: Unit[] } = {
  kg: [{ unit: 'lbs', factor: 2.20462 }],
  lbs: [{ unit: 'kg', factor: 0.453592 }],
  '[in_i]': [{ unit: 'cm', factor: 2.54 }, { unit: 'm', factor: 0.0254 }],
  'cm': [{ unit: '[in_i]', factor: 0.3937 }, { unit: 'm', factor: 0.01 }],
  'm': [{ unit: 'cm', factor: 100 }, { unit: '[in_i]', factor: 39.37007 }]
};
