var React = require("react");
var DefaultLayout = require('../layout/default');

class AllPosts extends React.Component {
    render() {
        let button
        let actionURL

        if (this.props.cookies.status === 'loggedIn'){
          button = 'Logout'
          actionURL = '/logout' + '?_method=DELETE';
        }

        const posts = this.props.posts.map((post) => {
            return ( <li> {post.category} at {post.location}  </li> );
        });
        return (
          <DefaultLayout title = "Taskbuddy" >

            <div class='topbar'>
            <form method ='POST' action={actionURL}>
            <input type= 'submit' value={button}/>
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
            <article> {posts} </article>

            </DefaultLayout>
        );
    }
}

module.exports = AllPosts;