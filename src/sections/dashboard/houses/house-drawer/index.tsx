import type { FC } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Star01Icon from '@untitled-ui/icons-react/build/esm/Star01';
import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import {
  Avatar,
  backdropClasses,
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import type { Item } from 'src/types/file-manager';
import { bytesToSize } from 'src/utils/bytes-to-size';
import { ItemIcon } from '../houses-icon';
import { ItemTags } from './houses-tags';
import { ItemShared } from './houses-shared';
import { tokens } from 'src/locales/tokens';
import { t } from 'i18next';
import { Houses } from 'src/types/house';

interface ItemDrawerProps {
  item?: Houses;
  onClose?: () => void;
  onDelete?: (itemId: string) => void;
  onFavorite?: (itemId: string, value: boolean) => void;
  onTagsChange?: (itemId: string, value: string[]) => void;
  open?: boolean;
}

export const ItemDrawer: FC<ItemDrawerProps> = (props) => {
  const { item, onClose, onDelete, onFavorite, onTagsChange, open = false } = props;

  let content: JSX.Element | null = null;

  if (item) {
    const createdAt = item.createdAt && format(item.createdAt, 'MMM dd, yyyy HH:mm');
    const updatedAt = item.updatedAt && format(item.updatedAt, 'MMM dd, yyyy HH:mm');

    content = (
      <div>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{ p: 3 }}
        >
          <IconButton onClick={onClose}>
            <SvgIcon fontSize="small">
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Divider />
        <Box
          sx={{
            px: 3,
            py: 2
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Typography variant="h6">
              {item.id}
            </Typography>
            <IconButton>
              <SvgIcon fontSize="small">
                <Edit02Icon />
              </SvgIcon>
            </IconButton>
          </Stack>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              sm={4}
            >
              <Typography
                color="text.secondary"
                variant="caption"
              >
                {t(tokens.houses.createdBy)}
              </Typography>
            </Grid>
            <Grid
              xs={12}
              sm={4}
            >
              <Typography
                color="text.secondary"
                variant="caption"
              >
                {t(tokens.houses.size)}
              </Typography>
            </Grid>
            <Grid
              xs={12}
              sm={4}
            >
              <Typography
                color="text.secondary"
                variant="caption"
              >
                {t(tokens.houses.createdAt)}
              </Typography>
            </Grid>
            <Grid
              xs={12}
              sm={8}
            >
              <Typography variant="body2">
                {createdAt}
              </Typography>
            </Grid>
            <Grid
              xs={12}
              sm={4}
            >
              <Typography
                color="text.secondary"
                variant="caption"
              >
                {t(tokens.houses.modifiedAt)}
              </Typography>
            </Grid>
            <Grid
              xs={12}
              sm={8}
            >
              <Typography variant="body2">
                {updatedAt}
              </Typography>
            </Grid>
            <Grid
              xs={12}
              sm={4}
            >
              <Typography
                color="text.secondary"
                variant="caption"
              >
                {t(tokens.houses.tags)}
              </Typography>
            </Grid>
            <Grid
              xs={12}
              sm={4}
            >
              <Typography
                color="text.secondary"
                variant="caption"
              >
                {t(tokens.houses.actions)}
              </Typography>
            </Grid>
            <Grid
              xs={12}
              sm={8}
            >
              <IconButton onClick={() => onDelete?.(item.id)}>
                <SvgIcon fontSize="small">
                  <Trash02Icon />
                </SvgIcon>
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }

  return (
    <Drawer
      anchor="right"
      ModalProps={{
        sx: {
          [`& .${backdropClasses.root}`]: {
            background: 'transparent !important'
          }
        }
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: '100%',
          width: 400
        }
      }}
    >
      {content}
    </Drawer>
  );
};

ItemDrawer.propTypes = {
  // @ts-ignore
  item: PropTypes.object,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  onFavorite: PropTypes.func,
  onTagsChange: PropTypes.func,
  open: PropTypes.bool
};
