import styled from '@emotion/styled';
import Box from '@mui/material/Box';

export const ParentBox = styled(Box)({
    display: "flex",
    justifyContent:'center',
    flexDirection: 'column',
    alignItems: 'center',
    width:'auto',
    padding: "20px",
    margin: "50px auto ",
});
export const UploadBox = styled(Box)({
    margin: "50px",
    display:'flex',
   flexDirection: 'column',
    alignItems: 'center'
});
export const  DragBox = styled(Box)({
    margin: "100px",
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border:"2px dashed black",
    width:'700px',
    height:'400px',
});

export const thumbsContainer: React.CSSProperties = {
    display: 'flex',
    flexFlow: 'row wrap',
    margin:1,
    justifyContent:'space-between',
    textAlign:'center',
};
export const thumb: React.CSSProperties = {
    display: 'flex',   
    width:'200px',
    height:'100px',
    margin:10,
   //justifyContent:"space-around",
  // backgroundColor:'yellow'
};

export const thumbInner: React.CSSProperties = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
};

export const img: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: '100%'
};
