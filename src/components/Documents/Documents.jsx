import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';
import AddDocumentModal from './AddDocumentModal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux'

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

class Documents extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DOCUMENTS' })
  }

  render() {
    const { classes, documents } = this.props;
    return (
      <div >
        <div>
          <Typography className={classes.header} variant="h4" gutterBottom>
            Documents
          </Typography>
        </div>
        <AddDocumentModal />
        <div className={classes.root}>
          {documents.length === 0 ?
            <Typography variant="h6" gutterBottom>
              <em>None</em>
            </Typography>
            :
            documents.map((document, i) => {
              return (
                <ListItemLink key={i} href={document.document_url} target="_blank">
                  <ListItemText primary={document.document_name} />
                </ListItemLink>
              )
            })
          }
          <List>
          </List>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  documents: state.documents,
})

export default connect(mapStateToProps)(withStyles(styles)(Documents));
