import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { GetRecommendSeries, RecordHistory } from './service';
import { GetUser } from './cache';
import PlayerIcons from './PlayerIcons.js';
import SeriesName from './SeriesName.js';
import StopIcons from './StopIcons.js';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Recommend = () => {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [showPlayerIcons, setShowPlayerIcons] = useState(true);

  const videoRef = useRef(null)
  const [play, setPlay] = useState(false);

  const onVideo = () => {
    if (play) {
      videoRef.current.pause();
      setPlay(false)
      setShowPlayerIcons(true);
    }
    else {
      videoRef.current.play();
      setPlay(true)
    }
  }

  const onIcons = () => {
    setShowPlayerIcons(!showPlayerIcons);
  }

  const fetchRecommend = async () => {
    try {
      const series = await GetRecommendSeries();
      if (series) {
        const episode = Math.floor(1 + Math.random() * 4)
        setUrl(`${series.BaseURL}/1.mp4`);
        setVideo(series);
        setShowPlayerIcons(true);
        videoRef.current.play();
        const user = GetUser()
        if (user) {
          RecordHistory(user.ID, parseInt(series.ID), episode)
        }
      }
    } catch (error) {
      console.error('Error fetching recommend:', error);
    }
  };

  useEffect(() => {
    fetchRecommend();
  }, []);

  const handlers = useSwipeable({
    onSwiped: () => setShowPlayerIcons(false),
    onSwipedDown: fetchRecommend,
    onSwipedUp: fetchRecommend,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} style={{
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      zIndex: 20,
      backgroundColor: '#111',
    }}>
      {url && <video
        src={url}
        loop
        playsInline
        onClick={onIcons}
        ref={videoRef}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />}
      {video && <StopIcons stop={play} click={onVideo} />}
      {video && showPlayerIcons && <SeriesName name={video.Name} />}
      {video && showPlayerIcons && <PlayerIcons seriesId={video.ID} />}

      {showPlayerIcons && <BottomNavigation showLabels style={{ position: 'fixed', bottom: 0, height: '8vh', width: '100%', backgroundColor: '#111', color: 'white', borderTop: 'none', boxShadow: 'none', zIndex: 10 }}>
        <BottomNavigationAction label="Home" style={{ color: 'white' }} icon={<HomeIcon />} component={Link} to="/" />
        <BottomNavigationAction label="Recommend" style={{ color: 'white' }} icon={<PlayCircleOutlineIcon />} component={Link} to="/recommend" />
        <BottomNavigationAction label="Profile" style={{ color: 'white' }} icon={<PersonOutlineIcon />} component={Link} to="/profile" />
      </BottomNavigation>}
    </div>
  );
};

export default Recommend;
