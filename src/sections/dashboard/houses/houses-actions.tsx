import {
  Box,
  Button,
  Divider,
  Unstable_Grid2 as Grid,
  SvgIcon,
} from "@mui/material";
import { t, use } from "i18next";
import React, { FC } from "react";
import { tokens } from "src/locales/tokens";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import { Houses } from "src/types/house";
import { useLocation, useNavigate } from "react-router";
import { paths } from "src/paths";
import { HouseCalculator } from "./house-calculator";

interface IProps {
  house: Houses;
}

/**
 * @author
 * @function @houseActions
 **/

export const HouseActions: FC<IProps> = (props) => {
  const navigate = useNavigate();
  const { house } = props;
  return (
    <>
      <Box
        display="flex"
        sx={{
          flexGrow: 1,
          py: "8",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "2",
        }}
      >
        <Box mb={5}>
          <Button
            startIcon={
              <SvgIcon>
                <PlusIcon />
              </SvgIcon>
            }
            variant="contained"
            onClick={() => {
              navigate(paths.dashboard.houses.edit, {
                state: { house: house },
              });
            }}
          >
            {t(tokens.houses.edit)}
          </Button>
        </Box>
        <Divider />
        <Box
          display="flex"
          sx={{
            flexGrow: 1,
            py: "8",
            justifyContent: "center",
            alignItems: "center",
            gap: "2",
          }}
        >
          <HouseCalculator house={house} />
        </Box>
      </Box>
    </>
  );
};
