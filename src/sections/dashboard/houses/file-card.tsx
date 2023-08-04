import { Avatar, AvatarGroup, Box, Card, Divider, IconButton, Stack, SvgIcon, Tooltip, Typography } from "@mui/material";
import { t } from "i18next";
import { size } from "lodash";
import React, { FC } from "react";
import { tokens } from "src/locales/tokens";
import { Files } from "src/types/file";
import { ItemIcon } from "./houses-icon";
import DotsVerticalIcon from '@untitled-ui/icons-react/build/esm/DotsVertical';

interface IProps {
    file: Files
    id: string
}

/**
 * @author
 * @function @FileCard
 **/

export const FileCard: FC<IProps> = (props) => {

  return (
   <>
    {props.file.name !== (`property/${props.id}/`) ? ( <Card
        key={props.file.name.split('/')[2]}
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 0,
          transition: (theme) => theme.transitions.create(['background-color, box-shadow'], {
            easing: theme.transitions.easing.easeInOut,
            duration: 200
          }),
          '&:hover': {
            backgroundColor: 'background.paper',
            boxShadow: 16
          }
        }}
        variant="outlined"
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
          spacing={3}
          sx={{
            pt: 2,
            px: 2
          }}
        >
          {/* <IconButton
            // onClick={popover.handleOpen}
            // ref={popover.anchorRef}
          >
            <SvgIcon fontSize="small">
              <DotsVerticalIcon />
            </SvgIcon>
          </IconButton> */}
        </Stack>
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              mb: 1
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                cursor: 'pointer'
              }}
            >
              <ItemIcon
                type={'file'}
                extension={props.file.kind}
              />
            </Box>
          </Box>
          <Typography
            sx={{ cursor: 'pointer' }}
            variant="subtitle2"
          >
            {props.file.name.split('/')[2]}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={1}
          >
            <div>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                {props.file.size + " KB"}
              </Typography>
            </div>
          </Stack>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            {t(tokens.fileManager.createdAt2)} {props.file.updated}
          </Typography>
        </Box>
      </Card>) : null}
   </>
  );
};
