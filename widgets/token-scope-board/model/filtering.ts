import type { MemescopeType } from '@/lib/api/endpoints/memescope';

export type FilterOperator = '>' | '<' | '=';
export type FilterField = keyof MemescopeType;

export type FilterCondition = {
  field: FilterField;
  operator: FilterOperator;
  value: string;
};

export const FILTER_FIELDS: { value: FilterField; label: string }[] = [
  { value: 'id', label: 'ID' },
  { value: 'name', label: 'Name' },
  { value: 'ticker', label: 'Ticker' },
  { value: 'marketCap', label: 'Market Cap' },
  { value: 'volume', label: 'Volume' },
  { value: 'tx', label: 'TX' },
  { value: 'growth', label: 'Growth' },
  { value: 'watchers', label: 'Watchers' },
  { value: 'holders', label: 'Holders' },
  { value: 'status', label: 'Status' },
];

export const FILTER_OPERATORS: FilterOperator[] = ['>', '<', '='];

export const createDefaultFilter = (): FilterCondition => ({
  field: FILTER_FIELDS[0]?.value ?? ('name' as FilterField),
  operator: '>',
  value: '',
});

const normalizeValue = (value: unknown) => {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    return value.trim();
  }

  return value;
};

const matchesFilter = (token: MemescopeType, condition: FilterCondition): boolean => {
  const tokenValue = token[condition.field];
  const normalizedTokenValue = normalizeValue(tokenValue);

  if (condition.value.trim().length === 0) {
    return true;
  }

  const comparisonValue =
    typeof normalizedTokenValue === 'number' ? Number(condition.value) : condition.value.trim();

  if (typeof normalizedTokenValue === 'number') {
    const target = Number(condition.value);

    if (!Number.isFinite(target)) {
      return false;
    }

    if (condition.operator === '>') {
      return normalizedTokenValue > target;
    }
    if (condition.operator === '<') {
      return normalizedTokenValue < target;
    }
    return normalizedTokenValue === target;
  }

  const tokenString = String(normalizedTokenValue).toLowerCase();
  const comparisonString = String(comparisonValue).toLowerCase();

  if (condition.operator === '=') {
    return tokenString === comparisonString;
  }

  if (condition.operator === '>') {
    return tokenString > comparisonString;
  }

  if (condition.operator === '<') {
    return tokenString < comparisonString;
  }

  return false;
};

export const applyFilters = (
  tokens: MemescopeType[],
  filters: FilterCondition[]
): MemescopeType[] => {
  const activeFilters = filters.filter((filter) => filter.value.trim().length > 0);

  if (activeFilters.length === 0) {
    return tokens;
  }

  return tokens.filter((token) =>
    activeFilters.every((condition) => matchesFilter(token, condition))
  );
};
