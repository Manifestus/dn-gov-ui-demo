import React, { FC, useState } from "react";
import { Houses } from "src/types/house";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  CardHeader,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import { tokens } from "src/locales/tokens";
import { houseEnum } from "src/types/house-enum";
import { FormGenerator } from "./form/FormGenerator";
import { FileUploader } from "./file-uploader";
import { useDialog } from "src/hooks/use-dialog";
import { houseService } from "src/services/House.service";
import toast from "react-hot-toast";
import { wait } from "src/utils/wait";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { houseDataParser } from "./house-drawer/house-dataparser";
import { useNavigate } from "react-router";
import { paths } from "src/paths";

interface IProps {
  house?: Houses;
}

/**
 * @author
 * @function @PropertyHookForm
 **/

const baseURL = "https://dn-gov-api-demo-5ywbgrw4ia-uc.a.run.app";
const photoBaseURL =
  "https://storage.cloud.google.com/dn-gov-perulapia-bucket/propertyphoto/";
const HouseService = houseService.getInstance(baseURL);

export const PropertyHookForm: FC<IProps> = (props) => {
  const [fileName, setFileName] = useState("");
  const uploadDialog = useDialog();
  const { house } = props;
  const methods = useForm();
  const nav = useNavigate();
  const onSubmit = async (data: any) => {
    try {
      data.property_picture = `${photoBaseURL}${fileName}`;
      house
        ? HouseService.patchHouse(house.id, houseDataParser(data))
        : HouseService.postHouse(houseDataParser(data))
            .then((res) => {
              house
                ? toast.success("Propiedad editada exitosamente!")
                : toast.success("Propiedad agregada exitosamente!");
            })
            .catch((err) => {
              house
                ? toast.error("Propiedad no fue editada! error: ", err)
                : toast.error("Propiedad no fue registrada! error: ", err);
            });
      await wait(2000);
      nav(paths.dashboard.houses.index)
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Card>
            {props.house ? (
              <CardHeader title={t(tokens.taxpayers.edit)} />
            ) : (
              <CardHeader title={t(tokens.taxpayers.add)} />
            )}
            <CardContent sx={{ pt: 1 }}>
              <Card sx={{ mb: 2, pb: 3 }}>
                <CardHeader title={t(tokens.property.owner)} />
                <Grid container spacing={3} sx={{ p: 2 }}>
                  {(
                    Object.keys(houseEnum) as Array<keyof typeof houseEnum>
                  ).map((key, index) => {
                    const data = house ? house[key] : "";
                    if (houseEnum[key] === "owner-info") {
                      return (
                        <>
                          {key === "property_owners_phone_number" ? (
                            <FormGenerator
                              value={key}
                              type={houseEnum[key]}
                              token={t(tokens.property[key])}
                              patternFormat={true}
                              key={`key-${index}`}
                              houseData={data}
                            />
                          ) : (
                            <FormGenerator
                              value={key}
                              type={houseEnum[key]}
                              token={t(tokens.property[key])}
                              key={`key-${index}`}
                              houseData={data}
                            />
                          )}
                        </>
                      );
                    }
                  })}
                </Grid>
              </Card>
              <Card sx={{ mb: 2, pb: 3 }}>
                <CardHeader title={t(tokens.property.propertyInfo)} />
                <Grid container spacing={3} sx={{ p: 2 }}>
                  {(
                    Object.keys(houseEnum) as Array<keyof typeof houseEnum>
                  ).map((key, index) => {
                    const data = house ? house[key] : "";
                    if (houseEnum[key] === "property-info") {
                      return (
                        <>
                          <FormGenerator
                            value={key}
                            type={houseEnum[key]}
                            token={t(tokens.property[key])}
                            key={`key-${index}`}
                            houseData={data}
                          />
                        </>
                      );
                    }
                  })}
                </Grid>
              </Card>
              <Card sx={{ mb: 2, pb: 3 }}>
                <CardHeader title={t(tokens.property.paving)} />
                <Grid container spacing={3} sx={{ p: 2 }}>
                  {(
                    Object.keys(houseEnum) as Array<keyof typeof houseEnum>
                  ).map((key, index) => {
                    const data = house ? house[key] : "";
                    if (houseEnum[key] === "property-pavement") {
                      return (
                        <>
                          <FormGenerator
                            value={key}
                            type={houseEnum[key]}
                            token={t(tokens.property[key])}
                            key={`key-${index}`}
                            houseData={data}
                          />
                        </>
                      );
                    }
                  })}
                </Grid>
              </Card>
              <Card sx={{ mb: 2, pb: 3 }}>
                <CardHeader title={t(tokens.property.streets)} />
                <Grid container spacing={3} sx={{ p: 2 }}>
                  {(
                    Object.keys(houseEnum) as Array<keyof typeof houseEnum>
                  ).map((key, index) => {
                    const data = house ? house[key] : "";
                    if (houseEnum[key] === "property-street") {
                      return (
                        <>
                          <FormGenerator
                            value={key}
                            type={houseEnum[key]}
                            token={t(tokens.property[key])}
                            key={`key-${index}`}
                            houseData={data}
                          />
                        </>
                      );
                    }
                  })}
                </Grid>
              </Card>
              <Card sx={{ mb: 2, pb: 3 }}>
                <CardHeader title={t(tokens.property.dirtStreets)} />
                <Grid container spacing={3} sx={{ p: 2 }}>
                  {(
                    Object.keys(houseEnum) as Array<keyof typeof houseEnum>
                  ).map((key, index) => {
                    const data = house ? house[key] : "";
                    if (houseEnum[key] === "property-dirt") {
                      return (
                        <FormGenerator
                          value={key}
                          type={houseEnum[key]}
                          token={t(tokens.property[key])}
                          key={`key-${index}`}
                          houseData={data}
                        />
                      );
                    }
                  })}
                </Grid>
              </Card>
              <Card sx={{ pb: 2 }}>
                <CardHeader
                  title={t(tokens.property.property_value_according_deeds)}
                />
                <Grid container spacing={3} sx={{ p: 2 }}>
                  {(
                    Object.keys(houseEnum) as Array<keyof typeof houseEnum>
                  ).map((key, index) => {
                    const data = house ? house[key] : "";
                    if (houseEnum[key] === "property-value") {
                      return (
                        <FormGenerator
                          value={key}
                          type={houseEnum[key]}
                          token={t(tokens.property[key])}
                          numericFormat={true}
                          key={`key-${index}`}
                          houseData={data}
                        />
                      );
                    }
                  })}
                </Grid>
              </Card>
            </CardContent>
          </Card>
          <Card sx={{ mt: 2 }}>
            <Accordion TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="optional-property"
              >
                <Typography>{t(tokens.property.optional)}</Typography>
              </AccordionSummary>
              <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="services-services"
                  sx={{ pl: 3, pr: 3 }}
                >
                  <Typography>{t(tokens.property.services)}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ width: "100%", pl: 3, pr: 3 }}>
                  <Card sx={{ pb: 2 }}>
                    <Grid container spacing={3} sx={{ p: 2 }}>
                      {(
                        Object.keys(houseEnum) as Array<keyof typeof houseEnum>
                      ).map((key, index) => {
                        const data = house ? house[key] : "";
                        if (houseEnum[key] === "property-services") {
                          return (
                            <FormGenerator
                              value={key}
                              type={houseEnum[key]}
                              token={t(tokens.property[key])}
                              key={`key-${index}`}
                              optional={true}
                              houseData={data}
                            />
                          );
                        }
                      })}
                    </Grid>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="services-tax"
                  sx={{ pl: 3, pr: 3 }}
                >
                  <Typography>{t(tokens.property.taxes)}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ width: "100%", pl: 3, pr: 3 }}>
                  <Card sx={{ pb: 2 }}>
                    <Grid container spacing={3} sx={{ p: 2 }}>
                      {(
                        Object.keys(houseEnum) as Array<keyof typeof houseEnum>
                      ).map((key, index) => {
                        const data = house ? house[key] : "";
                        if (houseEnum[key] === "property-tax") {
                          return (
                            <FormGenerator
                              value={key}
                              type={houseEnum[key]}
                              token={t(tokens.property[key])}
                              key={`key-${index}`}
                              numericFormat={true}
                              optional={true}
                              houseData={data}
                            />
                          );
                        }
                      })}
                    </Grid>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="services-weather"
                  sx={{ pl: 3, pr: 3 }}
                >
                  <Typography>{t(tokens.property.weather)}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ width: "100%", pl: 3, pr: 3 }}>
                  <Card sx={{ pb: 2 }}>
                    <Grid container spacing={3} sx={{ p: 2 }}>
                      {(
                        Object.keys(houseEnum) as Array<keyof typeof houseEnum>
                      ).map((key, index) => {
                        const data = house ? house[key] : "";
                        if (houseEnum[key] === "property-weather") {
                          return (
                            <FormGenerator
                              value={key}
                              type={houseEnum[key]}
                              token={t(tokens.property[key])}
                              key={`key-${index}`}
                              optional={true}
                              houseData={data}
                            />
                          );
                        }
                      })}
                    </Grid>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="services-dev"
                  sx={{ pl: 3, pr: 3 }}
                >
                  <Typography>{t(tokens.property.development)}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ width: "100%", pl: 3, pr: 3 }}>
                  <Card sx={{ pb: 2 }}>
                    <Grid container spacing={3} sx={{ p: 2 }}>
                      {(
                        Object.keys(houseEnum) as Array<keyof typeof houseEnum>
                      ).map((key, index) => {
                        const data = house ? house[key] : "";
                        if (houseEnum[key] === "property-dev") {
                          return (
                            <FormGenerator
                              value={key}
                              type={houseEnum[key]}
                              token={t(tokens.property[key])}
                              key={`key-${index}`}
                              optional={true}
                              houseData={data}
                            />
                          );
                        }
                      })}
                    </Grid>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="services-safety"
                  sx={{ pl: 3, pr: 3 }}
                >
                  <Typography>{t(tokens.property.safety)}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ width: "100%", pl: 3, pr: 3 }}>
                  <Card sx={{ pb: 2 }}>
                    <Grid container spacing={3} sx={{ p: 2 }}>
                      {(
                        Object.keys(houseEnum) as Array<keyof typeof houseEnum>
                      ).map((key, index) => {
                        const data = house ? house[key] : "";
                        if (houseEnum[key] === "property-safety") {
                          return (
                            <FormGenerator
                              value={key}
                              type={houseEnum[key]}
                              token={t(tokens.property[key])}
                              key={`key-${index}`}
                              optional={true}
                              houseData={data}
                            />
                          );
                        }
                      })}
                    </Grid>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="services-prox"
                  sx={{ pl: 3, pr: 3 }}
                >
                  <Typography>{t(tokens.property.proximity)}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ width: "100%", pl: 3, pr: 3 }}>
                  <Card sx={{ pb: 2 }}>
                    <Grid container spacing={3} sx={{ p: 2 }}>
                      {(
                        Object.keys(houseEnum) as Array<keyof typeof houseEnum>
                      ).map((key, index) => {
                        const data = house ? house[key] : "";
                        if (houseEnum[key] === "property-prox") {
                          return (
                            <FormGenerator
                              value={key}
                              type={houseEnum[key]}
                              token={t(tokens.property[key])}
                              key={`key-${index}`}
                              optional={true}
                              houseData={data}
                            />
                          );
                        }
                      })}
                    </Grid>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="services-commercial"
                  sx={{ pl: 3, pr: 3 }}
                >
                  <Typography>{t(tokens.property.commercial)}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ width: "100%", pl: 3, pr: 3 }}>
                  <Card sx={{ pb: 2 }}>
                    <Grid container spacing={3} sx={{ p: 2 }}>
                      {(
                        Object.keys(houseEnum) as Array<keyof typeof houseEnum>
                      ).map((key, index) => {
                        const data = house ? house[key] : "";
                        if (houseEnum[key] === "property-commercial") {
                          return (
                            <FormGenerator
                              value={key}
                              type={houseEnum[key]}
                              token={t(tokens.property[key])}
                              key={`key-${index}`}
                              optional={true}
                              houseData={data}
                            />
                          );
                        }
                      })}
                    </Grid>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="services-prov"
                  sx={{ pl: 3, pr: 3 }}
                >
                  <Typography>{t(tokens.property.provisional)}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ width: "100%", pl: 3, pr: 3 }}>
                  <Card sx={{ pb: 2 }}>
                    <Grid container spacing={3} sx={{ p: 2 }}>
                      {(
                        Object.keys(houseEnum) as Array<keyof typeof houseEnum>
                      ).map((key, index) => {
                        const data = house ? house[key] : "";
                        if (houseEnum[key] === "property-prov") {
                          return (
                            <FormGenerator
                              value={key}
                              type={houseEnum[key]}
                              token={t(tokens.property[key])}
                              key={`key-${index}`}
                              optional={true}
                              houseData={data}
                            />
                          );
                        }
                      })}
                    </Grid>
                  </Card>
                </AccordionDetails>
              </Accordion>
            </Accordion>
          </Card>
          <FileUploader
            onClose={uploadDialog.handleClose}
            open={uploadDialog.open}
            id={"photo"}
            fileName={setFileName}
          />
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            justifyContent={"flex-end"}
            flexWrap="wrap"
            spacing={3}
            sx={{ p: 3 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={uploadDialog.handleOpen}
            >
              {t(tokens.property.property_picture)}
            </Button>
            <Button type="submit" variant="contained">
              {house ? t(tokens.taxpayers.edit) : t(tokens.taxpayers.add)}
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </>
  );
};
