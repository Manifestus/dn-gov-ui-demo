import {
  Box,
  Button,
  Card,
  Container,
  Unstable_Grid2 as Grid,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import { Seo } from "src/components/seo";
import { usePageView } from "src/hooks/use-page-view";
import { useSettings } from "src/hooks/use-settings";
import { tokens } from "src/locales/tokens";
import type { Page as PageType } from "src/types/page";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import { Houses } from "src/types/house";
import { useEffect, useMemo, useState } from "react";
import { HouseQuery } from "src/services/query/HouseQuery";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import Fuse from "fuse.js";
import { HouseList } from "src/sections/dashboard/houses/house-list";

const Page: PageType = () => {
  const settings = useSettings();

  const [parsedData, setParsedData] = useState<Houses[]>([]);
  const { data, isSuccess } = HouseQuery();
  useEffect(() => {
    if (isSuccess) {
      if (data && data.length > 0) {
        setParsedData(JSON.parse(data));
      }
    }
  }, [isSuccess, data]);

  const [storedID, setStoredID] = useState<string>("");
  const [storedCadastralKey, setStoredCadastralKey] = useState<string>("");
  const [storedRTN, setStoredRTN] = useState<string>("");
  const [storedNIS, setStoredNIS] = useState<string>("");
  const [storedMunicipalTaxNumber, setStoredMunicipalTaxNumber] =
    useState<string>("");
  const [storedOwnerFNMunicipality, setStoredOwnerFNMunicipality] = useState<string>("");
  // const [storedOwnerLSMunicipality, setStoredOwnerLSMunicipality] = useState<string>("");


  const fuse = useMemo(
    () =>
      new Fuse(parsedData, {
        keys: [
          "id",
          "cadastral_id_number_from_national_registry",
          "owners_id",
          "id_number_municipal_record",
          "municipal_taxes_account_number",
          "name_on_file_municipal_taxes"
        ],
        ignoreFieldNorm: true,
        useExtendedSearch: true,
        ignoreLocation: true,
        threshold: 0.05,
      }),
    [parsedData]
  );

  const sortData = useMemo(() => {
    let _data = parsedData;

    if (storedID || storedCadastralKey) {
      _data = fuse
        .search({
          $or: [
            { id: storedID },
            { cadastral_id_number_from_national_registry: storedCadastralKey },
            { owners_id: storedRTN },
            { id_number_municipal_record: storedNIS },
            { municipal_taxes_account_number: storedMunicipalTaxNumber },
            { name_on_file_municipal_taxes: storedOwnerFNMunicipality },
            // { name_on_file_municipal_taxes: storedOwnerLSMunicipality },
          ],
        })
        .map((r: any) => r.item);
    }

    return _data;
  }, [fuse, storedID, storedCadastralKey, storedRTN, parsedData]);

  usePageView();

  return (
    <>
      <Seo title={t(tokens.seo.houses).toString()} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : "xl"}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <div>
                  <Typography variant="h4">{t(tokens.houses.title)}</Typography>
                </div>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Button
                    component={RouterLink}
                    href={paths.dashboard.houses.add}
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    {t(tokens.houses.add)}
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} md={12}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                {isSuccess ? (
                  <>
                    <Card>
                      <Stack
                        alignItems="center"
                        direction="row"
                        gap={2}
                        sx={{ p: 2 }}
                      >
                        <Box component="form" sx={{ flexGrow: 1 }}>
                          <OutlinedInput
                            defaultValue=""
                            fullWidth
                            name="itemName"
                            placeholder={t(tokens.houses.search).toString()}
                            onChange={(e) => {
                              setStoredID(e.target.value);
                              setStoredCadastralKey(e.target.value);
                              setStoredRTN(e.target.value);
                              setStoredNIS(e.target.value);
                              setStoredMunicipalTaxNumber(e.target.value);
                              setStoredOwnerFNMunicipality(e.target.value);
                              // setStoredOwnerLSMunicipality(e.target.value);
                            }}
                            startAdornment={
                              <InputAdornment position="start">
                                <SvgIcon>
                                  <SearchMdIcon />
                                </SvgIcon>
                              </InputAdornment>
                            }
                          />
                        </Box>
                      </Stack>
                    </Card>
                    <HouseList fusedData={sortData} />
                  </>
                ) : (
                  <></>
                )}
              </Stack>
            </Grid>
            <Grid xs={12} md={4}></Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
