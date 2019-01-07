import React, { Component } from 'react'
import ContactTable from './ContactTable'
import ContactModal from './ContactModal'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  header: {
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#686A6C',
    padding: theme.spacing.unit * 3,
  },
});

class Contacts extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.header} variant="h4" gutterBottom>
          Contacts
        </Typography>
        <ContactModal />
        <ContactTable />
      </div>
    )
  }
}

export default withStyles(styles)(Contacts)
