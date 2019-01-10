import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  header: {
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#686A6C',
    padding: theme.spacing.unit * 3,
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 3,
  },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class Resources extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.header} variant="h4" gutterBottom>
          Resources
        </Typography>
        <div className={classes.root}>
          <Typography variant="h5" gutterBottom>
            Tech Meetups
          </Typography>
          <List>
            <ListItemLink href="https://www.google.com">
              <ListItemText primary="Hyperlink"/>
            </ListItemLink>
            <ListItemLink href="https://www.google.com">
              <ListItemText primary="Hyperlink"/>
            </ListItemLink>
            <ListItemLink href="https://www.google.com">
              <ListItemText primary="Hyperlink" />
            </ListItemLink>
            <ListItemLink href="https://www.google.com">
              <ListItemText primary="Hyperlink" />
            </ListItemLink>
            <ListItemLink href="https://www.google.com">
              <ListItemText primary="Hyperlink" />
            </ListItemLink>
          </List>
        </div>
        <div className={classes.root}>
          <Typography variant="h5" gutterBottom>
            Job Boards
          </Typography>
          <List>
            <ListItemLink href="https://www.google.com">
              <ListItemText primary="Hyperlink" />
            </ListItemLink>
            <ListItemLink href="https://www.google.com">
              <ListItemText primary="Hyperlink" />
            </ListItemLink>
            <ListItemLink href="https://www.google.com">
              <ListItemText primary="Hyperlink" />
            </ListItemLink>
            <ListItemLink href="https://www.google.com">
              <ListItemText primary="Hyperlink" />
            </ListItemLink>
            <ListItemLink href="https://www.google.com">
              <ListItemText primary="Hyperlink" />
            </ListItemLink>
          </List>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Resources)
