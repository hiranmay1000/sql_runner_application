import { Box, Divider, Typography } from "@mui/material";
import type { RecentQueriesPropsType } from "../components/componentTypes";
import QueryList from "../components/QueryList";

function RecentQueries(props: RecentQueriesPropsType) {
  const { recentQueries } = props;

  return (
    <Box
      bgcolor="#f3f3f3"
      p={2}
      overflow="auto"
      sx={{
        position: "relative",
        width: "320px",
        height: "calc(100vh - 180px)",
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
