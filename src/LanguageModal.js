import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Box } from '@mui/material';
import { SetLanguage } from './word';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#222',
  boxShadow: 24,
  p: 4,
  opacity: 0.8,
};

const LanguageModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const languages = {
    "English": "EN",
    "繁体中文": "CN",
    "Tiếng Việt": "VN",
    "แบบไทย": "TH",
    "Filipino": "TL",
    "عربي": "AE",
    "bahasa Indonesia": "ID",
    "മലേഷ്യൻ": "MS",
    "español": "ES",
  }

  const handleClick = (value) => {
    SetLanguage(value)
    navigate("/");
    onClose(true)
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="language-selection-title"
      aria-describedby="language-selection-description"
    >
      <Box sx={style}>
        <div className="flex flex-col items-center justify-center">
          {Object.entries(languages).map(([key, value]) => (
            <button
              key={value}
              className="my-2 py-2 px-4 rounded text-white font-medium transition duration-150 ease-in-out transform"
              style={{ backgroundColor: '#555', width: '50%' }}
              onClick={() => handleClick(value)}
            >
              {key}
            </button>
          ))}
        </div>
      </Box>
    </Modal>
  );
};

export default LanguageModal;
