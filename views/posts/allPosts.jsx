var React = require("react");
var DefaultLayout = require('../layout/default');

class AllPosts extends React.Component {
    render() {
        const posts = this.props.posts.map((post) => {
            return ( <li> {post.category} </li> );
        });
        return (
          <DefaultLayout title = "Taskbuddy" >

            <h1 > {posts} </h1>

            </DefaultLayout>
        );
    }
}

module.exports = AllPosts;