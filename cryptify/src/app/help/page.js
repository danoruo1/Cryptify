"use client"
import {Box, Typography,Button, Container} from "@mui/material"
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleRedirect = (path) => {
    router.push(path); // Use push for client-side navigation
  };

  return (
    <div
    style={{
      backgroundImage:  'url(/images/hacking.gif)',
      width: "100%",
      height: '100vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity:".8",
      alignItems:"center",
      justifyItems:"center",
    }}
  >
      <Box
      sx={{
        width:"70%",
        height:"70%",
        background: "transparent",
        borderRadius:"38px",
        alignItems:"center",
        justifyItems:"center",
        opacity:".6",
        overflow:"visible"
      }}
      >
         <Typography sx={{
          fontFamily:"glitchFont",
          fontSize:"340px",
          color:"white",
          position:"relative",
          top:"-50px",
        }}>
      Help
      </Typography>
      </Box>

      <div
        style={{
          background:"transparent",
          width:"80%",
          height:"25%",
          gap:"20%",
          overflow:"clip",
          position:"relative",
          alignItems:"center",
          display:"flex",
          position:"relative",
          top:"-100px"
        }}
      >
        

      </div>
      <footer style={{ 
            background: "transparent",
            width: "80%",
            height: "15%",
            overflow: "clip",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            top: "-100px"
            }}>
          <Button className="startButton" onClick={() => handleRedirect('/')}> Back </Button>
      </footer>

     

  </div>
   
  );
}
