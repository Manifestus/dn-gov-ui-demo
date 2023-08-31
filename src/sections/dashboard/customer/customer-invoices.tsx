import { useState, type FC, useEffect } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import {
  Card,
  CardHeader,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { MoreMenu } from "src/components/more-menu";
import { RouterLink } from "src/components/router-link";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import { paths } from "src/paths";
import type { CustomerInvoice } from "src/types/customer";
import { InvoiceQuery } from "src/services/query/InvoiceQuery";
import { Invoice } from "src/types/invoice";
import { useNavigate } from "react-router";
import { Houses } from "src/types/house";

interface CustomerInvoicesProps {
  invoices?: CustomerInvoice[];
  id: string;
}

export const CustomerInvoices: FC<CustomerInvoicesProps> = (props) => {
  const { invoices = [], id, ...other } = props;
  const [parsedData, setParsedData] = useState<Invoice[]>();
  const navigate = useNavigate();
  const { data, isSuccess } = InvoiceQuery(id);
  useEffect(() => {
    if (isSuccess) {
      if (data && data.length > 0) {
        setParsedData(JSON.parse(data));
      }
    }
  }, [isSuccess, data]);

  return (
    <Card {...other}>
      <CardHeader action={<MoreMenu />} title="Recent Invoices" />
      <Scrollbar>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parsedData?.map((invoice) => {
              const issueDate =
                invoice && invoice.issueDate
                  ? format(new Date(invoice.issueDate), "MMM dd,yyyy")
                  : "";
              const statusColor =
                invoice.status === "paid" ? "success" : "error";

              return (
                <TableRow key={invoice.id}>
                  <TableCell>#{invoice.id}</TableCell>
                  <TableCell>{issueDate}</TableCell>
                  <TableCell>{invoice.number}</TableCell>
                  <TableCell>
                    <SeverityPill color={statusColor}>
                      {invoice.status}
                    </SeverityPill>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        navigate(paths.dashboard.invoices.details, {
                          state: { invoice: invoice },
                        });
                      }}
                    >
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={parsedData?.length ?? 0}
        onPageChange={(): void => {}}
        onRowsPerPageChange={(): void => {}}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerInvoices.propTypes = {
  invoices: PropTypes.array,
};
