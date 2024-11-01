import { Stack, Box } from "@mui/system";

const AboutSection = () => {
  return (
    <Stack
      id="about"
      direction={{ xs: "column-reverse", md: "row" }}
      spacing={4}
      alignItems="center"
      sx={{ minHeight: "80vh" }}>
      <Box flex={1}>
        <img
          src="https://via.placeholder.com/500"
          alt="About"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      <Box flex={1}>
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Box>
    </Stack>
  );
};

export default AboutSection;
