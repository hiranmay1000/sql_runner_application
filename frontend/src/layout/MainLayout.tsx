import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Result from "./Result";
import { useCallback, useEffect, useState } from "react";
import { Cancel, CheckCircle } from "@mui/icons-material";
import type { ExecuteResponse, TableInfo } from "../components/componentTypes";
import { useSnackbar } from "../context/SnackbarProvider";
import { fetchTablesAPI, runQueryAPI } from "../services/sqlService";
import RecentQueries from "./RecentQueries";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { setQueries } from "../redux/slice/query.slice";

export default function MainLayout(props: { sidebarOpen: boolean }) {
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<TableInfo | null>(null);
  const [results, setResults] = useState<ExecuteResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [tabValue, setTabValue] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [querySuccessfulIcon, setQuerySuccessfulIcon] = useState<number>(0);

  const { sidebarOpen } = props;
  const dispatch = useDispatch();
  const { showMessage } = useSnackbar();

  const fetchTables = useCallback(async () => {
    try {
      const response = await fetchTablesAPI();
      setTables(response.data.tables);
    } catch (err: any) {
      const backendError = err.response?.data?.error;
      const errorMsg = backendError || err.message || "Error fetching tables";
      setError(errorMsg);
    }
  }, []);

  // mount initilly
  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  useEffect(() => {
    const handleQuerySuccessfulIcon = () => {
      setTimeout(() => setQuerySuccessfulIcon(0), 5000);
    };
    handleQuerySuccessfulIcon();
  }, [querySuccessfulIcon]);

  const handleRunQuery = async () => {
    setError("");
    setSelectedTable(null);

    try {
      const res = await runQueryAPI(query);
      setResults(res.data);
      console.log("result", res.data.rows);
      console.log("result", res.data.columns);
      setTabValue(1);
      setQuerySuccessfulIcon(1);

      const qry_head = query.trim().split(" ")[0].toLowerCase();
      if (qry_head === "create" || qry_head === "drop") {
        fetchTables();
      }

      dispatch(setQueries(query));
    } catch (err: any) {
      const backendError = err.response?.data?.error;
      const errorMsg = backendError || err.message || "Error executing query";

      setError(errorMsg);
      showMessage("Error executing query");
      setQuerySuccessfulIcon(2);
      setResults(null);
      setTabValue(0);
    }
  };

  return (
    <Box display="flex" height="calc(100vh - 80px)">
      {/*---------- Sidebar---------- */}
      <Sidebar
        tables={tables}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
        setTabValue={setTabValue}
        sidebarOpen={sidebarOpen}
      />

      {/* ----------Main content---------- */}
      <Box flex={1} p={3} overflow="auto">
        <Stack
          direction={"row"}
          display={"flex"}
          justifyContent={"space-evenly"}
        >
          <Box width={"650px"}>
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
                  querySuccessfulIcon === 1
                    ? "success"
                    : querySuccessfulIcon === 2
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
                {querySuccessfulIcon === 1 && <CheckCircle color="success" />}
                {querySuccessfulIcon === 2 && <Cancel color="error" />}
              </Box>
            </Stack>

            {/* ----------Result Area---------- */}
            <Result
              results={results}
              error={error}
              selectedTable={selectedTable}
              tabValue={tabValue}
              setTabValue={setTabValue}
            />
          </Box>
        </Stack>
      </Box>
      {/* ----------Recent Query Searches---------- */}
      <RecentQueries />
    </Box>
  );
}
