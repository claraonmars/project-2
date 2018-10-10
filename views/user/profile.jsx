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

        console.log('now look at this:',this.props.requests);
        const requests = this.props.requests.map((requests) => {
            let url = '/post/' + requests.post_id + '/edit'
            let deleteURL = '/post/' + requests.post_id + '?_method=DELETE'
            return (
                <div class='request'>
                {requests.category}:{requests.details} at {requests.location} at {requests.selectedtime}
                <br/>
                <form method ='GET' action = {url}>
                <input type ='submit' value='edit'/>
                </form>

                <form method ='POST' action = {deleteURL}>
                <input type ='submit' value='Remove'/>
                </form>
                </div> );
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
            </div>
            <article>

            Welcome back {this.props.cookies.name}<br />

            Current requests: {requests}


            </article>

            </DefaultLayout>
        );
    }
}

module.exports = Profile;