import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { GetUser } from './cache';
import { Checkin, GetIfChecked } from './service';

export default function CheckIcon() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    let isMounted = true;
    const checkUserStatus = async () => {
      const storedUser = GetUser();
      if (storedUser) {
        const checked = await GetIfChecked(storedUser.ID);
        if (!checked && isMounted) {
          setOpen(true);
        }
      } else {
        if (isMounted) {
          setOpen(true);
        }
      }
    };
    const timer = setTimeout(checkUserStatus, 510);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const handlePromotionClick = async () => {
    handleClose();
    const storedUser = GetUser();
    if (storedUser) {
      await Checkin(storedUser.ID)
      navigate(`/profile`);
    } else {
      navigate(`/profile`);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 200,
    bgcolor: 'transparent',
    border: 'none',
    boxShadow: 0,
    p: 4,
    outline: 'none',
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} onClick={e => e.stopPropagation()}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 25,
              top: 25,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              backgroundImage: 'linear-gradient(to right, #205, #502)',
              borderRadius: '5px',
            }}
            onClick={handlePromotionClick}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MonetizationOnIcon style={{ color: '#fa7' }} />
              <h1 style={{ margin: '10px', fontWeight: 'bold', fontSize: '18px', color: 'white' }}>Get 10 Free Coins</h1>
            </div>
            <Button
              variant="outlined"
              onClick={handlePromotionClick}
              style={{ color: 'white', borderColor: '#f35', width: '75%', height: '40px', borderRadius: '12px', textTransform: 'none' }}
            >
              Check in today!
            </Button>
            <div style={{
              position: 'absolute',
              top: 25,
              left: 50,
              backgroundColor: '#f35',
              color: 'white',
              padding: '3px 9px',
              fontSize: '14px',
              fontWeight: 'bold',
              zIndex: 100,
              borderRadius: '5px'
            }}>
              Daily Bonus
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
