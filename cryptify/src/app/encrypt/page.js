"use client"
import {Box, Typography,Button, Container} from "@mui/material"
import { useRouter } from 'next/navigation';
import { useState } from "react";
export default function Home() {
  const router = useRouter();
  const [alg, setAlg] = useState(false);
  const [algorithm, setAlgorithm] = useState("");
  const handleRedirect = (path) => {
    router.push(path); // Use push for client-side navigation
  };

  const changeAlg = (al) => {
    setAlg(true);
    setAlgorithm(al);
    console.log(al);
  };
  const algData = new Map();


  const send = () => {
    if (algorithm == "") {

    }

    if (algorithm = ""){

    }

    if (algorithm = ""){
      
    }
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
          }}>Encryption
      </Typography>

      {!alg &&<Typography sx={{
          fontFamily:"glitchFont",
          fontSize:"150px",
          color:"white",
          position:"relative",
          top:"-120px",
          marginBottom:"0px"
          }}>Choose An Algorithm
        </Typography>}
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
        
        {!alg&& <Button className="startButton" onClick={() => changeAlg('AES')}> AES </Button>}
        {!alg&&<Button className="startButton" onClick={() => changeAlg('CeaserCipher')} style={{fontSize:"40px"}}> Ceaser Cipher </Button>}
        {!alg&&<Button className="startButton" onClick={() => changeAlg('RSA')}> RSA </Button>}

        {alg && algorithm=="CeaserCipher" && <input
          type="text"
         placeholder="Choose a Shift"
         style={{
          width:"100%",
          backgroundColor:"black",
          color:"white",
          fontFamily:"glitchFont",
          height:"80%",
          borderRadius:"20px",
          border:"7px solid green",
          fontSize:"25px",
          overflow:"auto"
         }} 
        ></input>}

        {alg &&<input
          type="text"
         placeholder="Enter your message"
         style={{
          width:"100%",
          backgroundColor:"black",
          color:"white",
          fontFamily:"glitchFont",
          height:"80%",
          borderRadius:"20px",
          border:"7px solid green",
          fontSize:"25px",
          overflow:"auto"
         }} 
        ></input>}

        {alg && algorithm=="RSA" && <Button className="startButton" style={{fontSize:"30px"}}> Generate Keys </Button>}

        

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
            top: "-100px",
            gap:"60px"
            }}>
          <Button className="startButton" onClick={() => handleRedirect('/')}> Back </Button>
          {alg &&<Button className="startButton"> Send </Button>}
      </footer>

     

  </div>
   
  );
}
