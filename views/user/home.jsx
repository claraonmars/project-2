var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>

          <form action='/login' method ='GET'>
          <input type='submit' value ='Login' />
          </form>

          <form action='/register' method ='GET'>
          <input type='submit' value ='Register' />
          </form>

        </body>
      </html>
    );
  }
}

module.exports = Home;
