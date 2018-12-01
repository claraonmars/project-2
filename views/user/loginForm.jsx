var React = require("react");
var DefaultLayout = require('../layout/default');

class LoginForm extends React.Component {
  render() {
    return (
        <DefaultLayout title="Login">

        <div class="article">
            <div class='login'>
                <h2>Log In To Your Account</h2><br/>

                <div class="form">
                  <form method ='POST' action='/login/success'>
                  <p>Username:</p>
                  <input id='username' name='username' type='text'/><br/>
                  <p>Password:</p>
                  <input id='password'name="password" type="text" /><br/>
                  <input type='hidden' name='lat' id='loginLat'/>
                  <input type='hidden' name='long' id='loginLong'/><br/>
                  <input id='login_soc' type='submit' name ='Login' value='Login' />
                  </form>

                  <form method='GET' action ='/register'>
                  <input type='submit' value='Register an account'/>
                  </form>
                </div>
            </div>
        </div>
        </DefaultLayout>
    );
  }
}

module.exports = LoginForm;
