var React = require("react");
var DefaultLayout = require('../layout/default');
var Chat = require('../user/chat');


class AllPosts extends React.Component {
    render() {
        let logout
        let logoutURL
        let profile
        let profileURL
        let posts

        if (this.props.cookies.status === 'loggedIn'){
          logout = 'Logout'
          logoutURL = '/logout' + '?_method=DELETE';
          profile =' Profile'
          profileURL = '/profile'
        }
        else{
            logout='Login'
            logoutURL = '/login'
        }

        if (this.props.posts === undefined){
            posts= ''
        }else{
         posts = this.props.posts.map((post) => {
            let actionURL = '/user/accept/' + post.post_id;

            for (var i=0; i<this.props.schedule.length; i++){
                if(this.props.schedule[i].post_id === post.post_id){
                    actionURL = '/user/remove/' +post.post_id + '?_method=DELETE'

                }
            }

            let userURL = '/profile/' + post.user_id;

            return (
                <div class='row request-item justify-content-center'>

                    <div class="col-6">
                        Location: {post.locname}<br/>
                        Time: {post.selectedtime}<br/>
                        <a href={userURL}>{post.username}</a>&nbsp; is looking for a {post.category} buddy!
                        <br/><br/>
                        <div class='more'>
                        {post.details}
                        </div>
                    </div>

                    <div class="col-4">
                        <form method = 'POST' name='select_task' action = {actionURL}>
                            <input type='hidden' id ='postid' name='post_id' value ={post.post_id}/>
                            <input type='submit' id= {post.post_id} class='selected' value='Become task buddy'/>
                        </form>
                    </div>
                </div>
                );
        });
    }
        return (
          <DefaultLayout title = "Taskbuddy" login={logout} loginURL={logoutURL} profile={profileURL}>

            <div class="header_img">
                <div className="copy">
                <h2>Find a task buddy!</h2>
                <div class="row justify-content-center postOpt">
                    <div className="posts col-3">
                        <form action='/post/lunch' method ='GET'>
                        <input type='submit' value ='Lunch Buddy' />
                        </form>
                    </div>

                    <div className="posts col-3">
                        <form action='/post/gym' method ='GET'>
                        <input type='submit' value ='Gym Buddy' />
                        </form>
                    </div>

                    <div className="posts col-3">
                        <form action='/post/coffee' method ='GET'>
                        <input type='submit' value ='Coffee Buddy' />
                        </form>
                    </div>
                </div>

                <div class="row justify-content-center postOpt">
                    <div className="posts col-3">
                        <form action='/post/pokemon-go' method ='GET'>
                        <input type='submit' value ='Pokemon Go Buddy' />
                        </form>
                    </div>

                    <div className="posts col-3">
                        <form action='/post/smokebreak' method ='GET'>
                        <input type='submit' value ='Smokebreak Buddy' />
                        </form>
                    </div>

                    <div className="posts col-3">
                        <form action='/post/errand' method ='GET'>
                        <input type='submit' value ='Errand Buddy' />
                        </form>
                    </div>
                </div>
            </div>
            </div>

            <div class='article' id='artfeed'>
            <div class='copy'>
            <h2>Be someone's task buddy!</h2>

            {posts}
            </div>

            </div>

            <Chat />

            </DefaultLayout>
        );
    }
}

module.exports = AllPosts;