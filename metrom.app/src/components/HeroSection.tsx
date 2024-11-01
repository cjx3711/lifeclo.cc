import { Stack, Box } from "@mui/system";

const HeroSection = () => {
  return (
    <Stack
      id="hero"
      direction={{ xs: "column", md: "row" }}
      spacing={4}
      alignItems="center"
      sx={{ minHeight: "80vh" }}>
      <Box flex={1}>
        <h1>Welcome to Our Company</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Box>

      <Box flex={1}>
        <img
          src="https://via.placeholder.com/500"
          alt="Hero"
          style={{ width: "100%", minHeight: "300px", backgroundColor: "red" }}
        />
      </Box>
    </Stack>
  );
};

export default HeroSection;
