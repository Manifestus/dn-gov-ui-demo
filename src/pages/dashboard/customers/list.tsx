import type { ChangeEvent, MouseEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Download01Icon from "@untitled-ui/icons-react/build/esm/Download01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { customersApi } from "src/api/customers";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { useSelection } from "src/hooks/use-selection";
import { CustomerListSearch } from "src/sections/dashboard/customer/customer-list-search";
import { CustomerListTable } from "src/sections/dashboard/customer/customer-list-table";
import type { Customer } from "src/types/customer";
import type { Page as PageType } from "src/types/page";
import { t } from "i18next";
import { tokens } from "src/locales/tokens";
import { CustomerAddForm } from "src/sections/dashboard/customer/customer-add-form";
import { CustomersQuery } from "src/services/query/CustomerQuery";
import { CustomerList } from "src/sections/dashboard/customer/customer-list";
import { is } from "date-fns/locale";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import { customers2 } from "src/api/customers/data2";

const Page: PageType = () => {

  const [parsedData, setParsedData] = useState<Customer[]>([]);
  const { data, isSuccess } = CustomersQuery();
  useEffect(() => {
    if (isSuccess) {
      if (data && data.length > 0) {
        setParsedData(JSON.parse(data));
        console.log(parsedData);
      }
    }
  }, [isSuccess, data]);

  usePageView();

  return (
    <>
      <Seo title={t(tokens.seo.taxpayerList).toString()} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">
                  {t(tokens.taxpayers.taxPayers)}
                </Typography>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                component={RouterLink}
                href={paths.dashboard.customers.add}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  {t(tokens.taxpayers.add)}
                </Button>
              </Stack>
            </Stack>
            <Card>
              {isSuccess && (<CustomerList customers={parsedData}/>)}
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
