import React, { useEffect, useRef } from 'react';
import Hammer from 'hammerjs';
import ReactPlayer from 'react-player/youtube';

const MyPlayer = () => {
  const playerRef = useRef(null);
  let seekInterval;

  useEffect(() => {
    const manager = new Hammer.Manager(document.documentElement);

    // Custom long-press gesture
    const longPress = new Hammer.Press({ event: 'press', time: 800 });
    manager.add(longPress);

    manager.on('press pressup', handlePress);

    return () => {
      manager.destroy();
    };
  }, []);

  const handlePress = (event) => {
    const { offsetWidth, clientX } = event.target;
    const position = clientX / offsetWidth;

    if (event.type === 'press') {
      if (position < 0.3) {
        // Start seeking backward at 1x speed
        console.log('Press and hold on the left, start seeking backward at 1x speed...');
        seekInterval = setInterval(() => {
          // Calculate the seek position (adjust this based on your needs)
          const currentPosition = playerRef.current.getCurrentTime();
          const newPosition = currentPosition - 1; // Move 1 second backward
          
          // Update the player
          playerRef.current.seekTo(newPosition);
        }, 1000);
      }
    } else if (event.type === 'pressup') {
      // Stop seeking
      console.log('Press up detected, stop seeking...');
      clearInterval(seekInterval);
    }
  };

  return (
    <div>
      <ReactPlayer ref={playerRef} url='https://www.youtube.com/watch?v=IUNrYfEMTuA' controls />
    </div>
  );
};

export default MyPlayer;
