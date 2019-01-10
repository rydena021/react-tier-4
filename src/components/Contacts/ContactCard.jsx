import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'

const styles = theme => ({
  card: {
    minWidth: 275,
    height: 225,
    padding: theme.spacing.unit,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    marginTop: theme.spacing.unit,
  },
});

class SimpleCard extends React.Component {
  handleDelete = (id) => {
    var result = window.confirm("Want to delete?");
    if (result) {
      this.props.dispatch({ type: "DELETE_CONTACT", payload: id })
    }
  }
  render() {
    const { classes, contact } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {contact.first_name + ' ' + contact.last_name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {contact.company}
          </Typography>
          <Typography component="p">
            <strong>Phone:</strong> {contact.phone}
          </Typography>
          <Typography component="p">
            <strong>Email:</strong> {contact.email}
          </Typography>
          <Typography component="p">
            <strong>Date Met:</strong> {contact.date_met}
          </Typography>
          <Typography component="p">
            <strong>Comments:</strong> {contact.comments}
          </Typography>
          <Button onClick={() => this.props.handleEditOpen(contact)} size="small" variant="contained" color="primary" className={classes.button}>Edit</Button>
          {'  '}
          <Button onClick={() => this.handleDelete(contact.id)} size="small" variant="contained" color="secondary" className={classes.button}>Delete</Button>
        </CardContent>
      </Card>
    )
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(SimpleCard));
