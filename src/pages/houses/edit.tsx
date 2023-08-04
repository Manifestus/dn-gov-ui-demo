import { useCallback, useEffect, useState } from "react";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import {
  Box,
  Container,
  Stack,
} from "@mui/material";
import { Seo } from "src/components/seo";
import { usePageView } from "src/hooks/use-page-view";
import type { Page as PageType } from "src/types/page";
import { t } from "i18next";
import { tokens } from "src/locales/tokens";
import { PropertyHookForm } from "src/sections/dashboard/houses/houses-add-property-form";
import { useLocation } from "react-router";

const Page: PageType = () => {
  const { state } = useLocation();
  const { house } = state;
  
  usePageView();

  return (
    <>
      <Seo title={t(tokens.houses.edit).toString()} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <PropertyHookForm house={house}/>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
