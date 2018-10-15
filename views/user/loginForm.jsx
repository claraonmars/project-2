var React = require("react");
var DefaultLayout = require('../layout/default');

class LoginForm extends React.Component {
  render() {
    return (
        <DefaultLayout title="Login">

        <div class='login'>
          <form method ='POST' action='/login/success'>
          Username:<input name='username' type='text'/><br/>
          Password:<input name="password" type="text" /><br/>
          <input type='hidden' name='lat' id='loginLat'/>
          <input type='hidden' name='long' id='loginLong'/><br/>
          <input type='submit' name ='Login' value='Login' />
          </form>

          <form method='GET' action ='/register'>
          <input type='submit' value='Sign up for an account'/>
          </form>
        </div>
        </DefaultLayout>
    );
  }
}

module.exports = LoginForm;
