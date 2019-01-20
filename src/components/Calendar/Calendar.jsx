import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import AddEventModal from './AddEventModal';

import './Calendar.css';

const localizer = BigCalendar.momentLocalizer(moment)

const Container = styled.div`
 text-align: center;
`;

const styles = theme => ({
  header: {
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#686A6C',
    padding: theme.spacing.unit * 3,
  },
  calendar: {
    height: 700,
    margin: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit * 3,
  },
});

class Calendar extends Component {

  componentDidMount() {
    //Fetch events from database here
  }
  
  render() {
    const cal_events = [
      {
        title: 'test',
        start: new Date(),
        end: new Date(),
      }
    ]
    console.log(cal_events);

    const { classes } = this.props;
    return (
      <div >
        <div>
          <Typography className={classes.header} variant="h4" gutterBottom>
            Calendar
          </Typography>
        </div>
        <Container>
          <div>
            <AddEventModal />
          </div>
        </Container>
        <br />
        <div className={classes.calendar}>
          <BigCalendar
            localizer={localizer}
            events={cal_events}
            step={30}
            defaultView='week'
            views={['month', 'week', 'day']}
            defaultDate={new Date()}
            // selectable={true}
          />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Calendar);
