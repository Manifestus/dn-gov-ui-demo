import type { FC } from 'react';
import PropTypes from 'prop-types';
import Link01Icon from '@untitled-ui/icons-react/build/esm/Link01';
import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02';
import { Menu, MenuItem, menuItemClasses, SvgIcon } from '@mui/material';
import { t } from 'i18next';
import { tokens } from 'src/locales/tokens';

interface ItemMenuProps {
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  onDelete?: () => void;
  open?: boolean;
}

export const ItemMenu: FC<ItemMenuProps> = (props) => {
  const { anchorEl, onClose, onDelete, open = false } = props;

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      sx={{
        [`& .${menuItemClasses.root}`]: {
          fontSize: 14,
          '& svg': {
            mr: 1
          }
        }
      }}
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}
    >
      <MenuItem onClick={onClose}>
        <SvgIcon fontSize="small">
          <Link01Icon />
        </SvgIcon>
        {t(tokens.houses.copy)}
      </MenuItem>
      <MenuItem
        onClick={onDelete}
        sx={{ color: 'error.main' }}
      >
        <SvgIcon fontSize="small">
          <Trash02Icon />
        </SvgIcon>
        {t(tokens.houses.delete)}
      </MenuItem>
    </Menu>
  );
};

ItemMenu.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  open: PropTypes.bool
};
