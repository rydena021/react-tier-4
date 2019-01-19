import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddContactModal from './AddContactModal'
import EditContactModal from './EditContactModal'
import ContactCard from './ContactCard'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  header: {
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#686A6C',
    padding: theme.spacing.unit * 3,
  },
  image: {
    borderRadius: '50%'
  },
});

class ContactsPage extends Component {
  state = {
    editMode: false
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CONTACTS' })
  }

  handleEditOpen = (contact) => {
    this.setState({ editMode: true, selectedContact: contact });
  }

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  }

  render() {
    const { classes, contacts } = this.props;
    return (
      <div>
        <div>
          <Typography className={classes.header} variant="h4" gutterBottom>
            Contacts
            </Typography>
        </div>
        <AddContactModal/>
        <div className={classes.root}>
          {contacts.map( contact => {
            return (
              <Grid key={contact.id} container spacing={24}>
                <Grid item md={1}></Grid>
                <Grid item xs={12} md={3}>
                  <a href={contact.linkedin_url || '#/contacts'} target={contact.linkedin_url ? '_blank' : ''}>
                    <img className={classes.image} src={contact.avatar_url} alt="" height='235px' width='235px'/>
                  </a>
                </Grid>
                <Grid item xs={12} md={7}>
                  <ContactCard contact={contact} handleEditOpen={this.handleEditOpen}/>
                </Grid>
                <Grid item md={1}></Grid>
            </Grid>
            )
          })}
        </div>
        {this.state.editMode ?
          <EditContactModal contact={this.state.selectedContact} toggleEditMode={this.toggleEditMode} />
          :
          null
        }
      </div>
    );
  }
}

ContactsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  contacts: state.contacts
})

export default connect(mapStateToProps)(withStyles(styles)(ContactsPage));
