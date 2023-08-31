import {
  Box,
  Button,
  Card,
  Divider,
  Unstable_Grid2 as Grid,
  TextField,
} from "@mui/material";
import { t } from "i18next";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { tokens } from "src/locales/tokens";
import { invoiceService } from "src/services/Invoice.service";
import { transactionService } from "src/services/Transaction.service";
import { Customer } from "src/types/customer";
import { Invoice } from "src/types/invoice";
import { Transaction } from "src/types/transaction";
import { wait } from "src/utils/wait";

interface IProps {
  user: Customer;
  onClose?: () => void;
}

/**
 * @author
 * @function @PaymentItem
 **/

export const PaymentItem: FC<IProps> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Transaction>();
  const baseURL = "https://dn-gov-api-demo-5ywbgrw4ia-uc.a.run.app";
  // const baseURL = "http://localhost:3000";
  const TransactionService = transactionService.getInstance(baseURL);
  const InvoiceService = invoiceService.getInstance(baseURL);
  const onSubmit = async (values: any) => {
    values.user_cnr_id = props.user.id;
    values.operation_information.transaction_operation = "M";

    const getPromise = () => {
      return Promise.resolve(TransactionService.postTransaction(values));
    };

    const trx = await getPromise()
      .then((res) => {
        toast.success("Pago Transmitido Correctamente!");
        props.onClose!();
        return res;
      })
      .catch((err) => {
        toast.error("El Pago no pudo ser Aprobado! error: ", err);
      });

    await wait(2000);

    const trxJSON = JSON.parse(trx);
    const message =
      trxJSON.operation_information.message === "REINTENTE TRANSACCION"
        ? "canceled"
        : "paid";

    const invoice = {
      number: values.terminal_information.receipt_number,
      taxAmount: parseFloat(
        (parseFloat(values.operation_information.amount) * 0.02).toFixed(2)
      ),
      subtotalAmount: parseFloat(
        parseFloat(values.operation_information.amount).toFixed(2)
      ),
      totalAmount: parseFloat(
        (
          parseFloat(values.operation_information.amount) +
          parseFloat(values.operation_information.amount) * 0.02
        ).toFixed(2)
      ),
      user: props.user.id,
      property: values.property_id_number_national_registry,
      transaction: trxJSON.id,
      status: message,
      isDeleted: false,
    };

    try {
      InvoiceService.postInvoice(invoice)
        .then((res) => {
          console.log("success");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Something went wrong!");
        });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div>
      <Box
        sx={{
          alignItems: "center",
          border: 1,
          borderRadius: 1,
          borderStyle: "dashed",
          borderColor: "divider",
          display: "flex",
          flexWrap: "wrap",
          outline: "none",
          p: 6,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} sx={{ p: 2 }}>
            <Grid xs={12} md={12}>
              <TextField
                fullWidth
                label={t(tokens.taxpayers.creditCardNumber)}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bottom: "0px",
                }}
                {...register("card_information.card_number", {
                  required: `La Tarjeta de Crédito es un requisito!`,
                })}
                autoComplete="new-password"
                required
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label={t(tokens.taxpayers.expirationDate)}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bottom: "0px",
                }}
                {...register("card_information.card_expiry_date", {
                  required: `La Fecha de la Tarjeta de Crédito es un requisito!`,
                })}
                autoComplete="new-password"
                required
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label={t(tokens.taxpayers.cvv)}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bottom: "0px",
                }}
                {...register("card_information.card_cvv", {
                  required: `El CVV es un requisito!`,
                })}
                autoComplete="new-password"
                required
              />
            </Grid>
            <Grid xs={12} md={12}>
              <TextField
                fullWidth
                label={t(tokens.taxpayers.property)}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bottom: "0px",
                }}
                {...register("property_id_number_national_registry", {
                  required: `Numero del registro de la Propiedad es un requisito!`,
                })}
                autoComplete="new-password"
                required
              />
            </Grid>
            <Grid xs={12} md={12}>
              <TextField
                fullWidth
                label={t(tokens.taxpayers.amount)}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bottom: "0px",
                }}
                {...register("operation_information.amount", {
                  required: `Valor de Pago es un requisito!`,
                })}
                autoComplete="new-password"
                required
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label={t(tokens.taxpayers.receipt)}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bottom: "0px",
                }}
                {...register("terminal_information.receipt_number", {
                  required: `Número del Recibo es un requisito!`,
                })}
                autoComplete="new-password"
                required
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label={t(tokens.taxpayers.audit)}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bottom: "0px",
                }}
                {...register("terminal_information.audit_number", {
                  required: `Número de Auditoría es un requisito!`,
                })}
                autoComplete="new-password"
                required
              />
            </Grid>
          </Grid>
        </form>
        <Box display="flex" sx={{ flexGrow: 1, justifyContent: "center" }}>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            {t(tokens.taxpayers.pay)}
          </Button>
        </Box>
      </Box>
    </div>
  );
};
