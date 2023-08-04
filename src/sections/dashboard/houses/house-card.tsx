import {
  Box,
  Card,
  Divider,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Houses } from "src/types/house";
import { ImgHouse } from "src/components/houses-image";
import { t } from "i18next";
import { tokens } from "src/locales/tokens";
import MapIcon from "@mui/icons-material/Map";
import { useNavigate } from "react-router";
import { paths } from "src/paths";
import { DocumentQuery } from "src/services/query/DocumentQuery";
import { FileData } from "src/types/file-data";

interface IProps {
  house: Houses;
}

/**
 * @author
 * @function @HouseCard
 **/

export const HouseCard: FC<IProps> = (props) => {
  const navigate = useNavigate();
    
  return (
    <Card
      key={props.house.id}
      sx={{
        backgroundColor: "transparent",
        boxShadow: 0,
        transition: (theme) =>
          theme.transitions.create(["background-color, box-shadow"], {
            easing: theme.transitions.easing.easeInOut,
            duration: 200,
          }),
        "&:hover": {
          backgroundColor: "background.paper",
          boxShadow: 16,
        },
      }}
      variant="outlined"
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            mb: 1,
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              navigate(paths.dashboard.houses.details, {
                state: { house: props.house },
              });
            }}
          >
            <ImgHouse url={props.house.property_picture} id={props.house.id} />
          </Box>
        </Box>
        <Typography color="text.primary" variant="h5">
          {"Propietario: " + props.house.owners_name_national_registry}
        </Typography>
        <Typography sx={{ cursor: "pointer" }} variant="subtitle1">
          {"Cadastral ID: " +
            props.house.cadastral_id_number_from_national_registry}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={1}
        >
          <Typography color="text.secondary" variant="body1">
            {"Dirección: " + props.house.property_address_national_registry}
          </Typography>
          <Typography color="text.secondary" variant="body1">
            {"RTN: " + props.house.property_id_number_national_registry}
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={1}
        >
          <Typography color="text.secondary" variant="caption">
            {t(tokens.houses.createdAt2)} {props.house.createdAt}
          </Typography>

          <IconButton>
            <SvgIcon fontSize="small">
              <MapIcon />
            </SvgIcon>
            <Typography color="text.secondary" variant="caption">
              {"Mapa: " + props.house.property_address_national_registry}
            </Typography>
          </IconButton>
        </Stack>
      </Box>
    </Card>
  );
};
