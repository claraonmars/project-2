var React = require("react");
var DefaultLayout = require('../layout/default');

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
          profileURL = '/user'

        }

        if (this.props.posts === undefined){
            posts= ''
        }else{
         posts = this.props.posts.map((post) => {
            let actionURL = '/user/accept/' + post.post_id;
            console.log(post.post_id);
            return (
                <div class='request-item'>
                {post.category} at {post.location}

                <form method = 'POST' name='select_task' action ={actionURL}>
                    <input type='hidden' id ='postid' name='post_id' value ={post.post_id}/>
                    <input type='submit' id= 'selected' value='Become task buddy'/>
                </form>
                </div>
                );
        });
    }
        return (
          <DefaultLayout title = "Taskbuddy" >

            <div class='topbar'>
            <form method ='POST' action={logoutURL}>
            <input type= 'submit' value={logout}/>
            </form>

            <form method='GET' action={profileURL}>
            <input type='submit' value ={profile}/>
            </form>

            <form method ='GET' action ='/'>
            <input type='submit' value ='Home'/>
            </form>
            </div>
            <article>

            <form action='/post/lunch' method ='GET'>
            <input type='submit' value ='Lunch Buddy' />
            </form>

            <form action='/post/gym' method ='GET'>
            <input type='submit' value ='Gym Buddy' />
            </form>

            <form action='/post/coffee' method ='GET'>
            <input type='submit' value ='Coffee Buddy' />
            </form>

            <form action='/post/pokemon-go' method ='GET'>
            <input type='submit' value ='Pokemon Go Buddy' />
            </form>

            <form action='/post/smokebreak' method ='GET'>
            <input type='submit' value ='Smokebreak Buddy' />
            </form>

            <form action='/post/errand' method ='GET'>
            <input type='submit' value ='Errand Buddy' />
            </form>


            </article>
            <article>
            {posts}
            </article>

            </DefaultLayout>
        );
    }
}

module.exports = AllPosts;