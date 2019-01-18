import moment from "moment";

const TODAY = moment(new Date())

const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      let notificationArray = action.payload.filter(function (application) {
        const DATE_APPLIED = moment(application.date_applied)
        let duration = moment.duration(TODAY.diff(DATE_APPLIED));
        var days = duration.asDays();
        return application.notification_sent === false &&
                days > 10
      });
      return notificationArray;
    default:
      return state;
  }
};

export default notificationsReducer;
