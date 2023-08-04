import { useCallback, type FC, Dispatch, SetStateAction } from "react";
import PropTypes from "prop-types";
import type { DropzoneOptions, FileWithPath } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { bytesToSize } from "src/utils/bytes-to-size";
import { FileIcon } from "./file-icon";
import { t } from "i18next";
import { tokens } from "src/locales/tokens";
import { uploadBucketService } from "src/services/UploadBucket.s3";
import toast from "react-hot-toast";
import { wait } from "src/utils/wait";
import { FileData } from "src/types/file-data";

export type File = FileWithPath;

interface FileDropzoneProps extends DropzoneOptions {
  caption?: string;
  files?: File[];
  onRemove?: (file: File) => void;
  onRemoveAll?: () => void;
  onUpload?: () => void;
  id?: string;
  fileName?: (filename: string) => void;
}
export const FileDropzone: FC<FileDropzoneProps> = (props) => {
  const {
    caption,
    files = [],
    onRemove,
    onRemoveAll,
    onUpload,
    id,
    ...other
  } = props;
  const { getRootProps, getInputProps, isDragActive } = useDropzone(other);

  const hasAnyFiles = files.length > 0;

  const baseURL =
    "https://dn-gov-api-demo-5ywbgrw4ia-uc.a.run.app";
  const UploadService = new uploadBucketService(baseURL);

  const handleSubmit = useCallback((): void => {
    onUpload && onUpload();
    const options = {
      headers: {
        method: "POST",
        "Content-Type": "application/json",
      },
      type: files[0].type,
      name: files[0].name,
    };

    if (id !== "photo") {
      UploadService.postMultiPartFile(files, options, baseURL, id).then((res) => {
        toast.success(`Archivo ${files[0].name}, subido con éxito`);
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      });
    } else {
      UploadService.postMultiPartPhoto(files, options, baseURL, id).then((res) => {
        toast.success(`Foto ${files[0].name}, subido con éxito`);
      }).catch((err) => {console.log(err)});
      props.fileName && props.fileName(files[0].name);
    }
  }, [files]);

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
          justifyContent: "center",
          outline: "none",
          p: 6,
          ...(isDragActive && {
            backgroundColor: "action.active",
            opacity: 0.5,
          }),
          "&:hover": {
            backgroundColor: "action.hover",
            cursor: "pointer",
            opacity: 0.5,
          },
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Stack alignItems="center" direction="row" spacing={2}>
          <Avatar
            sx={{
              height: 64,
              width: 64,
            }}
          >
            <SvgIcon>
              <Upload01Icon />
            </SvgIcon>
          </Avatar>
          <Stack spacing={1}>
            <Typography
              sx={{
                "& span": {
                  textDecoration: "underline",
                },
              }}
              variant="h6"
            >
              <span>Click to upload</span> or drag and drop
            </Typography>
            {caption && (
              <Typography color="text.secondary" variant="body2">
                {t(tokens.fileManager.maxFile)}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>
      {hasAnyFiles && (
        <Box sx={{ mt: 2 }}>
          <List>
            {files.map((file) => {
              const extension = file.name.split(".").pop();

              return (
                <ListItem
                  key={file.path}
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                    "& + &": {
                      mt: 1,
                    },
                  }}
                >
                  <ListItemIcon>
                    <FileIcon extension={extension} />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: "subtitle2" }}
                    secondary={bytesToSize(file.size)}
                  />
                  <Tooltip title="Remove">
                    <IconButton edge="end" onClick={() => onRemove?.(file)}>
                      <SvgIcon>
                        <XIcon />
                      </SvgIcon>
                    </IconButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Button
              color="inherit"
              onClick={onRemoveAll}
              size="small"
              type="button"
            >
              {t(tokens.fileManager.remove)}
            </Button>

            <Button onClick={handleSubmit} size="small" variant="contained">
              {t(tokens.fileManager.upload)}
            </Button>
          </Stack>
        </Box>
      )}
    </div>
  );
};

FileDropzone.propTypes = {
  caption: PropTypes.string,
  files: PropTypes.array,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  onUpload: PropTypes.func,
  // From Dropzone
  accept: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  ),
  disabled: PropTypes.bool,
  getFilesFromEvent: PropTypes.func,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  noClick: PropTypes.bool,
  noDrag: PropTypes.bool,
  noDragEventsBubbling: PropTypes.bool,
  noKeyboard: PropTypes.bool,
  onDrop: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func,
  onFileDialogCancel: PropTypes.func,
  preventDropOnDocument: PropTypes.bool,
};
