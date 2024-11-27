export const getChangedFields = <T extends Record<string, string | boolean | number | Date>>(
  initial: T,
  current: T,
): Partial<T> => {
  const changedFields: Partial<T> = {};

  for (const key of Object.keys(current) as Array<keyof T>) {
    if (initial[key] !== current[key]) {
      changedFields[key] = current[key];
    }
  }

  return changedFields;
};
