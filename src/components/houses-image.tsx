import React, { FC } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";

interface IProps {
  url: string;
  id: string;
}

/**
 * @author
 * @function @ImgHouse
 **/

export const ImgHouse: FC<IProps> = (props) => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <Box display="flex" m={1}>
      <img
        src={`${props.url}`}
        alt={`${props.id}`}
        style={{
          width: 400,
          height: 350,
          backgroundRepeat: "no-repeat",
          padding: "5px",
          maxWidth: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "5%"
        }}
        loading="lazy"
      ></img>
    </Box>
  );
};
