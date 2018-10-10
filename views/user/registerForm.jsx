var React = require("react");
var DefaultLayout = require('../layout/default');

class RegisterForm extends React.Component {
  render() {
    return (
        <DefaultLayout title="Register An Account">


          <form method ='POST' action='/register/success'>
          firstname:<input name='firstname' type='text'/><br/>
          lastname:<input name='lastname' type='text'/><br/>
          email:<input name='email' type='text'/><br/>
          Username:<input name='username' type='text'/><br/>
          Password:<input name="password" type="text" />

          <input type='submit' name ='Register Me!' />
          </form>

        </DefaultLayout>

    );
  }
}

module.exports = RegisterForm;
