// src/components/FilterLogic.jsx
import React, { useState, useMemo, useCallback } from 'react';

const FilterLogic = ({ filters, onChange, children, multiSelect = false }) => {
  // Compute the initial selections for each filter category.
  // We use useMemo to avoid recalculating unless filters change.
  const initialSelections = useMemo(() => {
    return filters.reduce((acc, filterGroup) => {
      acc[filterGroup.category] = []; // No preselected filters.
      return acc;
    }, {});
  }, [filters]);

  const [selectedFilters, setSelectedFilters] = useState(initialSelections);

  // Set selection for a given category.
  // Supports both single and multiple selection modes.
  const setSelection = useCallback(
    (category, value) => {
      setSelectedFilters(prev => {
        let newSelections;
        if (multiSelect) {
          // For multi-select, toggle the value in the array.
          const current = prev[category] || [];
          if (current.includes(value)) {
            newSelections = { ...prev, [category]: current.filter(v => v !== value) };
          } else {
            newSelections = { ...prev, [category]: [...current, value] };
          }
        } else {
          // Single-selection mode: always set the selection as a single value array.
          newSelections = { ...prev, [category]: [value] };
        }
        if (onChange) onChange(newSelections);
        return newSelections;
      });
    },
    [onChange, multiSelect]
  );

  // Clear all filter selections.
  const clearAll = useCallback(() => {
    setSelectedFilters(initialSelections);
    if (onChange) onChange(initialSelections);
  }, [initialSelections, onChange]);

  // Pass along the messy logic while letting the rendering/customization remain in FilterDrawer.
  if (typeof children === 'function') {
    return children({
      filters,
      selectedFilters,
      setSelection,
      clearAll,
    });
  }

  return null;
};

export default FilterLogic;
