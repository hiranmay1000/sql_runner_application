export type RowData = Record<string, string | number | null>;

export interface TableInfo {
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
}

export interface ResultsPropsType {
  results: ExecuteResponse | null;
  error: string;
  selectedTable: TableInfo | null;
  tabValue: number;
  setTabValue: (tab: number) => void;
  recentQueries: string[];
}

export interface RecentQueriesPropsType {
  recentQueries: string[];
}

export interface DataTablePropsType {
  columns: QueryResult[];
  rows: QueryResult[];
}

// sfsdfdsfd
// Base table data model used by most components
// export interface TableData {
//   columns: string[];
//   types?: string[];
//   rows: (string | number | null)[][];
// }

// // API Responses
// export interface TablesResponse {
//   tables: string[];
// }

// // Sidebar component props
// export interface SidebarPropsType {
//   tables: string[];
//   selectedTable: TableData | null;
//   setSelectedTable: (table: TableData | null) => void;
//   setTabValue: (tab: number) => void;
// }

// // Results display props
// export interface ResultsPropsType {
//   results: TableData | null;
//   error: string;
//   selectedTable: TableData | null;
//   tabValue: number;
//   setTabValue: (tab: number) => void;
//   recentQueries: string[];
// }

// // Recent queries list props
// export interface RecentQueriesPropsType {
//   recentQueries: string[];
// }

// // DataTable props
// export type DataTablePropsType = TableData;
