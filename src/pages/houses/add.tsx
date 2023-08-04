import { useCallback, useEffect, useState } from 'react';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import { Avatar, Box, Chip, Container, Link, Stack, SvgIcon, Typography } from '@mui/material';
import { customersApi } from 'src/api/customers';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { CustomerEditForm } from 'src/sections/dashboard/customer/customer-edit-form';
import type { Customer } from 'src/types/customer';
import type { Page as PageType } from 'src/types/page';
import { getInitials } from 'src/utils/get-initials';
import { t } from 'i18next';
import { tokens } from 'src/locales/tokens';
import { PropertyHookForm } from 'src/sections/dashboard/houses/houses-add-property-form';

const Page: PageType = () => {

  usePageView();

  return (
    <>
      <Seo title={t(tokens.houses.add).toString()} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <PropertyHookForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
