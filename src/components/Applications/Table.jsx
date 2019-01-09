import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import LinkIcon from '@material-ui/icons/InsertLink'
import EditApplicationModal from './EditApplicationModal'

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function sortDate(data, order) {
  let results = data.sort(function (a, b) {
    return new Date(b.date_applied) - new Date(a.date_applied);
  });
  if (order === 'asc') {
    results = [].concat(results).reverse();
  }
  return results
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'date_applied', numeric: false, disablePadding: false, label: 'Date Applied' },
  { id: 'position', numeric: true, disablePadding: false, label: 'Position' },
  { id: 'company', numeric: true, disablePadding: false, label: 'Company' },
  { id: 'contact_name', numeric: true, disablePadding: false, label: 'Contact' },
  { id: 'posting_url', numeric: true, disablePadding: true, label: '' },
  { id: 'delete', numeric: true, disablePadding: true, label: '' },
  { id: 'edit', numeric: true, disablePadding: true, label: '' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    width: '95%',
    margin: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  icon: {
    padding: 10,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[700],
    },
  },
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'date',
    page: 0,
    rowsPerPage: 5,
    open: false,
    selectedApp: {},
    editMode: false,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleClickOpen = (n) => {
    this.setState({
      open: true,
      selectedApp: n
    });
  };

  handleEditOpen =  (application) => {
    this.setState({ editMode: true, selectedApp: application });
  }

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode});
  }

  handleClose = () => {
    this.setState({
      open: false,
      selectedApp: ''
   });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleDelete = (id) => {
    this.props.dispatch({ type: 'DELETE_APPLICATION', payload: { id } })
  }

  render() {
    const { classes } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const data = this.props.applications
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <colgroup>
                <col style={{ width: '10%' }} />
                <col style={{ width: '26%' }} />
                <col style={{ width: '26%' }} />
                <col style={{ width: '26%' }} />
                <col style={{ width: '4%' }} />
                <col style={{ width: '4%' }} />
                <col style={{ width: '4%' }} />
              </colgroup>
              <TableBody>
                {orderBy === 'date_applied' ?
                  sortDate(data, order)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(n => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={n.id}
                        >
                          <TableCell component="th" scope="row" onClick={() => this.handleClickOpen(n)}>{n.date_applied}</TableCell>
                          <TableCell align="right" onClick={() => this.handleClickOpen(n)}>{n.position}</TableCell>
                          <TableCell align="right" onClick={() => this.handleClickOpen(n)}>{n.company}</TableCell>
                          <TableCell align="right" onClick={() => this.handleClickOpen(n)}>{
                            (n.contact_name) ?
                            n.contact_name
                            :
                            ''
                          }</TableCell>
                          <TableCell align="right" className={classes.icon}>
                            <LinkIcon />
                          </TableCell>
                          <TableCell align="right" className={classes.icon} onClick={() => this.handleDelete(n.id)}>
                            <DeleteIcon />
                          </TableCell>
                          <TableCell align="right" className={classes.icon} onClick={()=>this.handleEditOpen(n)}>
                            <EditIcon />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  :
                  stableSort(data, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(n => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={n.id}
                        >
                          <TableCell component="th" scope="row" onClick={() => this.handleClickOpen(n)}>{n.date_applied}</TableCell>
                          <TableCell align="right" onClick={() => this.handleClickOpen(n)}>{n.position}</TableCell>
                          <TableCell align="right" onClick={() => this.handleClickOpen(n)}>{n.company}</TableCell>
                          <TableCell align="right" onClick={() => this.handleClickOpen(n)}>{
                            (n.contact_name) ?
                              n.contact_name
                              :
                              ''
                          }</TableCell>
                          <TableCell align="right" className={classes.icon}>
                            <LinkIcon />
                          </TableCell>
                          <TableCell align="right" className={classes.icon} onClick={() => this.handleDelete(n.id)}>
                            <DeleteIcon />
                          </TableCell>
                          <TableCell align="right" className={classes.icon} onClick={() => this.handleEditOpen(n)}>
                            <EditIcon />
                          </TableCell>
                        </TableRow>
                      );
                    })
                }
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Comments</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
               {this.state.selectedApp.comments}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary" autoFocus>
                Cancel
            </Button>
            </DialogActions>
          </Dialog>
        </div>

        { this.state.editMode  ?
          <EditApplicationModal application={this.state.selectedApp} toggleEditMode={this.toggleEditMode}/>
        :
          null
        }
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  applications: state.applications,
  user: state.user,
  contacts: state.contacts,
})

export default connect(mapStateToProps)(withStyles(styles)(EnhancedTable));
