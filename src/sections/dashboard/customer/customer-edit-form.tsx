import type { FC } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
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
  Unstable_Grid2 as Grid
} from '@mui/material';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import type { Customer } from 'src/types/customer';
import { wait } from 'src/utils/wait';
import { t } from 'i18next';
import { tokens } from 'src/locales/tokens';
import { useNavigate } from 'react-router';
import { peopleService } from 'src/services/People.service';

interface CustomerEditFormProps {
  customer: Customer;
}

const baseURL =
  "https://dn-gov-api-demo-5ywbgrw4ia-uc.a.run.app";
  const UserService = peopleService.getInstance(baseURL);

export const CustomerEditForm: FC<CustomerEditFormProps> = (props) => {
  const navigate = useNavigate();
  const { customer, ...other } = props;
  const formik = useFormik({
    initialValues: {
      email: customer.email || '',
      name: customer.name || '',
      submit: null,
      phone: customer.phone || '',
      address: customer.address || '',
      address2: customer.address2 || '',
      country: customer.country || '',
      municipality: customer.municipality || '',
    },
    validationSchema: Yup.object({
      address: Yup.string().max(255),
      address2: Yup.string().max(255),
      country: Yup.string().max(255),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      hasDiscount: Yup.bool(),
      isVerified: Yup.bool(),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      phone: Yup.string().max(15),
      state: Yup.string().max(255)
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        // NOTE: Make API request
        await wait(500);
        UserService.patchPerson(customer.id, values);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success('Customer updated');
        navigate(paths.dashboard.customers.details, { state: { customer: customer } })
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...other}
    >
      <Card>
        <CardHeader title={t(tokens.taxpayers.editTaxPayer)} />
        <CardContent sx={{ pt: 0 }}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label={t(tokens.taxpayers.fullName)}
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label={t(tokens.taxpayers.email)}
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.email}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label={t(tokens.taxpayers.phone)}
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.phone}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.address && formik.errors.address)}
                fullWidth
                helperText={formik.touched.address && formik.errors.address}
                label={t(tokens.taxpayers.address1)}
                name="address1"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.address}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.address2 && formik.errors.address2)}
                fullWidth
                helperText={formik.touched.address2 && formik.errors.address2}
                label={t(tokens.taxpayers.address2)}
                name="address2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.address2}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.country && formik.errors.country)}
                fullWidth
                helperText={formik.touched.country && formik.errors.country}
                label={t(tokens.taxpayers.country)}
                name="address2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.country}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.municipality && formik.errors.municipality)}
                fullWidth
                helperText={formik.touched.municipality && formik.errors.municipality}
                label={t(tokens.taxpayers.municipality)}
                name="address2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.municipality}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row'
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            {t(tokens.taxpayers.update)}
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            disabled={formik.isSubmitting}
            href={paths.dashboard.customers.index}
          >
            {t(tokens.taxpayers.cancel)}
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

CustomerEditForm.propTypes = {
  // @ts-ignore
  customer: PropTypes.object.isRequired
};
