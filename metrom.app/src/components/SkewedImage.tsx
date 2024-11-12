import { Box, Stack } from "@mui/system";
import { useEffect, useRef, useState } from "react";

interface SkewedImageProps {
  startAngle: number;
  finalAngle: number;
  lock: boolean;
  imageUrl: string;
  text?: string;
  alt?: string;
  borderRadius?: number;
}

const finalShadow = 6;
const startShadow = 20;
const SkewedImage: React.FC<SkewedImageProps> = ({
  startAngle,
  finalAngle,
  lock,
  imageUrl,
  text,
  alt = "",
  borderRadius = 5,
}) => {
  const [rotation, setRotation] = useState(startAngle);
  const [dropShadow, setDropShadow] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      const element = imageRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate when the element is in the center of the viewport
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;

      // Calculate progress (-1 to 1) with 0 being centered
      let progress = (viewportCenter - elementCenter) / (windowHeight / 2);

      // Clamp progress between -1 and 1
      progress = Math.max(-1, Math.min(0, progress)) * -1;

      if (lock && progress < 0) {
        setRotation(finalAngle);
        setDropShadow(startShadow);
      } else {
        const currentRotation =
          finalAngle + progress * (startAngle - finalAngle);
        setRotation(currentRotation);
        const currentDropShadow =
          finalShadow + progress * (startShadow - finalShadow);
        setDropShadow(currentDropShadow);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [startAngle, finalAngle, lock]);

  return (
    <Box
      className="skewed-image"
      ref={imageRef}
      sx={{
        position: "relative",
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.1s ease-out",
        filter: `drop-shadow(${dropShadow}px ${dropShadow}px 1px rgba(0, 0, 0, 0.8))`,
      }}>
      <img src={imageUrl} alt={alt} style={{ width: "100%", borderRadius }} />
      {text && (
        <Stack
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            fontSize: "1.2rem",
            fontWeight: "500",
            width: "100%",
            height: "100%",
            filter: `drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.8))`,
          }}
          justifyContent={"center"}
          alignItems={"center"}>
          {text}
        </Stack>
      )}
    </Box>
  );
};

export default SkewedImage;
