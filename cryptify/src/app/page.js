"use client"
import {Box, Typography,Button, Container} from "@mui/material"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import '/custom.css'; 

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/encrypt');
    router.prefetch('/decrypt');
    router.prefetch('/help');
  }, [router]);


  const handleRedirect = (path) => {
    setTimeout(() => {
      router.push(path); // Use push for client-side navigation
    },150)
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
        overflow:"clip"
      }}
      >
         <Typography sx={{
          fontFamily:"glitchFont",
          fontSize:"380px",
          color:"white",
          position:"relative",
          top:"-50px",
        }}>
      Cryptify
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
        
        <Button className="startButton"  onClick={() => handleRedirect('/encrypt')}> Encrypt </Button>
        <Button className="startButton"  onClick={() => handleRedirect('/decrypt')}> Decrypt  </Button>
        <Button className="startButton"  onClick={() => handleRedirect('/help')}> Help </Button>

      </div>
     
  </div>
   
  );
}
