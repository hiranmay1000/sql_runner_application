import { ContentCopy, OutputOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import type { QueryResult, ResultsPropsType } from "./types/componentTypes";
import { useSnackbar } from "../context/SnackbarProvider";
import { fetchTableInfoAPI, fetchTablesAPI } from "../services/sqlService";
import QueryList from "./QueryList";

function Result(props: ResultsPropsType) {
  const {
    results,
    error,
    selectedTable,
    tabValue,
    setTabValue,
    recentQueries,
  } = props;
  const [tables, setTables] = useState<string[]>();
  const [availableTables, setAvailableTables] = useState<QueryResult[]>([]);

  const { showMessage } = useSnackbar();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(results, null, 2));
      showMessage("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy JSON:", err);
      showMessage("Failed to copy JSON");
    }
  };

  useEffect(() => {
    if (tabValue === 2) {
      const fetchAllTableDetails = async () => {
        try {
          const response = await fetchTablesAPI();
          setTables(response.data.tables);
        } catch (error) {}
      };

      fetchAllTableDetails();
    }
  }, [tabValue]);

  useEffect(() => {
    if (tabValue === 2 && tables?.length) {
      const fetchAllTableDetails = async () => {
        try {
          const allDetails = await Promise.all(
            tables.map(async (table) => {
              const response = await fetchTableInfoAPI(table);
              return {
                name: table,
                ...response.data,
              };
            })
          );
          setAvailableTables(allDetails);
        } catch (error) {
          console.error(error);
        }
      };

      fetchAllTableDetails();
    }
  }, [tabValue, tables]);

  useEffect(() => {
    if (isLargeScreen && tabValue === 3) {
      setTabValue(0);
    }
  }, [isLargeScreen]);

  return (
    <Box mt={4} sx={{ minHeight: "300px" }}>
      {/* Tabs Header */}
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab
          label="Output (JSON)"
          icon={<OutputOutlined />}
          iconPosition="start"
        />
        <Tab label="Preview (Table)" />
        <Tab label="Available Tables" />
        {/* Hide this tab when screen size is greater than 1200px in width */}
        {!isLargeScreen && <Tab label="Recent Queries" />}
      </Tabs>

      <Divider sx={{ my: 2 }} />

      {/* Output Tab — JSON format */}
      {tabValue === 0 && (
        <Box>
          {error ? (
            <Typography color="error" fontWeight={"Bold"}>
              {"> " + error + "!"}
            </Typography>
          ) : results && results.length > 0 ? (
            <Paper
              sx={{
                p: 2,
                backgroundColor: "#1e1e1e",
                color: "#d4d4d4",
                fontFamily: "monospace",
                whiteSpace: "pre-wrap",
                overflowX: "auto",
                position: "relative",
              }}
            >
              {/* Copy button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mb: 1,
                }}
              >
                <Tooltip title="Copy JSON">
                  <IconButton
                    onClick={handleCopy}
                    sx={{
                      color: "#d4d4d4",
                      backgroundColor: "#888888ff",
                      "&:hover": { backgroundColor: "#555" },
                      borderRadius: 1,
                      padding: "4px",
                    }}
                  >
                    <ContentCopy fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box>{JSON.stringify(results, null, 2)}</Box>
            </Paper>
          ) : (
            <Typography fontWeight={"bold"} color="#1a88e8ff">
              No results to display, write some queries!
            </Typography>
          )}
        </Box>
      )}

      {/* Preview Tab — Table format */}
      {tabValue === 1 && (
        <Box>
          {/* Show user's query results in table */}
          {!selectedTable && results && results.length > 0 ? (
            <>
              <Typography variant="h6" gutterBottom>
                Query Results:
              </Typography>
              <TableContainer component={Paper} sx={{ mb: 3, maxHeight: 400 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      {Object.keys(results[0]).map((col) => (
                        <TableCell key={col}>{col}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.map((row, i) => (
                      <TableRow key={i}>
                        {Object.values(row).map((val, j) => (
                          <TableCell key={j}>{String(val)}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            !selectedTable && <Typography>No entries available.</Typography>
          )}

          {/* Show selected table preview */}
          {selectedTable && (
            <>
              <Typography variant="h6" gutterBottom>
                Table Preview:
              </Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      {selectedTable.columns.map((col) => (
                        <TableCell key={col.name}>
                          {col.name}{" "}
                          <small style={{ color: "gray" }}>[{col.type}]</small>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedTable.sample_data.map((row, i) => (
                      <TableRow key={i}>
                        {selectedTable.columns.map((col) => (
                          <TableCell key={col.name}>{row[col.name]}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Box>
      )}

      {/* Available Tables Tab */}
      {tabValue === 2 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Available Tables:
          </Typography>
          {availableTables.length > 0 ? (
            availableTables.map((table, idx) => (
              <Box key={idx} sx={{ mb: 4, p: 1 }}>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  {table.name}
                </Typography>
                <TableContainer key={idx}>
                  <Table
                    size="small"
                    stickyHeader
                    sx={{ border: "1px solid #999" }}
                  >
                    <TableHead>
                      <TableRow>
                        {table.columns.map((col) => (
                          <TableCell key={col.name}>
                            {col.name}{" "}
                            <small style={{ color: "gray" }}>
                              [{col.type}]
                            </small>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {table.sample_data.map((row, i) => (
                        <TableRow key={i}>
                          {table.columns.map((col) => (
                            <TableCell key={col.name}>
                              {row[col.name]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Divider />
              </Box>
            ))
          ) : (
            <Typography>No available table found!</Typography>
          )}
        </Box>
      )}

      {tabValue === 3 && <QueryList recentQueries={recentQueries} />}
    </Box>
  );
}

export default Result;
