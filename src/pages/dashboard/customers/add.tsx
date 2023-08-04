import { Box, Container, Stack } from "@mui/material";
import { t } from "i18next";
import { Seo } from "src/components/seo";
import { usePageView } from "src/hooks/use-page-view";
import { tokens } from "src/locales/tokens";
import { CustomerAddForm } from "src/sections/dashboard/customer/customer-add-form";
import type { Page as PageType } from "src/types/page";

const Page: PageType = () => {
  usePageView();

  return (
    <>
      <Seo title={t(tokens.seo.taxpayerEdit).toString()} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <CustomerAddForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
