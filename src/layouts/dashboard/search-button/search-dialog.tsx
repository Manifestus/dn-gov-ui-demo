import type { FC, SyntheticEvent } from "react";
import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import {
  Badge,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { Tip } from "src/components/tip";
import { wait } from "src/utils/wait";
import { Houses } from "src/types/house";
import { useMockedHouses } from "src/hooks/use-house";

const House = useMockedHouses;

const houses: Record<string, Houses[]> = {
  House,
};

interface SearchDialogProps {
  onClose?: () => void;
  open?: boolean;
}

export const SearchDialog: FC<SearchDialogProps> = (props) => {
  const { onClose, open = false, ...other } = props;
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayArticles, setDisplayArticles] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (event: SyntheticEvent): Promise<void> => {
      event.preventDefault();
      setDisplayArticles(false);
      setIsLoading(true);
      // Do search here
      await wait(1500);
      setIsLoading(false);
      setDisplayArticles(true);
    },
    []
  );

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open} {...other}>
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
        <Typography variant="h6">Search</Typography>
        <IconButton color="inherit" onClick={onClose}>
          <SvgIcon>
            <XIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <DialogContent>
        <Tip message="Search by entering a keyword and pressing Enter" />
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon>
                    <SearchMdIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            label="Search"
            onChange={(event): void => setValue(event.target.value)}
            placeholder="Search..."
            value={value}
          />
        </Box>
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {displayArticles && (
          <Stack spacing={2} sx={{ mt: 3 }}>
            {Object.keys(houses).map((type, index) => (
              <Stack key={index} spacing={2}>
                <Typography variant="h6">{type}</Typography>
                <Stack
                  divider={<Divider />}
                  sx={{
                    borderColor: "divider",
                    borderRadius: 1,
                    borderStyle: "solid",
                    borderWidth: 1,
                  }}
                >
                  {houses[type].map((houses, index) => (
                    <Box key={houses.id} sx={{ p: 2 }}>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                        sx={{ pl: 1 }}
                      >
                        <Badge color="primary" variant="dot" />
                        <Typography variant="subtitle1">
                          {houses.state}
                        </Typography>
                      </Stack>
                      <Typography color="text.secondary" variant="body2">
                        {houses.town}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        variant="body2"
                        sx={{ mt: 1 }}
                      >
                        {houses.property_address_record}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

SearchDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
