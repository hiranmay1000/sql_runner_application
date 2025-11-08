import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchTableInfoAPI } from "../services/sqlService";
import type { SidebarPropsType, TableInfo } from "../components/componentTypes";

function Sidebar(props: SidebarPropsType) {
  const { tables, setSelectedTable, setTabValue, sidebarOpen } = props;
  const [tableInfos, setTableInfos] = useState<Record<string, TableInfo>>({});

  // render sidebar table attributes
  useEffect(() => {
    const fetchAllTables = async () => {
      try {
        const responses = await Promise.all(
          tables.map((table) => fetchTableInfoAPI(table))
        );
        const infoMap: Record<string, TableInfo> = {};
        tables.forEach((t, i) => (infoMap[t] = responses[i].data));
        setTableInfos(infoMap);
      } catch (err) {
        console.error("Error fetching tables info:", err);
      }
    };
    fetchAllTables();
  }, [tables]);

  return (
    <Box
      sx={{
        width: sidebarOpen ? 320 : 0,
        transition:
          "width 0.4s ease-in-out, margin 0.3s ease-in-out, padding 0.3s ease-in-out, opacity 0.2s ease-in-out",
        opacity: sidebarOpen ? 1 : 0,
        overflowX: "hidden",
        bgcolor: "#f3f3f3",
        m: sidebarOpen ? 3 : 0,
        p: sidebarOpen ? 2 : 0,
        mt: 3,
        pt: 2,
        borderRadius: 3,
        border: "1px solid #ddd",
      }}
    >
      <Typography variant="h6" fontWeight={"bold"} gutterBottom>
        Tables
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {tables
          .slice()
          .reverse()
          .map((table) => {
            const tableInfo = tableInfos[table];
            return (
              <Box
                key={table}
                mb={2}
                sx={{
                  border: "1px solid #828282ff",
                  backgroundColor: "#f1f1f1ff",
                  borderRadius: 1,
                  pb: 1,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    bgcolor: "#fafafa",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#ddd" },
                  }}
                  onClick={() => {
                    setSelectedTable(tableInfo);
                    setTabValue(1);
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {table}
                  </Typography>
                </Paper>

                {tableInfo && (
                  <List disablePadding sx={{ pl: 2 }}>
                    {tableInfo.columns.map((col, idx) => (
                      <ListItem key={col} sx={{ py: 0 }}>
                        <ListItemText
                          primary={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "230px",
                              }}
                            >
                              <Typography
                                component="span"
                                variant="body2"
                                sx={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  flexShrink: 1,
                                }}
                              >
                                └ {col}
                              </Typography>

                              <Typography
                                component="span"
                                variant="body2"
                                sx={{
                                  ml: 0.5,
                                  fontSize: "0.75rem",
                                  color: "#1a88e8ff",
                                  flexShrink: 0,
                                }}
                              >
                                [{tableInfo.types[idx]}]
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            );
          })}
      </List>
    </Box>
  );
}

export default Sidebar;
