import { ContentCopy, OutputOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "../context/SnackbarProvider";
import { fetchTableInfoAPI, fetchTablesAPI } from "../services/sqlService";
import DataTable from "../components/DataTable";
import QueryList from "../components/QueryList";
import type {
  QueryResult,
  ResultsPropsType,
} from "../components/component.ypes";

function Result(props: ResultsPropsType) {
  const { results, error, selectedTable, tabValue, setTabValue } = props;
  const [tables, setTables] = useState<string[]>();
  const [availableTables, setAvailableTables] = useState<QueryResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
        } catch (error) {
          console.error(error);
        }
      };

      fetchAllTableDetails();
    }
  }, [tabValue]);

  useEffect(() => {
    if (tabValue === 2 && tables?.length) {
      const fetchAllTableDetails = async () => {
        setLoading(true);
        try {
          const allDetails = await Promise.all(
            tables.map(async (table) => {
              const response = await fetchTableInfoAPI(table);
              return {
                ...response.data,
                name: table,
              };
            })
          );
          setAvailableTables(allDetails);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchAllTableDetails();
    }
  }, [tabValue, tables]);

  useEffect(() => {
    if (isLargeScreen && tabValue === 3) {
      setTabValue(0);
    }
  }, [isLargeScreen, tabValue, setTabValue]);

  return (
    <Box
      mt={4}
      sx={{
        minHeight: "300px",
      }}
    >
      {/* Tabs Header */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          minHeight: 32,
          "& .MuiTab-root": {
            minHeight: 32,
            padding: "4px 12px",
            fontSize: "0.8rem",
            textTransform: "none",
          },
          "& .MuiTabs-indicator": {
            height: 2,
          },
        }}
      >
        <Tab
          label="Output (JSON)"
          icon={<OutputOutlined />}
          iconPosition="start"
        />
        <Tab label="Preview (Table)" />
        <Tab label="Available Tables" />
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
          ) : results ? (
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
          {!selectedTable && results ? (
            <>
              <Typography variant="h6" gutterBottom>
                Query Results:
              </Typography>
              <DataTable columns={results.columns} rows={results.rows} />
            </>
          ) : (
            !selectedTable && (
              <Typography fontWeight={"bold"}>Nothing to display.</Typography>
            )
          )}

          {/* Show selected table preview */}
          {selectedTable && (
            <>
              <Typography variant="h6" gutterBottom>
                Table Preview:{" "}
                <Box
                  component="span"
                  sx={{
                    backgroundColor: "#eee",
                    px: 1,
                    py: 0.3,
                    borderRadius: 1,
                    fontWeight: 500,
                  }}
                >
                  {selectedTable.name}
                </Box>
              </Typography>

              <DataTable
                columns={selectedTable.columns}
                rows={selectedTable.rows}
              />
            </>
          )}
        </Box>
      )}

      {/* Available Tables Tab */}
      {tabValue === 2 && (
        <Box>
          {loading || !availableTables ? (
            <Stack direction={"row"}>
              <CircularProgress size={24} />
              <Typography sx={{ ml: 2 }}>Loading...</Typography>
            </Stack>
          ) : availableTables.length > 0 ? (
            availableTables.map((table, idx) => (
              <>
                <Box key={idx} sx={{ mt: 3, p: 1 }}>
                  <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                    {idx + 1}
                    {". "}
                    {table.name}
                  </Typography>
                  <DataTable
                    columns={table.columns}
                    types={table.types}
                    rows={table.rows}
                  />
                </Box>
              </>
            ))
          ) : (
            <Typography fontWeight={"bold"}>
              No available table found!
            </Typography>
          )}
        </Box>
      )}

      {tabValue === 3 && <QueryList />}
    </Box>
  );
}

export default Result;
