var React = require("react");

class RegisterForm extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>

          <form method ='POST' action='/register/success'>

          Username:<input name='name' type='text'/><br/>
          Password:<input name="password" type="text" />

          <input type='submit' name ='Register Me!' />
          </form>

        </body>
      </html>
    );
  }
}

module.exports = RegisterForm;
