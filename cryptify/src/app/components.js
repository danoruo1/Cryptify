import { useEffect, useState } from 'react';
import {Box, Typography} from "@mui/material"

const ImageChanger = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [opacity, setOpacity] = useState(1); // Initial opacity is 1 (fully visible)
  const images = [
    'url(/images/image1.jfif)',
    'url(/images/image2.jpg)',
    'url(/images/image3.jpg)',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out to black (opacity = 0) before changing image
      setOpacity(0);

      setTimeout(() => {
        // Change the image after opacity is 0
        setImageIndex(prevIndex => (prevIndex + 1) % images.length);
        // Fade in (opacity = 1) after the image has changed
        setOpacity(1);
      }, 3000); // Wait 3 seconds (adjustable) to match the fade-out time
    }, 30000); // Change image every 30 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length]);

  return (
    <div
      style={{
        backgroundImage: images[imageIndex],
        width: "100%",
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: opacity, // Control opacity to fade in/out
        transition: 'opacity 3s ease-in-out, background-image 3s ease-in-out', // 3-second fade transitions
        backgroundColor: opacity === 0 ? 'black' : 'transparent', // Change background color to black during fade-out
        alignItems:"center"
      }}
    >

        <Typography sx={{
            fontFamily:"-moz-initial",
            fontSize:"20px"
        }}>
        Cryptify
        </Typography>
    </div>
  );
};

export default ImageChanger;
