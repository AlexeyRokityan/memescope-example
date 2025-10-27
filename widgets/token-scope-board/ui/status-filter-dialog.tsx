'use client';

import { useState } from 'react';

import { X as XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FilterCondition } from '@/widgets/token-scope-board/model/filtering';
import {
  FILTER_FIELDS,
  FILTER_OPERATORS,
  createDefaultFilter,
} from '@/widgets/token-scope-board/model/filtering';
import FilterIcon from '@icons/filter.svg';

type StatusFilterDialogProps = {
  filters: FilterCondition[];
  onSave: (filters: FilterCondition[]) => void;
};

const sanitizeDraftFilters = (filters: FilterCondition[]) =>
  filters.filter((filter) => filter.value.trim().length > 0);

const getInitialDraft = (filters: FilterCondition[]) =>
  filters.length > 0 ? filters : [createDefaultFilter()];

export function StatusFilterDialog({ filters, onSave }: StatusFilterDialogProps) {
  const [open, setOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<FilterCondition[]>(getInitialDraft(filters));

  const appliedFiltersCount = filters.length;
  const hasAppliedFilters = appliedFiltersCount > 0;

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      setDraftFilters(getInitialDraft(filters));
    }
  };

  const updateDraftFilter = <Key extends keyof FilterCondition>(
    index: number,
    key: Key,
    value: FilterCondition[Key]
  ) => {
    setDraftFilters((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  };

  const addDraftFilter = () => {
    setDraftFilters((prev) => [...prev, createDefaultFilter()]);
  };

  const handleSave = () => {
    const sanitized = sanitizeDraftFilters(draftFilters);
    onSave(sanitized);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleRemoveFilter = (index: number) => {
    setDraftFilters((prev) => prev.filter((_, position) => position !== index));
  };

  const handleClearFilters = () => {
    setDraftFilters([createDefaultFilter()]);
    onSave([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="flex w-fit items-center justify-between rounded-full p-[0_scale(20px)] gap-[scale(20px)] hover:bg-purpure/40"
        >
          <span className="flex items-center text-base gap-[scale(8px)]">
            <FilterIcon className="h-[scale(16px)] w-[scale(16px)] text-muted-foreground" />
            Filter
          </span>
          {hasAppliedFilters && (
            <span className="bg-purpure rounded-[scale(4px)] w-[scale(19px)] h-[scale(20px)] text-base font-normal text-main-bg flex items-center justify-center">
              {appliedFiltersCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-[scale(12px)] mt-[scale(24px)]">
          {draftFilters.map((filter, index) => (
            <div key={index} className="flex gap-[scale(8px)]">
              <Select
                value={filter.field}
                onValueChange={(next) =>
                  updateDraftFilter(index, 'field', next as FilterCondition['field'])
                }
              >
                <SelectTrigger className="w-[scale(140px)] h-[scale(30px)] min-w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FILTER_FIELDS.map(({ value: fieldValue, label }) => (
                    <SelectItem key={fieldValue} value={fieldValue}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={filter.operator}
                onValueChange={(operator) =>
                  updateDraftFilter(index, 'operator', operator as FilterCondition['operator'])
                }
              >
                <SelectTrigger className="w-[scale(74px)] h-[scale(30px)]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FILTER_OPERATORS.map((operator) => (
                    <SelectItem key={operator} value={operator}>
                      {operator}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="text"
                value={filter.value}
                onChange={(event) => updateDraftFilter(index, 'value', event.target.value)}
                placeholder="Value"
              />
              {draftFilters.length > 1 && (
                <button type="button" onClick={() => handleRemoveFilter(index)}>
                  <XIcon className="size-[scale(14px)]" />
                </button>
              )}
            </div>
          ))}
          <div>
            <Button
              variant="link"
              type="button"
              onClick={addDraftFilter}
              className="h-[scale(32px)] px-[0] text-sm"
            >
              + Add filter
            </Button>
          </div>
        </div>
        <DialogFooter className="flex-col gap-[scale(8px)] sm:flex-row sm:items-center sm:justify-between sm:space-x-0">
          <Button
            type="button"
            variant="link"
            onClick={handleClearFilters}
            className="h-[scale(24px)] bg-transparent"
          >
            Clear
          </Button>
          <div className="flex gap-[scale(8px)]">
            <Button
              type="button"
              onClick={handleCancel}
              className="h-[scale(24px)] bg-transparent text-foreground"
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSave} className="h-[scale(24px)] bg-light-green">
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
