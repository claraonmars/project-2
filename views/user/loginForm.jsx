var React = require("react");
var DefaultLayout = require('../layout/default');

class LoginForm extends React.Component {
  render() {
    return (
        <DefaultLayout title="Login">


          <form method ='POST' action='/login/success'>

          Username:<input name='name' type='text'/><br/>
          Password:<input name="password" type="text" />

          <input type='submit' name ='Login' />
          </form>

        </DefaultLayout>
    );
  }
}

module.exports = LoginForm;
