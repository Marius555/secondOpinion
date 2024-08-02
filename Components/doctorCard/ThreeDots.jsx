"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ReportModal from './ReportModal';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

export default function ThreeDots({ ident }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [report, setreport] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleModalReport = () => {
    setreport(true)
    setAnchorEl(null);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}

      >
        <MenuItem onClick={handleModalReport} sx={{display: "flex", flexDirection: "row", gap: "5px"}}>
          <ReportGmailerrorredIcon sx={{color: "red"}}/>
          Report
        </MenuItem>
      </Menu>
      <ReportModal ident={ident} setreport={setreport} report={report}  />

    </div>
  );
}