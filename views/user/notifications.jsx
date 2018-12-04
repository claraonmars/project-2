var React = require("react");
var DefaultLayout = require('../layout/default');
var Chat = require('../user/chat');

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
          profileURL = '/profile'
        }

        const notifications = this.props.notify.map((notification) => {
            let idURL='user_'+this.props.cookies.userId;
            let valueURL = notification.user_id;
            return (
                <div class='request'>
                {notification.username} wants to be your {notification.category} buddy at {notification.locname} at {notification.selectedtime}
                <br/>
                <form class='formcheck'>
                <input class='chat' type='submit' value='Chat' name={notification.user_id}/>
                </form>

                </div>
                );
        });

        return (
          <DefaultLayout title = "Taskbuddy" login={logout} loginURL={logoutURL} profile={profileURL} >
          <div class="header row justify-content-center">
            <div class='col-8 borderline'>
            {notifications}
            </div>
        </div>

          <Chat />
            </DefaultLayout>
        );
    }
}

module.exports = Notifications;