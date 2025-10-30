export const getStoredQueries = (): string[] =>
  JSON.parse(localStorage.getItem("recentQueries") || "[]");

export const saveQuery = (query: string) => {
  const stored = getStoredQueries();
  const updated = [query, ...stored.filter((q) => q !== query)].slice(0, 10);
  localStorage.setItem("recentQueries", JSON.stringify(updated));
  return updated;
};
