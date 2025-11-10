import { List, ListItem, Tooltip } from "@mui/material";
import { useState } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

function QueryList() {
  const [copyText, setCopyText] = useState<string>("Copy");

  const recentQueries = useSelector(
    (state: RootState) => state.query.recentQueries
  );

  const handleCopy = async (query: string) => {
    try {
      await navigator.clipboard.writeText(query);
      setCopyText("Copied");
      setTimeout(() => setCopyText("Copy"), 2000);
    } catch (err) {
      setCopyText("Failed to copy");
      setTimeout(() => setCopyText("Copy"), 2000);
    }
  };

  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {recentQueries.map((query, idx) => (
        <Tooltip key={idx} title={copyText}>
          <ListItem
            onClick={() => handleCopy(query)}
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              fontFamily: "monospace",
              fontSize: "0.9rem",
              px: 2,
              py: 1,
              cursor: "pointer",
              transition: "all 0.1s ease-in-out",
              "&:hover": {
                bgcolor: "#e8f0fe",
                transform: "scale(1.01)",
              },
            }}
          >
            {query}
          </ListItem>
        </Tooltip>
      ))}
    </List>
  );
}

export default QueryList;
