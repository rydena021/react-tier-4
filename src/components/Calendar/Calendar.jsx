import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import AddEventModal from './AddEventModal';
import './Calendar.css';

const CALENDAR_EVENTS = [
  {
    id: 1,
    title: 'Interview at SPS',
    start: new Date(2019, 0, 24, 13, 0, 0, 0),
    end: new Date(2019, 0, 24, 14, 30, 0, 0),
  },
  {
    id: 2,
    title: 'Phone Interview for Target',
    start: new Date(2019, 0, 25, 8, 0, 0, 0),
    end: new Date(2019, 0, 25, 9, 30, 0, 0),
  },
  {
    id: 3,
    title: 'React Meet Up',
    start: new Date(2019, 0, 23, 18, 0, 0, 0),
    end: new Date(2019, 0, 23, 20, 0, 0, 0),
  },
  {
    id: 4,
    title: 'Solo Project Presentation',
    start: new Date(2019, 0, 21, 10, 0, 0, 0),
    end: new Date(2019, 0, 21, 12, 0, 0, 0),
  },
]
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
            events={CALENDAR_EVENTS}
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
