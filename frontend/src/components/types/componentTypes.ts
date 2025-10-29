export interface TableColumn {
  name: string;
  type: string;
}

export interface TableInfo {
  columns: TableColumn[];
  sample_data: Record<string, any>[];
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
  data: QueryResult[];
}

export interface SidebarPropsType {
  tables: string[];
  selectedTable: TableInfo | null;
  setSelectedTable: (table: TableInfo | null) => void;
  setTabValue: (tab: number) => void;
}

export interface ResultsPropsType {
  results: QueryResult[];
  error: string;
  selectedTable: TableInfo | null;
  tabValue: number;
  setTabValue: (tab: number) => void;
  recentQueries: string[];
}

export interface RecentQueriesPropsType {
  recentQueries: string[];
}
