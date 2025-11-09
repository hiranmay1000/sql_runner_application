import {
  ExecuteResponse,
  TableInfo,
  TablesResponse,
} from "../components/componentTypes";
import { API_BASE } from "../config/config";
import axios from "axios";
import { api } from "./api";

export const runQueryAPI = (query: string) => {
  return api.post<ExecuteResponse>(`${API_BASE}/run-query`, {
    query,
  });
};

export const fetchTablesAPI = () => {
  return axios.get<TablesResponse>(`${API_BASE}/tables`);
};

export const fetchTableInfoAPI = (table: string) => {
  return axios.get<TableInfo>(`${API_BASE}/table-info/${table}`);
};
