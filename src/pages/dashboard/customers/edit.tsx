import { useCallback, useEffect, useState } from "react";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { customersApi } from "src/api/customers";
import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { paths } from "src/paths";
import type { Customer } from "src/types/customer";
import type { Page as PageType } from "src/types/page";
import { t } from "i18next";
import { tokens } from "src/locales/tokens";
import { useLocation } from "react-router";
import { CustomerAddForm } from "src/sections/dashboard/customer/customer-add-form";

const useCustomer = (): Customer | null => {
  const isMounted = useMounted();
  const [customer, setCustomer] = useState<Customer | null>(null);

  const handleCustomerGet = useCallback(async () => {
    try {
      const response = await customersApi.getCustomer();

      if (isMounted()) {
        setCustomer(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleCustomerGet();
    },
    // eslint-disable-next-line
    []
  );

  return customer;
};

const Page: PageType = () => {
  const { state } = useLocation();
  const { customer } = state;
  let cx: Customer = { id: "", name: "", email: "", phone: "", municipality: "", address: "", address2: "", country: "", user_cnr_id: ""};
  usePageView();

  if (customer) {
    cx = customer;
  }

  if (!customer) {
    return null;
  }

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
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.customers.index}
                  sx={{
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">
                    {t(tokens.account.title)}
                  </Typography>
                </Link>
              </div>
              <Typography variant="h3">{customer.name}</Typography>
              <Stack
                alignItems="flex-start"
                direction={{
                  xs: "column",
                  md: "row",
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Stack spacing={1}>
                    <Typography variant="h4">{customer.email}</Typography>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Typography variant="subtitle2">user_id:</Typography>
                      <Chip label={customer.id} size="small" />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <CustomerAddForm user={cx} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
