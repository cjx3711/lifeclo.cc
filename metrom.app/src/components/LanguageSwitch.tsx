import { styled } from "@mui/system";
import { useSpring, animated } from "@react-spring/web";

interface LanguageSwitchProps {
  isJapanese: boolean;
  onToggle: () => void;
}

const SwitchRoot = styled("div")({
  position: "relative",
  width: "70px",
  height: "28px",
  padding: "4px",
  borderRadius: "18px",
  backgroundColor: "rgba(217, 173, 104, 0.2)",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(217, 173, 104, 0.3)",
  },
});

const SwitchTrack = styled(animated.div)({
  position: "absolute",
  width: "35px",
  height: "28px",
  borderRadius: "18px",
  backgroundColor: "#D9AD68",
});

const LabelContainer = styled("div")({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  padding: "0 10px",
  height: "28px",
  alignItems: "center",
  userSelect: "none",
});

const Label = styled("span")<{ active: boolean }>(({ active }) => ({
  fontSize: "16px",
  fontWeight: "bold",
  color: active ? "#FFF" : "rgba(217, 173, 104, 0.5)",
  transition: "color 0.2s ease",
  zIndex: 1,
}));

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  isJapanese,
  onToggle,
}) => {
  const springs = useSpring({
    transform: isJapanese ? "translateX(35px)" : "translateX(0px)",
    config: {
      tension: 300,
      friction: 25,
    },
  });

  return (
    <SwitchRoot onClick={onToggle}>
      <SwitchTrack style={springs} />
      <LabelContainer>
        <Label active={!isJapanese}>🇬🇧</Label>
        <Label active={isJapanese}>🇯🇵</Label>
      </LabelContainer>
    </SwitchRoot>
  );
};

export default LanguageSwitch;
