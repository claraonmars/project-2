var React = require("react");
var DefaultLayout = require('../layout/default');

class RegisterForm extends React.Component {
  render() {
    return (
        <DefaultLayout title="Register An Account">
        <div class="article">
            <div class='login'>

            <div class="form">
                  <form method ='POST' action='/register/success'>
                  <p>First Name:</p>
                  <input name='firstname' type='text'/><br/>
                  <p>Last Name:</p>
                  <input name='lastname' type='text'/><br/>
                  <p>Email:</p>
                  <input name='email' type='text'/><br/>
                  <p>Username:</p>
                  <input name='username' type='text'/><br/>
                  <p>Password:</p>
                  <input name="password" type="text" />
                  <input type='hidden' name='lat' id='loginLat'/>
                  <input type='hidden' name='long' id='loginLong'/>
                  <br/><br/>
                  <input type='submit' value ='Register Me!' />
                  </form>
                  <form method='GET' action ='/login'>
                  <input type='submit' value='Already have an account?'/>
                  </form>
              </div>
            </div>
        </div>
        </DefaultLayout>

    );
  }
}

module.exports = RegisterForm;
