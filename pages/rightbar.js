import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Menu as MenuIcon, Close as CloseIcon, Inbox as InboxIcon, Mail as MailIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: 240,
  },
}));

const RightBar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        className={classes.menuButton}
        onClick={toggleDrawer}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <div className={classes.drawer}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Mail" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default RightBar;
