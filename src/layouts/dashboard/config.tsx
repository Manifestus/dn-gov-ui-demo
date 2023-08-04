import type { ReactNode } from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Chip, SvgIcon } from "@mui/material";
import CurrencyBitcoinCircleIcon from "src/icons/untitled-ui/duocolor/currency-bitcoin-circle";
import HomeSmileIcon from "src/icons/untitled-ui/duocolor/home-smile";
import ReceiptCheckIcon from "src/icons/untitled-ui/duocolor/receipt-check";
import Share07Icon from "src/icons/untitled-ui/duocolor/share-07";
import Upload04Icon from "src/icons/untitled-ui/duocolor/upload-04";
import Users03Icon from "src/icons/untitled-ui/duocolor/users-03";
import { tokens } from "src/locales/tokens";
import { paths } from "src/paths";

export interface Item {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: Item[];
  label?: ReactNode;
  path?: string;
  title: string;
}

export interface Section {
  items: Item[];
  subheader?: string;
}

export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: t(tokens.nav.overview),
            path: paths.dashboard.index,
            icon: (
              <SvgIcon fontSize="small">
                <HomeSmileIcon />
              </SvgIcon>
            ),
          },
          // {
          //   title: t(tokens.nav.crypto),
          //   path: paths.dashboard.crypto,
          //   icon: (
          //     <SvgIcon fontSize="small">
          //       <CurrencyBitcoinCircleIcon />
          //     </SvgIcon>
          //   ),
          //   label: <Chip color="primary" label="New" size="small" />,
          // },
          // {
          //   title: t(tokens.nav.account),
          //   path: paths.dashboard.account,
          //   icon: (
          //     <SvgIcon fontSize="small">
          //       <HomeSmileIcon />
          //     </SvgIcon>
          //   ),
          // },
        ],
      },
      {
        subheader: t(tokens.nav.taxpayers),
        items: [
          {
            title: t(tokens.nav.taxpayers),
            path: paths.dashboard.customers.index,
            icon: (
              <SvgIcon fontSize="small">
                <Users03Icon />
              </SvgIcon>
            ),
            // items: [
            //   {
            //     title: t(tokens.nav.list),
            //     path: paths.dashboard.customers.index,
            //   },
            //   {
            //     title: t(tokens.nav.details),
            //     path: paths.dashboard.customers.details,
            //   },
            //   {
            //     title: t(tokens.nav.edit),
            //     path: paths.dashboard.customers.edit,
            //   },
            // ],
          },
          // {
          //   title: t(tokens.nav.invoiceList),
          //   path: paths.dashboard.invoices.index,
          //   icon: (
          //     <SvgIcon fontSize="small">
          //       <ReceiptCheckIcon />
          //     </SvgIcon>
          //   ),
          //   items: [
          //     {
          //       title: t(tokens.nav.list),
          //       path: paths.dashboard.invoices.index,
          //     },
          //     {
          //       title: t(tokens.nav.details),
          //       path: paths.dashboard.invoices.details,
          //     },
          //   ],
          // },
        ],
      },
    ];
  }, [t]);
};
