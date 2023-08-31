import type { ChangeEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Link,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { customersApi } from "src/api/customers";
import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { paths } from "src/paths";
import { CustomerBasicDetails } from "src/sections/dashboard/customer/customer-basic-details";
import { CustomerDataManagement } from "src/sections/dashboard/customer/customer-data-management";
import { CustomerEmailsSummary } from "src/sections/dashboard/customer/customer-emails-summary";
import { CustomerInvoices } from "src/sections/dashboard/customer/customer-invoices";
import { CustomerPayment } from "src/sections/dashboard/customer/customer-payment";
import { Customer, CustomerInvoice, CustomerLog } from "src/types/customer";
import type { Page as PageType } from "src/types/page";
import { t } from "i18next";
import { tokens } from "src/locales/tokens";
import { useLocation, useNavigate } from "react-router";

const tabs = [
  { label: "Detalles", value: "details" },
  { label: "Facturas", value: "invoices" },
];

const useInvoices = (): CustomerInvoice[] => {
  const isMounted = useMounted();
  const [invoices, setInvoices] = useState<CustomerInvoice[]>([]);

  const handleInvoicesGet = useCallback(async () => {
    try {
      const response = await customersApi.getInvoices();
      if (isMounted()) {
        setInvoices(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleInvoicesGet();
    },
    // eslint-disable-next-line
    []
  );

  return invoices;
};

const useLogs = (): CustomerLog[] => {
  const isMounted = useMounted();
  const [logs, setLogs] = useState<CustomerLog[]>([]);

  const handleLogsGet = useCallback(async () => {
    try {
      // const response = await customersApi.getLogs();
      // if (isMounted()) {
      //   setLogs(response);
      // }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleLogsGet();
    },
    // eslint-disable-next-line
    []
  );

  return logs;
};

const Page: PageType = () => {
  const [currentTab, setCurrentTab] = useState<string>("details");
  const { state } = useLocation();
  const { customer } = state;
  const navigate = useNavigate();
  const invoices = useInvoices();
  const logs = useLogs();
  let cx: Customer = { id: "", name: "", email: "", phone: "", municipality: "", address: "", address2: "", country: "", user_cnr_id: ""};

  if (customer) {
    cx = customer;
  }
  
  usePageView();

  const handleTabsChange = useCallback(
    (event: ChangeEvent<{}>, value: string): void => {
      setCurrentTab(value);
    },
    []
  );

  if (!customer) {
    return null;
  }

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
        <Container maxWidth="xl">
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
              <Typography variant="h4">{customer.name}</Typography>
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
                    <Typography variant="h5">{customer.email}</Typography>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Typography variant="subtitle2">user_id:</Typography>
                      <Chip label={customer.id} size="small" />
                      {customer.token !== null && (
                        <>
                          <Typography variant="subtitle2">token:</Typography>
                          <Chip label={customer.token} size="small" />
                        </>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Button
                    color="inherit"
                    onClick={() => { navigate(paths.dashboard.customers.edit, { state: { customer: customer } })}}
                    endIcon={
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    }
                    
                  >
                    {t(tokens.taxpayers.edit)}
                  </Button>
                  <Button
                    endIcon={
                      <SvgIcon>
                        <ChevronDownIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    {t(tokens.taxpayers.actions)}
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Tabs
                  indicatorColor="primary"
                  onChange={handleTabsChange}
                  scrollButtons="auto"
                  sx={{ mt: 3 }}
                  textColor="primary"
                  value={currentTab}
                  variant="scrollable"
                >
                  {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </Tabs>
                <Divider />
              </div>
            </Stack>
            {currentTab === "details" && (
              <div>
                <Grid container spacing={4}>
                  <Grid xs={12} lg={4}>
                    <CustomerBasicDetails
                      email={customer.email}
                      address1={customer.address}
                      address2={customer.address2}
                      country={customer.country}
                      phone={customer.phone}
                      state={customer.municipality}
                    />
                  </Grid>
                  <Grid xs={12} lg={8}>
                    <Stack spacing={4}>
                      <CustomerPayment user={cx}/>
                      <CustomerEmailsSummary />
                      {/* <CustomerDataManagement /> */}
                    </Stack>
                  </Grid>
                </Grid>
              </div>
            )}
            {currentTab === "invoices" && (
              <CustomerInvoices invoices={invoices} id={customer.id} />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
