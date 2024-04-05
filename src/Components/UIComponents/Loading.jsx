import { PacmanLoader } from "react-spinners";
import { Stack } from "@mui/material";

const Loading = () => {
  return (
    <Stack
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"

    >
      <PacmanLoader color="#122900" />
    </Stack>
  );
};

export default Loading;
