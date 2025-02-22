import {Box, Typography,Button, Container} from "@mui/material"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function StartBar() {
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

    useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'styles/custom.css'; // Ensure the file is accessible in `public/`
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return <div
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

</div>;
}
