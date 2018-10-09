var React = require("react");
var DefaultLayout = require('../layout/default');

class Home extends React.Component {
  render() {
    return (
        <DefaultLayout title="Taskbuddy">


          <form action='/login' method ='GET'>
          <input type='submit' value ='Login' />
          </form>

          <form action='/register' method ='GET'>
          <input type='submit' value ='Register' />
          </form>

        </DefaultLayout>
    );
  }
}

module.exports = Home;
