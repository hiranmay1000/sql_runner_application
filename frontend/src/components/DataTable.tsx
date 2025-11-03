import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ExecuteResponse } from "./types/componentTypes";

function DataTable(props: ExecuteResponse) {
  const { columns = [], types = [], rows = [] } = props || {};

  return (
    <TableContainer component={Paper} sx={{ mb: 3, maxHeight: 400 }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((col: any, idx: number) => (
              <TableCell
                key={idx}
                sx={{ backgroundColor: "#eee", fontWeight: "bold" }}
              >
                {col}
                {types?.[idx] && (
                  <small style={{ color: "gray", fontWeight: "normal" }}>
                    [{types[idx]}]
                  </small>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.length > 0 ? (
            rows.map((row: any, i: number) => (
              <TableRow key={i}>
                {row.map((val: string | number | null, j: number) => (
                  <TableCell key={j}>{String(val)}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns?.length || 1}
                align="center"
                sx={{ color: "gray", fontStyle: "italic" }}
              >
                This table is empty
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
