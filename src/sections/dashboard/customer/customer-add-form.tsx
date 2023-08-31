import type { FC } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Switch,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import type { Customer } from "src/types/customer";
import { wait } from "src/utils/wait";
import { t } from "i18next";
import { tokens } from "src/locales/tokens";
import { peopleService } from "src/services/People.service";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

interface CustomerEditFormProps {
  user?: Customer;
}

export const CustomerAddForm: FC<CustomerEditFormProps> = (props) => {
  const { user } = props;
  const baseURL = "https://dn-gov-api-demo-5ywbgrw4ia-uc.a.run.app";
  const PeopleService = peopleService.getInstance(baseURL);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Customer>();
  console.log(new Date().getDate())
  const nav = useNavigate();
  const onSubmit = async (values: any) => {
    values.id = user?.id;
    try {
      user
        ? PeopleService.patchPerson(values.id, values)
        : PeopleService.postPerson(values)
            .then(() => {
              user
                ? toast.success("Usuario editado/a exitosamente!")
                : toast.success("Usuario agregado/a exitosamente!");
            })
            .catch((err) => {
              user
                ? toast.error("Usuario no fue editado/a! error: ", err)
                : toast.error("Usuario no fue registrada! error: ", err);
            });
      await wait(2000);
      nav(paths.dashboard.customers.index);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        {user ? (
          <CardHeader title={t(tokens.taxpayers.editTaxPayer)} />
        ) : (
          <CardHeader title={t(tokens.taxpayers.addTaxPayer)} />
        )}
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3} sx={{ p: 2 }}>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label={t(tokens.taxpayers.fullName)}
                defaultValue={user?.name}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bottom: "0px",
                }}
                {...register("name", {
                  required: `El Nombre es un requisito!`,
                })}
                required
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label={t(tokens.taxpayers.user_cnr_id)}
                defaultValue={user?.user_cnr_id}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bottom: "0px",
                }}
                {...register("user_cnr_id", {
                  required: `El CNR es un requisito!`,
                })}
                required
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label={t(tokens.taxpayers.email)}
                defaultValue={user?.email}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bottom: "0px",
                }}
                {...register("email", {
                  required: `El Correo es un requisito!`,
                })}
                required
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label={t(tokens.taxpayers.password)}
                defaultValue={user?.password}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bottom: "0px",
                }}
                {...register("password", {
                  required: `La Contraseña es un requisito!`,
                })}
                required
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label={t(tokens.taxpayers.country)}
                defaultValue={user?.country}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bottom: "0px",
                }}
                {...register("country", {
                  required: `El País es un requisito!`,
                })}
                required
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label={t(tokens.taxpayers.municipality)}
                defaultValue={user?.municipality}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bottom: "0px",
                }}
                {...register("municipality", {
                  required: `El Municipio es un requisito!`,
                })}
                required
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label={t(tokens.taxpayers.address1)}
                defaultValue={user?.address}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bottom: "0px",
                }}
                {...register("address", {
                  required: `La Dirección es un requisito!`,
                })}
                required
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label={t(tokens.taxpayers.address2)}
                defaultValue={user?.address2}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bottom: "0px",
                }}
                {...register("address", {
                  required: `La Dirección Adicional es un requisito!`,
                })}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label={t(tokens.taxpayers.phone)}
                defaultValue={user?.phone}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bottom: "0px",
                }}
                {...register("phone", {
                  required: `El Teléfono personal es un requisito!`,
                })}
                required
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label={t(tokens.taxpayers.token)}
                defaultValue={user?.token}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bottom: "0px",
                }}
                {...register("token")}
                name="token"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button type="submit" variant="contained">
            {user ? t(tokens.taxpayers.update) : t(tokens.taxpayers.add)}
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            href={paths.dashboard.customers.index}
          >
            {t(tokens.taxpayers.cancel)}
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

CustomerAddForm.propTypes = {
  // @ts-ignore
  customer: PropTypes.object.isRequired,
};
