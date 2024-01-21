import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import { useTheme } from '@mui/material/styles';

const PlayerSlider = ({ currentTime = 0, allTime = 0, onChangeTime, bottom = '4rem', backgroundColor = 'rgba(0,0,0,0.4)', subtitles = [] }) => {
  const theme = useTheme();
  const duration = 100; // seconds
  const [position, setPosition] = useState(0);
  const [currentSubtitle, setCurrentSubtitle] = useState('');

  // Function to convert seconds to time format
  const convertSecondsToTime = (seconds = 0) => {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    let timeString = minutes.toString().padStart(2, '0') + ":" + remainingSeconds.toString().padStart(2, '0');
    return timeString;
  }

  // Effect to set the position of the slider
  useEffect(() => {
    setPosition(Math.floor((currentTime / allTime) * duration));
  }, [currentTime, allTime])

  // Effect to set the current subtitle
  useEffect(() => {
    // Find and set the subtitle for the current time
    const subtitle = subtitles.find(s => currentTime >= s.start && currentTime <= s.end);
    setCurrentSubtitle(subtitle ? subtitle.text : '');
  }, [currentTime, subtitles]);

  // Handle slider change
  const handleChange = (value) => {
    const slideTimer = value / duration * allTime;
    onChangeTime(slideTimer);
    setPosition(value);
  }

  return (
    <div style={{ width: '100%', height: '3rem', position: 'absolute', padding: '0 1rem', left: '0', bottom: bottom, boxSizing: 'border-box', backgroundColor: backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      <span style={{ width: '4rem', color: '#fff', fontSize: '0.8rem' }}>{convertSecondsToTime(currentTime)}</span>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        min={0}
        step={1}
        max={duration}
        onChange={(_, value) => handleChange(value)}
        sx={{
          color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(255,255,255,0.87)',
          height: 4,
          '& .MuiSlider-thumb': {
            width: 8,
            height: 8,
            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
            '&:before': {
              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
            },
            '&:hover, &.Mui-focusVisible': {
              boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark' ? 'rgb(255 255 255 / 16%)' : 'rgb(0 0 0 / 16%)'}`,
            },
            '&.Mui-active': {
              width: 20,
              height: 20,
            },
          },
          '& .MuiSlider-rail': {
            opacity: 0.28,
          },
        }}
      />
      <span style={{ width: '4rem', color: '#fff', fontSize: '0.8rem', textAlign: 'right' }}>{convertSecondsToTime(allTime)}</span>
      {currentSubtitle && <div style={{ position: 'absolute', bottom: '9.5rem', width: '100%', textAlign: 'center', color: 'white', backdropFilter: 'blur(10px)', background: 'rgba(0, 0, 0, 0.1)', fontSize: '1.2rem', padding: '0.7rem 0' }}>
        {currentSubtitle}
      </div>}
    </div>
  );
};

export default PlayerSlider;