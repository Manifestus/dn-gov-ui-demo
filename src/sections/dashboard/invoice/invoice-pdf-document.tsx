import type { FC } from "react";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import numeral from "numeral";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useTheme } from "@mui/material/styles";
import type { Invoice } from "src/types/invoice";
import { Customer } from "src/types/customer";
import { Houses } from "src/types/house";
import { Transaction } from "src/types/transaction";

const useStyles = () => {
  const theme = useTheme();

  return useMemo(() => {
    return StyleSheet.create({
      page: {
        backgroundColor: "#FFFFFF",
        padding: 24,
      },
      h4: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.235,
      },
      h6: {
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 1.6,
      },
      alignRight: {
        textAlign: "right",
      },
      subtitle2: {
        fontSize: 10,
        fontWeight: 500,
        lineHeight: 1.57,
      },
      body2: {
        fontSize: 10,
        fontWeight: 400,
        lineHeight: 1.43,
      },
      gutterBottom: {
        marginBottom: 4,
      },
      colorSuccess: {
        color: theme.palette.success.main,
      },
      uppercase: {
        textTransform: "uppercase",
      },
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      brand: {
        height: 24,
        width: 24,
      },
      company: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 32,
      },
      references: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 32,
      },
      billing: {
        marginTop: 32,
      },
      items: {
        marginTop: 32,
      },
      itemRow: {
        borderBottomWidth: 1,
        borderColor: "#EEEEEE",
        borderStyle: "solid",
        flexDirection: "row",
      },
      itemNumber: {
        padding: 6,
        width: "10%",
      },
      itemDescription: {
        padding: 6,
        width: "50%",
      },
      itemQty: {
        padding: 6,
        width: "10%",
      },
      itemUnitAmount: {
        padding: 6,
        width: "15%",
      },
      itemTotalAmount: {
        padding: 6,
        width: "15%",
      },
      summaryRow: {
        flexDirection: "row",
      },
      summaryGap: {
        padding: 6,
        width: "70%",
      },
      summaryTitle: {
        padding: 6,
        width: "15%",
      },
      summaryValue: {
        padding: 6,
        width: "15%",
      },
      notes: {
        marginTop: 32,
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row",
      },
      notes2: {
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
    });
  }, [theme]);
};

interface InvoicePdfDocumentProps {
  invoice: Invoice;
}

export const InvoicePdfDocument: FC<InvoicePdfDocumentProps> = (props) => {
  const { invoice } = props;
  const styles = useStyles();

  const invoiceV2: Invoice = invoice as unknown as Invoice;
  const property: Houses = invoice.property as unknown as Houses;
  const user: Customer = invoice.user as unknown as Customer;
  const transaction: Transaction =
    invoice.transaction as unknown as Transaction;

  if (invoiceV2.totalAmount !== undefined && invoiceV2.totalAmount !== null) {
    invoiceV2.totalAmount = invoiceV2.totalAmount + 2.0;
  }

  // const items = invoice.items || [];
  const dueDate = invoice.dueDate && format(invoice.dueDate, "dd MMM yyyy");
  const issueDate =
    invoice.issueDate && format(new Date(invoice.issueDate), "dd MMM yyyy");
  const subtotalAmount = numeral(invoice.subtotalAmount).format(
    `${invoice.currency}0,0.00`
  );
  const taxAmount = numeral(invoice.taxAmount).format(
    `${invoice.currency}0,0.00`
  );
  const totalAmount = numeral(invoiceV2.totalAmount).format(
    `${invoice.currency}0,0.00`
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Image
              source="https://res.cloudinary.com/du7w5i2uh/image/upload/v1692719129/sbp-logo_d7rfzt.png"
              style={styles.brand}
            />
            <Text style={styles.h6}>San Bartolome de Perulapia</Text>
          </View>
          <View>
            <Text style={[styles.h4, styles.uppercase]}>
              {invoice.status === "paid" ? "PAGADO" : "CANCELADO"}
            </Text>
            <Text
              style={styles.subtitle2}
            >{`Numero de Orden: ${invoice.number}`}</Text>
          </View>
        </View>
        <View style={styles.company}>
          <View>
            <Text style={styles.body2}>Propiedad a Pagar</Text>
            <Text style={styles.body2}>
              {property?.property_address_record?.split(",")[0]}
            </Text>
            <Text style={styles.body2}>
              {property?.property_address_record?.split(",")[1]}
            </Text>
            <Text style={styles.body2}>{property?.town}</Text>
            <Text style={styles.body2}>
              {property?.state + ", " + "El Salvador"}
            </Text>
          </View>
          <View>
            <Text style={styles.body2}>Numero de Referencia</Text>
            <Text style={styles.body2}>
              {transaction?.operation_information?.reference}
            </Text>
          </View>
          <View>
            <Text style={styles.body2}>Datos del Contribuyente</Text>
            <Text style={styles.body2}>{user.name}</Text>
            <Text style={styles.body2}>{user.email}</Text>
            <Text style={styles.body2}>{user.phone}</Text>
          </View>
        </View>
        <View style={styles.references}>
          <View>
            <Text style={[styles.subtitle2, styles.gutterBottom]}>
              Fecha Transmitida
            </Text>
            <Text style={styles.body2}>{issueDate}</Text>
          </View>
          <View>
            <Text style={[styles.subtitle2, styles.gutterBottom]}>
              Datos de la Tarjeta
            </Text>
            <Text style={styles.body2}>
              {" **** " + " **** " + transaction.card_information.card_number}
            </Text>
          </View>
        </View>
        <View style={styles.billing}>
          <Text style={[styles.subtitle2, styles.gutterBottom]}>
            Dirección de Facturación
          </Text>
          <Text style={styles.body2}>{user.address}</Text>
          <Text style={styles.body2}>{user.municipality}</Text>
          <Text style={styles.body2}>{user.country}</Text>
        </View>
        <View style={styles.items}>
          <View style={styles.itemRow}>
            <View style={styles.itemNumber}>
              <Text style={styles.h6}>#</Text>
            </View>
            <View style={styles.itemDescription}>
              <Text style={styles.h6}>Descripción</Text>
            </View>
            <View style={styles.itemQty}>
              <Text style={styles.h6}>Estado</Text>
            </View>
            <View style={styles.itemUnitAmount}>
              <Text style={styles.h6}>Subtotal</Text>
            </View>
            <View style={styles.itemTotalAmount}>
              <Text style={[styles.h6, styles.alignRight]}>Total</Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <View style={styles.itemNumber}>
              <Text
                style={styles.body2}
              >{`Numero de Orden: ${invoice.number}`}</Text>
            </View>
            <View style={styles.itemDescription}>
              <Text style={styles.body2}>
                {property?.property_address_record?.split(",")[0]}
              </Text>
              <Text style={styles.body2}>
                {property?.property_address_record?.split(",")[1]}
              </Text>
              <Text style={styles.body2}> {property?.town}</Text>
              <Text style={styles.body2}>
                {property?.state + ", " + "El Salvador"}
              </Text>
            </View>
            <View style={styles.itemQty}>
              <Text style={styles.body2}>
                {invoice.status === "canceled" ? "Cancelado" : "Aprobado"}
              </Text>
            </View>
            <View style={styles.itemUnitAmount}>
              <Text style={[styles.body2, styles.alignRight]}>
                {subtotalAmount}
              </Text>
            </View>
            <View style={styles.itemTotalAmount}>
              <Text style={[styles.body2, styles.alignRight]}>
                {totalAmount}
              </Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryGap} />
            <View style={styles.summaryTitle}>
              <Text style={styles.body2}>Subtotal</Text>
            </View>
            <View style={styles.summaryValue}>
              <Text style={[styles.body2, styles.alignRight]}>
                {subtotalAmount}
              </Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryGap} />
            <View style={styles.summaryTitle}>
              <Text style={styles.body2}>Tasa DelNorte</Text>
            </View>
            <View style={styles.summaryValue}>
              <Text style={[styles.body2, styles.alignRight]}>{taxAmount}</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryGap} />
            <View style={styles.summaryTitle}>
              <Text style={styles.body2}>Total</Text>
            </View>
            <View style={styles.summaryValue}>
              <Text style={[styles.body2, styles.alignRight]}>
                {totalAmount}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.notes}>
          <Text style={[styles.h6, styles.gutterBottom]}>Nota</Text>
          <View style={styles.notes2}>
            <Text style={styles.body2}>
              Servicio proporcionado por Delnorte Holdings Inc.
            </Text>
            <Image
              source="https://res.cloudinary.com/du7w5i2uh/image/upload/v1679350694/delnorte-justlogo_kpmyle.png"
              style={styles.brand}
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

InvoicePdfDocument.propTypes = {
  // @ts-ignore
  invoice: PropTypes.object.isRequired,
};
