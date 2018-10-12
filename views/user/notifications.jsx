var React = require("react");
var DefaultLayout = require('../layout/default');
var Chat = require('./chat');

class Notifications extends React.Component {
    render() {
        let logout
        let logoutURL
        let profile
        let profileURL

        if (this.props.cookies.status === 'loggedIn'){
          logout = 'Logout'
          logoutURL = '/logout' + '?_method=DELETE';
          profile =' Profile'
          profileURL = '/user'
        }

        const notifications = this.props.notify.map((notification) => {

            return (
                <div>
                {notification.username} wants to be your task buddy for {notification.category} at {notification.location}, {notification.selectedtime}
                <div>
                <a href ='/user/chat'>chat</a></div>
                </div> );
        });

        return (
          <DefaultLayout title = "Taskbuddy" >
          {notifications}

          {Chat}
            </DefaultLayout>
        );
    }
}

module.exports = Notifications;