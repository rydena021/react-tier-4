import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import RESOURCES from './data'

const styles = theme => ({
  header: {
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#686A6C',
    padding: theme.spacing.unit * 3,
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 3,
    width: '95%',
    margin: theme.spacing.unit * 3,
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
          <Typography variant="h4" gutterBottom>
            Tech Meetups
          </Typography>
          <List>
            { RESOURCES.tech_meetups.map( item => {
              return (
                <ListItemLink href={item.url} target="_blank">
                  <ListItemText primary={item.name}/>
                </ListItemLink>
              )
            })}
          </List>
        </div>

        <div className={classes.root}>
          <Typography variant="h4" gutterBottom>
            Job Boards
          </Typography>
          <List>
            {RESOURCES.job_boards.map(item => {
              return (
                <ListItemLink href={item.url} target="_blank">
                  <ListItemText primary={item.name} />
                </ListItemLink>
              )
            })}
          </List>
        </div>

        <div className={classes.root}>
          <Typography variant="h4" gutterBottom>
            Staffing Firms
          </Typography>
          <List>
            {RESOURCES.staffing_firms.map(item => {
              return (
                <ListItemLink href={item.url} target="_blank">
                  <ListItemText primary={item.name} />
                </ListItemLink>
              )
            })}
          </List>
        </div>

      </div>
    )
  }
}

export default withStyles(styles)(Resources)
