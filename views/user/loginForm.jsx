var React = require("react");
var DefaultLayout = require('../layout/default');

class LoginForm extends React.Component {
  render() {
    return (
        <DefaultLayout title="Login">


          <form method ='POST' action='/login/success'>
          Username:<input name='username' type='text'/><br/>
          Password:<input name="password" type="text" />
          <input type='submit' name ='Login' />
          </form>

          <form method='GET' action ='/register'>
          <input type='submit' value='register'/>
          </form>

        </DefaultLayout>
    );
  }
}

module.exports = LoginForm;
