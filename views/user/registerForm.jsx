var React = require("react");
var DefaultLayout = require('../layout/default');

class RegisterForm extends React.Component {
  render() {
    return (
        <DefaultLayout title="Register An Account">
        <div class='login'>


          <form method ='POST' action='/register/success'>
          First Name:<input name='firstname' type='text'/><br/>
          Last Name:<input name='lastname' type='text'/><br/>
          Email:<input name='email' type='text'/><br/>
          Username:<input name='username' type='text'/><br/>
          Password:<input name="password" type="text" />
          <input type='hidden' name='lat' id='loginLat'/>
          <input type='hidden' name='long' id='loginLong'/>
          <br/><br/>
          <input type='submit' value ='Register Me!' />
          </form>
          <form method='GET' action ='/login'>
          <input type='submit' value='Already have an account?'/>
          </form>
          </div>
        </DefaultLayout>

    );
  }
}

module.exports = RegisterForm;
