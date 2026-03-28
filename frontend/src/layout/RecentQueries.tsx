import { Box, Divider, Stack, Typography } from "@mui/material";
import QueryList from "../components/QueryList";
import { clearQueries } from "../redux/slice/query.slice";
import { useDispatch } from "react-redux";

function RecentQueries() {
  const dispatch = useDispatch();

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
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography fontWeight="bold">Recent Queries</Typography>
        <Typography
          onClick={() => dispatch(clearQueries())}
          sx={{ cursor: "pointer", ":hover": { color: "blue" } }}
        >
          Clear
        </Typography>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <Box>
        <QueryList />
      </Box>
    </Box>
  );
}

export default RecentQueries;
