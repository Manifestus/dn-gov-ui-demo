import type { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';

export const Logo: FC = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <Box display='flex' sx={{height: '100%', width: '100%'}}>
      <img src='https://res.cloudinary.com/du7w5i2uh/image/upload/v1679350694/delnorte-justlogo_kpmyle.png' alt='Del Norte'></img>
    </Box>
  );
};
