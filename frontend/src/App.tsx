import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import type { QueryResult, TableInfo } from "./components/types/componentTypes";
import { fetchTablesAPI, runQueryAPI } from "./services/sqlService";
import { useSnackbar } from "./context/SnackbarProvider";
import { Cancel, CheckCircle } from "@mui/icons-material";
import Sidebar from "./components/Sidebar";
import Result from "./components/Result";
import RecentQueries from "./components/RecentQueries";

function App() {
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<TableInfo | null>(null);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<QueryResult[]>([]);
  const [error, setError] = useState<string>("");
  const [tabValue, setTabValue] = useState<number>(0);
  const [isQuerySuccessful, setQuerySuccessful] = useState<number>(0);
  const [recentQueries, setRecentQueries] = useState<string[]>([]);

  const { showMessage } = useSnackbar();

  const fetchTables = useCallback(async () => {
    try {
      const response = await fetchTablesAPI();
      setTables(response.data.tables);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  }, []);

  // mount initilly
  useEffect(() => {
    fetchTables();
  }, []);

  useEffect(() => {
    const handleQuerySuccessfulIcon = () => {
      setTimeout(() => setQuerySuccessful(0), 5000);
    };
    handleQuerySuccessfulIcon();
  }, [isQuerySuccessful]);

  const handleRunQuery = async () => {
    setError("");
    setSelectedTable(null);

    try {
      const res = await runQueryAPI(query);
      setResults(res.data.data || []);
      console.log("result", res);
      setTabValue(1);
      setQuerySuccessful(1);

      // update sidebar
      const qry_head = query.trim().split(" ")[0].toLowerCase();
      if (qry_head === "create" || qry_head === "drop") {
        fetchTables();
      }

      // store recently used queries
      const stored = JSON.parse(localStorage.getItem("recentQueries") || "[]");
      const updated = [
        query,
        ...stored.filter((q: string) => q !== query),
      ].slice(0, 10);
      localStorage.setItem("recentQueries", JSON.stringify(updated));
    } catch (err: any) {
      const backendError = err.response?.data?.error;
      const errorMsg = backendError || err.message || "Error executing query";

      setError(errorMsg);
      showMessage("Error executing query");
      setQuerySuccessful(2);
      setResults([]);
      setTabValue(0);
    }
  };

  useEffect(() => {
    const storedQueries: string[] = JSON.parse(
      localStorage.getItem("recentQueries") || "[]"
    );
    setRecentQueries(storedQueries);
  }, [recentQueries]);

  return (
    <Box display="flex" height="100vh">
      {/*---------- Sidebar---------- */}
      <Sidebar
        tables={tables}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
        setTabValue={setTabValue}
      />

      {/* ----------Main content---------- */}
      <Box
        flex={1}
        p={3}
        overflow="auto"
        sx={{
          mr: { xs: 0, lg: "400px" },
        }}
      >
        <Stack
          direction={"row"}
          display={"flex"}
          justifyContent={"space-evenly"}
        >
          <Box width={"700px"}>
            <Typography fontSize={"large"} color="gray" pb={2}>
              INPUT
            </Typography>
            <TextField
              label="Write SQL query here"
              multiline
              minRows={5}
              fullWidth
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ backgroundColor: "#e4e4e4ff" }}
            />
            <Stack direction={"row"}>
              <Button
                variant="contained"
                color={
                  isQuerySuccessful === 1
                    ? "success"
                    : isQuerySuccessful === 2
                    ? "error"
                    : "primary"
                }
                onClick={handleRunQuery}
                sx={{ mt: 2 }}
              >
                Run Query
              </Button>
              <Box
                ml={1}
                mt={2}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {isQuerySuccessful === 1 && <CheckCircle color="success" />}
                {isQuerySuccessful === 2 && <Cancel color="error" />}
              </Box>
            </Stack>

            {/* ----------Result Area---------- */}
            <Result
              results={results}
              error={error}
              selectedTable={selectedTable}
              tabValue={tabValue}
              setTabValue={setTabValue}
              recentQueries={recentQueries}
            />
          </Box>

          {/* ----------Recent Query Searches---------- */}
          <RecentQueries recentQueries={recentQueries} />
        </Stack>
      </Box>
    </Box>
  );
}

export default App;
