var React = require("react");
var DefaultLayout = require('../layout/default');

class Profile extends React.Component {
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
        else{
            logout='Login'
            logoutURL = '/login'
        }

        let userinfo= this.props.user[0]
        const requests = this.props.requests.map((requests) => {
            return (
                <div class='request'>
                {requests.category} buddy<br/>
                {requests.details} at {requests.locname} at {requests.selectedtime}
                <br/>

                </div> );
        });

        return (
          <DefaultLayout title = "Taskbuddy" login={logout} loginURL={logoutURL} profile={profileURL} >
            <div className="article">
            user: {userinfo.username}<br/>
            name: {userinfo.firstname}<br/>
            Looking for a buddy:<br/>
            {requests}
            </div>
            </DefaultLayout>
        );
    }
}

module.exports = Profile;