"use client"
import {Box, Typography,Button, Container} from "@mui/material"
import { useRouter } from 'next/navigation';
import { useState } from "react";
import '/styles/custom.css'; // If it's inside `styles/`

export default function Home() {
  const router = useRouter();
  const [alg, setAlg] = useState(false);
  const [algorithm, setAlgorithm] = useState("");
  const [msg, setMsg] = useState("");
  const[[pubkey,privkey], setKeys] = useState(["None","None"])
  const[[rsaprivkey,rsapubkey], setrsaKeys] = useState(["None","None"])
  const [shift, setShift] = useState(0);
  const [processFinished, setProcess] = useState(false)
  const [ciphertext,setCipher] = useState("")
  const [DB,sendtoDB] = useState(false)

  const handleRedirect = (path) => {
      setTimeout(() => {
        router.push(path); // Use push for client-side navigation
      },150)
  };

  const sendToDatabase = () =>{
    if (DB) return;
    sendtoDB(true)
    setTimeout(()=> {alert("Sent To Database, Refreshing")
      router.push("/")
    },500)
  }

  const changeAlg = (al) => {
    setAlg(true);
    setAlgorithm(al);
    console.log(al);
  };
  const algData = new Map();

  async function getRSAKeys() {
    try {
        const response = await fetch("http://localhost:8000/getRSAKEY", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setrsaKeys([data["public_key"],data["private_key"]])
        setKeys(["Set","set"])
    } catch (error) {
        console.error("Error fetching RSA keys:", error);
    }
  }

  const encryptData = async (m) => {  // Assuming `key` is an object that matches your DictionaryModel
    if (m.trim() === "") {
        alert("Empty Message");
        return;
    }

    // Empty Keys
    if (algorithm === "RSA") {
        if (pubkey === "None") {  // Assuming key has a property 'pubKey'
            alert("Must Generate Keys");
            return;
        }
    }

    // No Shift
    if (algorithm === "CeaserCipher") {
        if (shift === 0) {  // Assuming key has a property 'shift'
            alert("Must Pick a Shift");
            return;
        }
    }

    try {
      const response = await fetch("http://localhost:8000/encrypt-message", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              message: msg,
              method: algorithm,
              key: {
                  pubKey: rsapubkey, // Ensure the key name matches your model
                  privKey: rsaprivkey,
                  shift: algorithm === "CeaserCipher" ? shift : undefined // Include shift only for CeaserCipher
              }
          })
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
     // console.log("Encrypted message:", data.encrypted_message); // Handle the encrypted message
      setCipher(data.encrypted_message)
      setProcess(true)
      console.log(processFinished)
      
  } catch (error) {
      console.error("Error sending data:", error);
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
          marginBottom:"0px",
          display:"flex",
          overflow:"auto"
          }}>Choose An Algorithm
        </Typography>}

      {alg && algorithm=="RSA" &&       <Typography sx={{
          fontFamily:"glitchFont",
          fontSize:"50px",
          color:"white",
          position:"relative",
          top:"-50px",
          }}> Public Key: {pubkey}  Private Key: {privkey}

      </Typography>}
      </Box>
      
      {!processFinished && <div
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

        {alg && algorithm=="CeaserCipher" &&<input
            type="number"
            placeholder="Choose a Shift"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "black",
              color: "white",
              fontFamily: "glitchFont",
              height: "80%",
              borderRadius: "20px",
              border: "7px solid green",
              fontSize: "25px",
              overflow: "auto"
            }}
            step="1"
            onKeyDown={(e) => {
              if (e.key === "e" || e.key === "." || e.key === "-" || e.key === "+") {
                e.preventDefault();
              }
            }}
        ></input>}

        {alg &&<input
          type="text"
          value={msg}
          placeholder="Enter your message"
          onChange={(e) => setMsg(e.target.value)}
          style={{
          width:"100%",
          backgroundColor:"black",
          color:"white",
          fontFamily:"glitchFont",
          height:"80%",
          borderRadius:"20px",
          border:"7px solid green",
          fontSize:"25px",
          scrollbarWidth: 'none', // For Firefox
          overflow:"auto"
         }} 
        ></input>}

        {alg && algorithm=="RSA" && <Button className="startButton" style={{fontSize:"30px"}} onClick={getRSAKeys}> Generate Keys </Button>}

        

      </div>} 

      {processFinished &&<div
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
        <Box
          sx={{
            width: "100%",
            backgroundColor: "black",
            color: "white",
            fontFamily: "glitchFont",
            height: "80%",
            borderRadius: "20px",
            border: "7px solid green",
            fontSize: "25px",
            overflow: "auto"
        }}>

        {algorithm == "RSA" && <Typography sx={{
            fontFamily:"glitchFont",
            fontSize:"30px",
            color:"white",
            position:"relative",
            }}> Plaintext: {msg} <br></br> <br></br> Ciphertext: {ciphertext} <br></br> <br></br>Public Key: <br></br> {(rsapubkey.replace(/-----BEGIN PUBLIC KEY-----/g, '')).replace(/-----END PUBLIC KEY-----/g, '')}  

        </Typography>}


        {algorithm == "CeaserCipher" && <Typography sx={{
            fontFamily:"glitchFont",
            fontSize:"30px",
            color:"white",
            position:"relative",
            }}> Plaintext: {msg} <br></br> Shift: {shift} <br></br> Ciphertext: {ciphertext}

        </Typography>}



          
        </Box>
        
        
        
        </div>}









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
          {alg && !processFinished &&<Button className="startButton" onClick={() => encryptData(msg)}> Encrypt </Button>}
          {processFinished &&<Button className="startButton" > Send </Button>}
          {processFinished &&<Button className="startButton" onClick={sendToDatabase} > Post </Button>}
          {processFinished &&<Button className="startButton"  > Save </Button>}


      </footer>

     

  </div>
   
  );
}
