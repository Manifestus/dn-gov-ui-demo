import type { FC } from 'react';
import type { Theme } from '@mui/material';
import { Button, Card, CardActions, CardHeader, Divider, useMediaQuery } from '@mui/material';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import { t } from 'i18next';
import { tokens } from 'src/locales/tokens';

export const CustomerPayment: FC = (props) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const align = mdUp ? 'horizontal' : 'vertical';

  return (
    <Card {...props}>
      <CardHeader title="Payment" />
      <PropertyList>
        <PropertyListItem
          align={align}
          divider
          label={t(tokens.taxpayers.creditCard)}
          value="**** **** **** **** 4142"
        />
        <PropertyListItem
          align={align}
          divider
          label={t(tokens.taxpayers.paid)}
          value="2 ($50.00)"
        />
        <PropertyListItem
          align={align}
          divider
          label={t(tokens.taxpayers.draft)}
          value="1 ($5.00)"
        />
        <PropertyListItem
          align={align}
          divider
          label={t(tokens.taxpayers.municipality)}
          value="2 ($50.00)"
        />
        <PropertyListItem
          align={align}
          divider
          label={t(tokens.taxpayers.unpaid_due)}
          value="1 ($12.00)"
        />
        <PropertyListItem
          align={align}
          divider
          label={t(tokens.taxpayers.refunded)}
          value="0 ($0.00)"
        />
      </PropertyList>
      <Divider />
      <CardActions sx={{ flexWrap: 'wrap' }}>
        <Button
          size="small"
          variant="outlined"
        >
          {t(tokens.taxpayers.createInvoice)}
        </Button>
        <Button size="small">
        {t(tokens.taxpayers.resendDueInvoices)}
        </Button>
      </CardActions>
    </Card>
  );
};
