import { styled } from '@mui/material/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

const StyledList = styled(List)({
  marginTop: 20,
});

const ProtocolManager = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    router.push(`/${option}`);
  };

  return (
    <>
      <StyledDrawer variant="permanent" anchor="left">
        <StyledList>
          <ListItem button selected={selectedOption === ''} onClick={() => handleOptionClick('dashboard')}>
            <ListItemIcon>
              <DashboardIcon color={selectedOption === '' ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button selected={selectedOption === 'initialize-vault'} onClick={() => handleOptionClick('vaultmanagement')}>
            <ListItemIcon>
              <AddCircleIcon color={selectedOption === 'initialize-vault' ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Vault Management" />
          </ListItem>
          <ListItem button selected={selectedOption === 'approve-borrowers'} onClick={() => handleOptionClick('dashboard')}>
            <ListItemIcon>
              <CheckCircleIcon color={selectedOption === 'approve-borrowers' ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Approve Borrowers" />
          </ListItem>
          <ListItem button selected={selectedOption === 'verify-members'} onClick={() => handleOptionClick('verification')}>
            <ListItemIcon>
              <PersonAddIcon color={selectedOption === 'verify-members' ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Verify New Members" />
          </ListItem>
        </StyledList>
      </StyledDrawer>

    </>
  );
};

export default ProtocolManager;
