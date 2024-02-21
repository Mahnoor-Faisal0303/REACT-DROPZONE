import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './Styles/App.css';
import {thumbsContainer,thumb,thumbInner,img } from './Styles/AppStyle'

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

  const filess = acceptedFiles.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
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
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <div className='boxStyling'><h1>Drop the files here ... </h1>
              <h4>Files</h4>
              <ul>{filess}</ul>
            </div> :
            <button type="button" onClick={open}>Drag 'n' drop some files here, or click to select files</button>
        }
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>

      <h4>Rejected files</h4>
      <ul>{fileRejectionItems}</ul>

    </section>
  );
}

export default App;
