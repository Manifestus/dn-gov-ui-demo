import { useState, type FC, useEffect, Dispatch, SetStateAction } from "react";
import {
  Card,
  CardHeader,
  Divider,
  TableBody,
  TableRow,
  TableCell,
  Table,
  Box,
  Tabs,
  Tab,
  Container,
  Unstable_Grid2 as Grid,
  Button,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Houses } from "src/types/house";
import { t } from "i18next";
import { tokens } from "src/locales/tokens";
import React from "react";
import { useSettings } from "src/hooks/use-settings";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import { useDialog } from "src/hooks/use-dialog";
import { FileUploader } from "./file-uploader";
import { FileList } from "./file-list";
import { uploadBucketService } from "src/services/UploadBucket.s3";
import { Files } from "src/types/file";
import { DocumentQuery } from "src/services/query/DocumentQuery";
import { FileData } from "src/types/file-data";
import { HouseActions } from "./houses-actions";

interface HouseDetailProps {
  house: Houses;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <Box
      width="100%"
      justifyContent="center"
      alignItems="center"
      display="flex"
      key={`box-1-${index}`}
    >
      {value === index && (
        <Box
          sx={{
            pt: 3,
            justifyContent: "center",
            maxWidth: "80%",
            minWidth: "60%",
          }}
          key={`box-2-${index}`}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

export const HouseDetail: FC<HouseDetailProps> = (props) => {
  const houseData = props.house;
  const [value, setValue] = React.useState(0);
  const uploadDialog = useDialog();
  const { house } = props;
  const [parsedData, setParsedData] = useState<Files[]>([]);
  const { data, isSuccess } = DocumentQuery(props.house.id);
  useEffect(() => {
    if (isSuccess) {
      if (data && data.length > 0) {
        setParsedData(JSON.parse(data));
      }

      window.scrollTo(0, 0);
    }
  }, [isSuccess, data]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          variant="fullWidth"
          key={"tabs"}
        >
          <Tab label="Propiedad" key={"propiedad"} sx={{ fontWeight: "700" }} />
          <Tab
            label="Documentos"
            key={"documentos"}
            sx={{ fontWeight: "700" }}
          />
          <Tab label="Acciones" sx={{ fontWeight: '700' }} />
        </Tabs>
        <TabPanel key={"info-property"} value={value} index={0}>
          <CardHeader title="INFORMACION DE LA PROPIEDAD" />
          <Divider />
          <Table>
            <TableBody>
              {Object.keys(houseData).map((key, index) =>
                key !== "isDeleted" ? (
                  <TableRow key={`${index}-tr`}>
                    <TableCell key={`${index}-tc`} style={{ width: 400 }}>
                      {t((tokens.property as any)[key])}
                    </TableCell>
                    <TableCell key={`${index}-tc2`} style={{ width: 400 }}>
                      {(houseData as any)[key]}
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )
              )}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel key={"info-document"} value={value} index={1}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Grid
              container
              spacing={{
                xs: 3,
                lg: 4,
              }}
            >
              <Grid xs={12}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={6}
                >
                  <div>
                    <Typography variant="h4">
                      {t(tokens.fileManager.fileManager)}
                    </Typography>
                  </div>
                  <Stack alignItems="center" direction="row" spacing={2}>
                    <Button
                      onClick={uploadDialog.handleOpen}
                      startIcon={
                        <SvgIcon>
                          <PlusIcon />
                        </SvgIcon>
                      }
                      variant="contained"
                    >
                      {t(tokens.fileManager.upload)}
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
              <Divider />
              {isSuccess ? (
                <FileList files={parsedData} id={props.house.id} />
              ) : (
                <></>
              )}
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel key={"info-actions"} value={value} index={2}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <HouseActions house={house} />
          </Box>
        </TabPanel>
      </Box>
      <FileUploader
        onClose={uploadDialog.handleClose}
        open={uploadDialog.open}
        id={houseData.id}
      />
    </Card>
  );
};
