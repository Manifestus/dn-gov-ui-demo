import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardHeader } from '@mui/material';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import { tokens } from 'src/locales/tokens';
import { t } from 'i18next';

interface CustomerBasicDetailsProps {
  address1?: string;
  address2?: string;
  country?: string;
  email: string;
  phone?: string;
  state?: string;
}

export const CustomerBasicDetails: FC<CustomerBasicDetailsProps> = (props) => {
  const { address1, address2, country, email, phone, state, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader title="Basic Details" />
      <PropertyList>
        <PropertyListItem
          divider
          label={t(tokens.taxpayers.email)}
          value={email}
        />
        <PropertyListItem
          divider
          label={t(tokens.taxpayers.phone)}
          value={phone}
        />
        <PropertyListItem
          divider
          label={t(tokens.taxpayers.country)}
          value={country}
        />
        <PropertyListItem
          divider
          label={t(tokens.taxpayers.municipality)}
          value={state}
        />
        <PropertyListItem
          divider
          label={t(tokens.taxpayers.address1)}
          value={address1}
        />
        <PropertyListItem
          divider
          label={t(tokens.taxpayers.address2)}
          value={address2}
        />
      </PropertyList>
      <CardActions>
        <Button
          color="inherit"
          size="small"
        >
          {t(tokens.taxpayers.resetPassword)}
        </Button>
      </CardActions>
    </Card>
  );
};

CustomerBasicDetails.propTypes = {
  address1: PropTypes.string,
  address2: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string,
  state: PropTypes.string
};
