import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import { PaymentItem } from "./customer-payment-item";
import { Customer } from "src/types/customer";

interface IProps {
  onClose?: () => void;
  open?: boolean;
  user: Customer;
}

/**
 * @author
 * @function @PaymentDialog
 **/

export const PaymentDialog: FC<IProps> = (props) => {
  const { onClose, open = false, user } = props;
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={3}
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Pago</Typography>
        <IconButton color="inherit" onClick={onClose}>
          <SvgIcon>
            <XIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <DialogContent>
        <PaymentItem user={user} onClose={onClose}/>
      </DialogContent>
    </Dialog>
  );
};
