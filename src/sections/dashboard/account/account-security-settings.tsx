import type { FC } from "react";
import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { tokens } from "src/locales/tokens";
import { t } from "i18next";

interface LoginEvent {
  id: string;
  createdAt: number;
  ip: string;
  type: string;
  userAgent: string;
}

interface AccountSecuritySettingsProps {
  loginEvents: LoginEvent[];
}

export const AccountSecuritySettings: FC<AccountSecuritySettingsProps> = (
  props
) => {
  const { loginEvents } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = useCallback((): void => {
    setIsEditing((prevState) => !prevState);
  }, []);

  return (
    <Stack spacing={4}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Typography variant="h6">
                {t(tokens.taxpayers.changePassword)}
              </Typography>
            </Grid>
            <Grid xs={12} sm={12} md={8}>
              <Stack alignItems="center" direction="row" spacing={3}>
                <TextField
                  disabled={!isEditing}
                  label={t(tokens.account.password)}
                  type="password"
                  defaultValue="Thebestpasswordever123#"
                  sx={{
                    flexGrow: 1,
                    ...(!isEditing && {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dotted",
                      },
                    }),
                  }}
                />
                <Button onClick={handleEdit}>
                  {isEditing ? t(tokens.account.save) : t(tokens.taxpayers.edit)}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title={t(tokens.account.multiFactorAuth)} />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={4}>
            <Grid xs={12} sm={6}>
              <Card sx={{ height: "100%" }} variant="outlined">
                <CardContent>
                  <Box
                    sx={{
                      display: "block",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        "&::before": {
                          backgroundColor: "error.main",
                          borderRadius: "50%",
                          content: '""',
                          display: "block",
                          height: 8,
                          left: 4,
                          position: "absolute",
                          top: 7,
                          width: 8,
                          zIndex: 1,
                        },
                      }}
                    >
                      <Typography color="error" sx={{ pl: 3 }} variant="body2">
                        {t(tokens.account.off)}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ mt: 1 }} variant="subtitle2">
                    {t(tokens.account.authApp)}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                  >
                    {t(tokens.account.authAppText)}
                  </Typography>
                  <Box sx={{ mt: 4 }}>
                    <Button
                      endIcon={
                        <SvgIcon>
                          <ArrowRightIcon />
                        </SvgIcon>
                      }
                      variant="outlined"
                    >
                      {t(tokens.account.setup)}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid sm={6} xs={12}>
              <Card sx={{ height: "100%" }} variant="outlined">
                <CardContent>
                  <Box sx={{ position: "relative" }}>
                    <Box
                      sx={{
                        "&::before": {
                          backgroundColor: "error.main",
                          borderRadius: "50%",
                          content: '""',
                          display: "block",
                          height: 8,
                          left: 4,
                          position: "absolute",
                          top: 7,
                          width: 8,
                          zIndex: 1,
                        },
                      }}
                    >
                      <Typography color="error" sx={{ pl: 3 }} variant="body2">
                      {t(tokens.account.off)}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ mt: 1 }} variant="subtitle2">
                    {t(tokens.account.textMessage)}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                  >
                    {t(tokens.account.textMessageText)}
                  </Typography>
                  <Box sx={{ mt: 4 }}>
                    <Button
                      endIcon={
                        <SvgIcon>
                          <ArrowRightIcon />
                        </SvgIcon>
                      }
                      variant="outlined"
                    >
                      {t(tokens.account.setup)}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          title={t(tokens.account.loginHistory)}
          subheader={t(tokens.account.loginHistoryText)}
        />
        <Scrollbar>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell>{t(tokens.account.loginType)}</TableCell>
                <TableCell>{t(tokens.account.ipAddress)}</TableCell>
                <TableCell>{t(tokens.account.client)}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loginEvents.map((event) => {
                const createdAt = format(event.createdAt, "HH:mm a MM/dd/yyyy");

                return (
                  <TableRow
                    key={event.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Typography variant="subtitle2">{t(tokens.account.credentialLogin)}</Typography>
                      <Typography variant="body2" color="body2">
                      {t(tokens.account.credentialLoginOn)} {createdAt}
                      </Typography>
                    </TableCell>
                    <TableCell>{event.ip}</TableCell>
                    <TableCell>{event.userAgent}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Scrollbar>
      </Card>
    </Stack>
  );
};

AccountSecuritySettings.propTypes = {
  loginEvents: PropTypes.array.isRequired,
};
