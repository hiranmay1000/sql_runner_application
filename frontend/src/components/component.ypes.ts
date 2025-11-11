export type RowData = Record<string, string | number | null>;

export interface TableInfo {
  name: string;
  rows: (string | number | null)[][];
  columns: string[];
  types: string[];
}

export interface QueryResult {
  [key: string]: any;
}

export interface QueryResponse {
  columns: string[];
  data: QueryResult[];
}

export interface TablesResponse {
  tables: string[];
}

export interface ExecuteResponse {
  columns: string[];
  types?: string[];
  rows: (string | number | null)[][];
}

export interface SidebarPropsType {
  tables: string[];
  selectedTable: TableInfo | null;
  setSelectedTable: (table: TableInfo | null) => void;
  setTabValue: (tab: number) => void;
  sidebarOpen: boolean;
}

export interface ResultsPropsType {
  results: ExecuteResponse | null;
  error: string;
  selectedTable: TableInfo | null;
  tabValue: number;
  setTabValue: (tab: number) => void;
}

export interface DataTablePropsType {
  columns: QueryResult[];
  rows: QueryResult[];
}
