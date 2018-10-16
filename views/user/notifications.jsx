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
          profileURL = '/profile'
        }

        const notifications = this.props.notify.map((notification) => {
            let idURL='user_'+this.props.cookies.userId;
            let valueURL = notification.user_id;
            return (
                <div class='request'>
                {notification.username} wants to be your {notification.category} buddy at {notification.locname} at {notification.selectedtime}
                <br/>
                <button id ={idURL} value={valueURL}> chat with {notification.username}</button>

                </div>
                );
        });

        return (
          <DefaultLayout title = "Taskbuddy" >
          <div class='topbar'>
            <form method ='POST' action={logoutURL}>
            <input type= 'submit' value={logout}/>
            </form>

            <form method='GET' action={profileURL}>
            <input type='submit' value ={profile}/>
            </form>

            <form method ='GET' action ='/user/notification'>
            <input type='submit' value ='Alerts'/>
            </form>

            <form method ='GET' action ='/'>
            <input type='submit' value ='Home'/>
            </form>
            </div>
          {notifications}

          <Chat />
            </DefaultLayout>
        );
    }
}

module.exports = Notifications;