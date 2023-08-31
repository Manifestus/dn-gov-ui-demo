import type { FC } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import numeral from "numeral";
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Logo } from "src/components/logo";
import type { Invoice } from "src/types/invoice";
import { Houses } from "src/types/house";
import { houseService } from "src/services/House.service";
import { Transaction } from "src/types/transaction";
import { Customer } from "src/types/customer";
import { LogoSBP } from "src/components/logos/logo-sbp";

interface InvoicePreviewProps {
  invoice: Invoice;
}

export const InvoicePreview: FC<InvoicePreviewProps> = (props) => {
  const { invoice, ...other } = props;

  const invoiceV2: Invoice = invoice as unknown as Invoice;
  const property: Houses = invoice.property as unknown as Houses;
  const user: Customer = invoice.user as unknown as Customer;
  const transaction: Transaction =
    invoice.transaction as unknown as Transaction;

  const issueDate =
    invoice.issueDate && format(new Date(invoice.issueDate), "dd MMM yyyy");
  const subtotalAmount = numeral(invoiceV2.subtotalAmount).format(
    `${invoice.currency}0,0.00`
  );
  const taxAmount = numeral(invoice.taxAmount).format(
    `${invoice.currency}0,0.00`
  );
  const totalAmount = numeral(invoice.totalAmount).format(
    `${invoice.currency}0,0.00`
  );

  return (
    <Card {...other} sx={{ p: 6 }}>
      <Stack
        alignItems="flex-start"
        direction="row"
        justifyContent="space-between"
        spacing={3}
      >
        <div>
          <Box
            sx={{
              display: "inline-flex",
              height: 50,
              width: 80,
            }}
          >
            <LogoSBP />
          </Box>
          <Typography variant="subtitle2">
            San Bartolome de Perulapia
          </Typography>
        </div>
        <div>
          <Typography
            align="right"
            color={invoice.status === "paid" ? "success.main" : "error.main"}
            variant="h4"
          >
            {invoice.status === "paid" ? "PAGADO" : "CANCELADO"}
          </Typography>
          <Typography align="right" variant="subtitle2"></Typography>
        </div>
      </Stack>
      <Box sx={{ mt: 4 }}>
        <Grid container justifyContent="space-between">
          <Grid xs={12} md={4}>
            <Typography gutterBottom variant="h5">
              Propiedad a Pagar
            </Typography>
            <Typography variant="body2">
              {property?.property_address_record?.split(",")[0]}
              <br />
              {property?.property_address_record?.split(",")[1]}
              <br />
              {property?.town}
              <br />
              {property?.state + ", " + "El Salvador"}
            </Typography>
          </Grid>
          <Grid
            container
            xs={12}
            md={4}
            alignItems="center"
            justifyContent="center"
          >
            <Grid>
              <Typography variant="h6">Numero de Referencia</Typography>
              <Typography variant="body2">
                {transaction?.operation_information?.reference}
              </Typography>
            </Grid>
            <Grid>
              <Box sx={{ mt: 4 }}>
                <Typography gutterBottom variant="subtitle2">
                  Dirección de Facturación
                </Typography>
                <Typography variant="body2">
                  {user.address} <br /> {user.municipality} {" , "}{" "}
                  {user.country}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid xs={12} md={4} pt={1}>
            <Typography align="right" variant="h5">
              Datos del Contribuyente
            </Typography>
            <Typography align="right" variant="body2">
              {user.name}
              <br />
              {user.email}
              <br />
              {user.phone}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Grid container justifyContent="space-between">
          <Grid xs={12} md={4}>
            <Typography gutterBottom variant="subtitle2">
              Fecha Transmitida
            </Typography>
            <Typography variant="body2">{issueDate}</Typography>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography gutterBottom variant="h6">
              Datos de la Tarjeta
            </Typography>
            <Typography variant="h5">
              {" **** " + " **** " + transaction.card_information.card_number}
              <br />
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Subtotal</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={"init-row"}>
            <TableCell>{`Numero de Orden: ${invoice.number}`}</TableCell>
            <TableCell>
              <Typography variant="body2">
                {property?.property_address_record?.split(",")[0]}
                <br />
                {property?.property_address_record?.split(",")[1]}
                <br />
                {property?.town}
                <br />
                {property?.state + ", " + "El Salvador"}
              </Typography>
            </TableCell>
            <TableCell>
              {invoice.status === "canceled" ? "Cancelado" : "Aprobado"}
            </TableCell>
            <TableCell>{invoice.subtotalAmount}</TableCell>
            <TableCell align="right">{totalAmount}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={3} sx={{ borderBottom: "none" }} />
            <TableCell sx={{ borderBottom: "none" }}>
              <Typography variant="subtitle1">Subtotal</Typography>
            </TableCell>
            <TableCell align="right" sx={{ borderBottom: "none" }}>
              <Typography variant="subtitle2">
                {"$" + subtotalAmount}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} sx={{ borderBottom: "none" }} />
            <TableCell sx={{ borderBottom: "none" }}>
              <Typography variant="subtitle1">Tasa DelNorte</Typography>
            </TableCell>
            <TableCell align="right" sx={{ borderBottom: "none" }}>
              <Typography variant="subtitle2">{taxAmount}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} sx={{ borderBottom: "none" }} />
            <TableCell sx={{ borderBottom: "none" }}>
              <Typography variant="subtitle1">Total</Typography>
            </TableCell>
            <TableCell align="right" sx={{ borderBottom: "none" }}>
              <Typography variant="subtitle2">{"$" + totalAmount}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Box display="flex" sx={{ mt: 2 }} justifyContent="space-between">
        <Typography gutterBottom variant="h6">
          Notas
        </Typography>
        <Box display="flex" flexDirection="row" gap="10px">
          <Typography color="text.secondary" variant="body2">
            Servicio proporcionado por Delnorte Holdings Inc.
          </Typography>
          <Box
            sx={{
              display: "inline-flex",
              height: 24,
              width: 24,
            }}
          >
            <Logo />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

InvoicePreview.propTypes = {
  // @ts-ignore
  invoice: PropTypes.object.isRequired,
};
