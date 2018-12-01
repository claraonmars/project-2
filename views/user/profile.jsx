var React = require("react");
var DefaultLayout = require('../layout/default');
var Chat = require('../user/chat');


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
          profileURL = '/profile'
        }

        const requests = this.props.requests.map((requests) => {
            let url = '/post/' + requests.post_id + '/edit'
            let deleteURLone = '/post/' + requests.post_id + '?_method=DELETE'
            return (
                <div class='request'>
                {requests.category} buddy<br/>
                {requests.details} at {requests.locname} at {requests.selectedtime}
                <br/>
                <form method ='GET' action = {url}>
                <input type ='submit' value='Edit'/>
                </form>

                <form method ='POST' action = {deleteURLone}>
                <input type ='submit' value='Remove'/>
                </form>
                </div> );
        });

        const accepted = this.props.accepted.map((accepted) => {
            let deleteURL = '/post/remove/' + accepted.post_id + '?_method=DELETE'
            return (
                <div class='request'>
                {accepted.username}'s {accepted.category} buddy<br/>
                {accepted.details} at {accepted.locname} at {accepted.selectedtime}
                <br/>

                <form>
                <input class='chat' type ='submit' value='chat' name={accepted.user_id}/>
                </form>

                <form method ='POST' action = {deleteURL}>
                <input type ='submit' value='Remove'/>
                </form>
                </div> );
        });

        return (
          <DefaultLayout title = "Taskbuddy" login={logout} loginURL={logoutURL} profile={profileURL} >

            <article>

            <div class='header'>
            Welcome back {this.props.cookies.name}<br /><br />

            <form method="post" enctype="multipart/form-data" action="/upload">
            <input type="file" name="imagefile" />
            <input type="submit" value="Submit"/>
            </form>
            </div>

            <div class='request'>Still looking for buddies for these tasks:</div>
            {requests}

            <hr/>
            <div class='request'>Your scheduled tasks:</div>
            {accepted}


            </article>

            <Chat />

            </DefaultLayout>
        );
    }
}

module.exports = Profile;