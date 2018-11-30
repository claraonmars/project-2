var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
        <html>
                <head>
                <title>{this.props.title}</title>
                <link href="https://fonts.googleapis.com/css?family=Rubik:300,700" rel="stylesheet"></link>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>

                <link rel="stylesheet" href="/style.css"></link>
                </head>

                <body>
                <div class="container">
                <div className="navbar">
                <a href="/">Taskbuddy</a>
                 <form method ='POST' action={this.props.loginURL}>
                 <input type= 'submit' value={this.props.login}/>
                 </form>
                <div class='notification'></div>
                </div>
                    {this.props.children}
                </div>


                <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>
                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvIOA1fSvyvcGj-eCn_QA0vIqpBcoNXL0
&libraries=places" type="text/javascript"></script>
                <script src='/script.js'></script>
                </body>
            </html>
    );
  }
}

module.exports = DefaultLayout;