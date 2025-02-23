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
          height:"45%",
          gap:"20%",
          overflow:"clip",
          position:"relative",
          alignItems:"center",
          display:"flex",
          position:"relative",
          top:"-250px"
        }}
      >



      <Box
          sx={{
            width: "100%",
            backgroundColor: "black",
            color: "white",
            fontFamily: "glitchFont",
            height: "100%",
            borderRadius: "20px",
            border: "7px solid green",
            fontSize: "25px",
            overflow: "auto"
        }}>
          <Typography sx={{
            fontFamily:"glitchFont",
            fontSize:"50px",
            color:"white",
            position:"relative",
            }}> Encryption <br></br>
            *Utilizing different Cryptographic Algorithms, you can encode your message. All you have to do is follow the given instructions during the encryption process, and then make sure to enter the right userID(if your sending a message). 
            <br></br>
            <br></br>
            Decryption <br></br>
            *Either you can import a json file and decrypt the message from the database, or create a session between another user to send a message.
            <br></br>


            <br></br>
            Posting to the Database
            <br></br>
            *Please ensure that all posted content is appropriate and free of any profanity.
          </Typography>



        </Box>
        

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
            top: "-320px"
            }}>
          <Button className="startButton" onClick={() => handleRedirect('/')}> Back </Button>
      </footer>

     

  </div>
   
  );
}
