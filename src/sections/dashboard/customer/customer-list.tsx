import {
  Box,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import { t } from "i18next";
import React, { FC } from "react";
import { RouterLink } from "src/components/router-link";
import { Scrollbar } from "src/components/scrollbar";
import { tokens } from "src/locales/tokens";
import { paths } from "src/paths";
import { Customer } from "src/types/customer";
import { useNavigate } from "react-router";

interface IProps {
  customers: Customer[];
}

/**
 * @author
 * @function @CustomerList
 **/

export const CustomerList: FC<IProps> = (props) => {
  const { customers } = props;
  const navigate = useNavigate();
  return (
    <Scrollbar>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell>{t(tokens.taxpayers.name)}</TableCell>
            <TableCell>{t(tokens.taxpayers.location)}</TableCell>
            <TableCell>{t(tokens.taxpayers.email)}</TableCell>
            <TableCell>{t(tokens.taxpayers.phone)}</TableCell>
            <TableCell>{t(tokens.taxpayers.actions)}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow>
              <TableCell>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <div>
                    <Link
                      color="inherit"
                      component={RouterLink}
                      href={paths.dashboard.customers.details}
                      variant="subtitle2"
                    >
                      {customer.name}
                    </Link>
                    <Typography color="text.secondary" variant="body2">
                      {customer.email}
                    </Typography>
                  </div>
                </Stack>
              </TableCell>
              <TableCell align="left">
                <Typography color="text.secondary" variant="body2">
                  {customer.address2 !== null
                    ? `${customer.country}, ${customer.municipality}, ${customer.address}, ${customer.address2}`
                    : `${customer.address}`}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >{`${customer.email}`}</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.secondary" variant="body2">
                    {customer.phone}
                </Typography>
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => {
                    navigate(paths.dashboard.customers.add, {
                      state: { customer: customer },
                    });
                  }}
                >
                  <SvgIcon>
                    <Edit02Icon />
                  </SvgIcon>
                </IconButton>
                <IconButton
                  onClick={() => {
                    navigate(paths.dashboard.customers.details, {
                      state: { customer },
                    });
                  }}
                >
                  <SvgIcon>
                    <ArrowRightIcon />
                  </SvgIcon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Scrollbar>
  );
};
