import { Box, Container, Stack } from "@mui/material";
import { Seo } from "src/components/seo";
import { usePageView } from "src/hooks/use-page-view";
import type { Page as PageType } from "src/types/page";
import { t } from "i18next";
import { tokens } from "src/locales/tokens";
import { useLocation } from "react-router";
import { HouseDetail } from "src/sections/dashboard/houses/houses-detail";
import { DocumentQuery } from "src/services/query/DocumentQuery";
import { FileData } from "src/types/file-data";

const Page: PageType = () => {
  const { state } = useLocation();
  const { house } = state;

  usePageView();

  return (
    <>
      <Seo title={t(tokens.seo.taxpayerDetails).toString()} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <HouseDetail house={house} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
