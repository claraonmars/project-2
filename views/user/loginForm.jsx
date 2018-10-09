var React = require("react");

class LoginForm extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>

          <form method ='POST' action='/login/success'>

          Username:<input name='name' type='text'/><br/>
          Password:<input name="password" type="text" />

          <input type='submit' name ='Login' />
          </form>

        </body>
      </html>
    );
  }
}

module.exports = LoginForm;
