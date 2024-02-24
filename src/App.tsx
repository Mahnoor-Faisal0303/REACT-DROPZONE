import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './Styles/App.css';
import { thumbsContainer, thumb, thumbInner, img, ParentBox, UploadBox, DragBox } from './Styles/AppStyle'
import { Typography, Box, Button, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FileIcon, defaultStyles, DefaultExtensionType } from 'react-file-icon';
import ClearIcon from '@mui/icons-material/Clear';
import uuid from 'react-uuid';

interface CustomFile extends File {
  key: string;
  preview: string;
}
function getExtension(filename: string) {
  return filename.split('.').pop()
}

function isImage(extension: string) {
  if (extension === "jpeg" || extension === "jpg" || extension === "png") {
    return true;
  }
  else {
    return false;
  }
}

const App = () => {
  const [files, setFiles] = useState<CustomFile[]>([]);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            key: uuid(),
          }) as CustomFile,
        )
      );
    }
  });

  const handleDelete = (key: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.key !== key));
  };

  const thumbs = files.map((file) => {
    return (
      <div key={file.name}>
        <div style={thumb}>
          <div style={thumbInner}>
            {(isImage(getExtension(file.name)!)) ?
              <img
                src={file.preview}
                style={img}
                alt={`Thumbnail of ${file.name}`}
                onLoad={() => { URL.revokeObjectURL(file.preview) }}
              /> :
              <FileIcon extension={getExtension(file.name)} {...defaultStyles[getExtension(file.name) as DefaultExtensionType]} />
            }
            <IconButton sx={{ color: 'blue', height: '25px', width: '25px' }} aria-label="delete" size="small"
              onClick={() => { handleDelete(file.key); }}>
              <ClearIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
        <Typography sx={{ color: 'blue', width: 200, }} variant="subtitle2" key={file.name}>
          The file name: {file.name} - with Size {file.size} bytes
        </Typography>
      </div>
    )
  });

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <ParentBox component="section" className="container">
      <Box {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <DragBox>
              <Typography sx={{ marginTop: 15 }} variant="h6" component="h2">Drop the files here ...</Typography>
            </DragBox> :
            <UploadBox>
              <Typography variant="h6">Drag 'n' drop files here or Click to browse File.</Typography>
              <Button
                sx={{ marginTop: 2 }}
                type="button"
                onClick={open}
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload file
              </Button>
            </UploadBox>
        }
      </Box>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </ParentBox>
  );
}

export default App;
