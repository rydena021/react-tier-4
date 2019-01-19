import React from 'react';
import { HashRouter as Router, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventIcon from '@material-ui/icons/Event';
import LinkIcon from '@material-ui/icons/Link';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ContactIcon from '@material-ui/icons/ContactPhone';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from '@material-ui/core/styles';
import Content from './Content'
import './App.css'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux'
import Snackbar from '../Snackbar/Snackbar'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#F3F3F4'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
    color: '#ffffff',
    backgroundColor: '#4AA79E',
    paddingTop: 5,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 1,
    cursor: 'pointer',
    borderRadius: 5,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 3,
  },
  navLogo: {
    flexGrow: 1,
    color: '#222222'
  },
  navMenu: {
    color: '#222222',
    '&:hover': {
      backgroundColor: theme.palette.grey[400],
    },
    padding: theme.spacing.unit * 3,
  },
  profileButton: {
    outline: 'none',
  },
});

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#4AA79E'
    },
    secondary: {
      main: '#F3F3F4'
    },
    default: {
      main: '#686A6C'
    },
    background: {
      paper: '#222222',
      default: "#F3F3F4"
    },
  },
  typography: {
    useNextVariants: true,
  },
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    anchorEl: null,
  };

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.props.dispatch({ type: 'LOGOUT' })
    this.handleClose()
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    let menuDisplayName;
    this.props.user.first_name ?
    menuDisplayName = this.props.user.first_name + ' ' + this.props.user.last_name
    :
    menuDisplayName = this.props.user.username
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={classNames(classes.appBar, {
                [classes.appBarShift]: this.state.open,
              })}
            >
              <Toolbar disableGutters={!this.state.open}>
                <div
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, {
                    [classes.hide]: this.state.open,
                  })}
                >
                  <MenuIcon />
                </div>
                <Typography variant="h6" color="primary" noWrap className={classes.navLogo}>
                  Tier 4
                </Typography>
                <Button
                  aria-owns={anchorEl ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                  className={classes.navMenu}
                >
                  {menuDisplayName || ''}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <Link className={classes.profileButton} to="/dashboard">
                    <MenuItem onClick={this.handleClose}>My Profile</MenuItem>
                  </Link>
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              className={classNames(classes.drawer, {
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              })}
              classes={{
                paper: classNames({
                  [classes.drawerOpen]: this.state.open,
                  [classes.drawerClose]: !this.state.open,
                }),
              }}
              open={this.state.open}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronRightIcon />
                </IconButton>
              </div>
              <Divider />
              <List>
                <Link to="/dashboard">
                  <ListItem button key='dashboard'>
                    <ListItemIcon><AccountIcon /></ListItemIcon>
                    <ListItemText primary={'Dashboard'} />
                  </ListItem>
                </Link>
                <Link to="/applications">
                  <ListItem button key='applications'>
                    <ListItemIcon><AssignmentIcon /></ListItemIcon>
                    <ListItemText primary={'Applications'} />
                  </ListItem>
                </Link>
                <Link to="/contacts">
                  <ListItem button key='contacts'>
                    <ListItemIcon><ContactIcon /></ListItemIcon>
                    <ListItemText primary={'Contacts'} />
                  </ListItem>
                </Link>
                <Link to="/calendar">
                  <ListItem button key='Calendar'>
                    <ListItemIcon><EventIcon /></ListItemIcon>
                    <ListItemText primary={'Calendar'} />
                  </ListItem>
                </Link>
                <Link to="/documents">
                  <ListItem button key='Documents'>
                    <ListItemIcon><InsertDriveFileIcon /></ListItemIcon>
                    <ListItemText primary={'Documents'} />
                  </ListItem>
                </Link>
                <Link to="/resources">
                  <ListItem button key='Resources'>
                    <ListItemIcon><LinkIcon /></ListItemIcon>
                    <ListItemText primary={'Resources'} />
                  </ListItem>
                </Link>
              </List>
            </Drawer>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Content />
              <Snackbar />
            </main>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(MiniDrawer))
