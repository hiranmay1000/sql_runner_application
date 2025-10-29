import { Box, Divider, Typography } from "@mui/material";
import type { RecentQueriesPropsType } from "./types/componentTypes";
import QueryList from "./QueryList";

function RecentQueries(props: RecentQueriesPropsType) {
  const { recentQueries } = props;

  return (
    <Box
      width="320px"
      bgcolor="#f3f3f3"
      p={2}
      overflow="auto"
      sx={{
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        height: "calc(100vh - 100px)",
        border: "1px solid #ddd",
        zIndex: 1200,
        m: 3,
        borderRadius: 3,

        // Responsiveness
        display: {
          xs: "none",
          sm: "none",
          md: "none",
          lg: "block", // show on large screens (≥1200px)
        },
      }}
    >
      <Typography fontWeight="bold">Recent Queries</Typography>
      <Divider sx={{ mb: 2 }} />
      <Box>
        <QueryList recentQueries={recentQueries} />
      </Box>
    </Box>
  );
}

export default RecentQueries;
