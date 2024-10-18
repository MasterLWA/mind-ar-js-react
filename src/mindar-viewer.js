import React, { useEffect, useRef } from 'react';
import 'aframe'; // Import A-Frame for 3D/AR experiences
import 'mind-ar/dist/mindar-image-aframe.prod.js'; // Import MindAR for image tracking in A-Frame

const imageTargetSrc = "./target/targets.mind"; 

const ARScene = () => {
  const sceneRef = useRef(null); // Reference for the A-Frame scene

  useEffect(() => {
    const sceneEl = sceneRef.current; // Get the current A-Frame scene element
    const arSystem = sceneEl.systems['mindar-image-system']; // Access the MindAR image tracking system

    // Start AR when the scene is ready
    const startAR = () => {
      arSystem.start(); // Begin AR tracking
    };

    // Add an event listener to start AR on render
    sceneEl.addEventListener('renderstart', startAR);

    // Cleanup function to stop AR when the component unmounts
    return () => {
      arSystem.stop(); // Stop AR tracking
      sceneEl.removeEventListener('renderstart', startAR); // Remove event listener
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <a-scene 
      ref={sceneRef} // Attach the scene reference
      // mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/card.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;" 
      mindar-image={"imageTargetSrc: " + imageTargetSrc + "; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"}
      color-space="sRGB" 
      embedded 
      renderer="colorManagement: true, physicallyCorrectLights" 
      vr-mode-ui="enabled: false" 
      device-orientation-permission-ui="enabled: false"
    >
      {/* Load assets for the AR scene */}
      <a-assets>
        <img id="card" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/card.png" alt="AR card example" />
        <a-asset-item id="avatarModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"></a-asset-item>
      </a-assets>

      {/* Set up the camera */}
      <a-camera position="0 0 0" look-controls="enabled: false" /> 

      {/* Entity that will display AR content when the target image is detected */}
      <a-entity mindar-image-target="targetIndex: 0">
        {/* Display a plane with the image */}
        <a-plane 
          src="#card" 
          position="0 0 0" 
          height="0.552" 
          width="1" 
          rotation="0 0 0" 
        />
        
        {/* Display the 3D model with animation */}
        <a-gltf-model 
          rotation="0 0 0" 
          position="0 0 0.1" 
          scale="0.005 0.005 0.005" 
          src="#avatarModel" 
          animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate" 
        />
      </a-entity>
    </a-scene>
  );
};

export default ARScene; // Export the ARScene component
