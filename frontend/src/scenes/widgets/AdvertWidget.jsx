import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween.jsx";
import WidgetWrapper from "../components/WidgetWrapper.jsx";


const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}></Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="./assets/cat.png"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Get Your Nike Shoes</Typography>
        <Typography color={medium}>Nike.com.vn</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        NIKE JUST DO IT!
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
