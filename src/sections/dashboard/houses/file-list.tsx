import { Box } from "@mui/material";
import React, { FC, useState } from "react";
import { FileCard } from "./file-card";
import { Files } from "src/types/file";

interface IProps {
    files: Files[]
    id: string
}

/**
 * @author
 * @function @FileList
 **/

export const FileList: FC<IProps> = (props) => {
  
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
    >
      {props.files.map((file: Files, index) => (<FileCard file={file} key={index} id={props.id}/>))}
    </Box>
  );
};
