import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './Styles/App.css';
import { thumbsContainer, thumb, thumbInner, img, ParentBox, UploadBox, DragBox } from './Styles/AppStyle'
import { Typography, Box, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface CustomFile extends File {
  preview: string;
}

function App() {
  const [files, setFiles] = useState<CustomFile[]>([]);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          }) as CustomFile
        )
      );
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt={`Thumbnail of ${file.name}`}
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const fileInfo = acceptedFiles.map(file => (
    <li key={file.name}>
      The file name: {file.name} - with Size {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    // <section className="container">
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
        {fileInfo}  
      </aside>

      {/* <Typography variant="h4" component="h2">
        Rejected files
      </Typography>
      <ul>{fileRejectionItems}</ul> */}

    </ParentBox>
    // </section>
  );
}

export default App;
