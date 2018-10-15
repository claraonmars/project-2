var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
        <html>
                <head>
                <title>{this.props.title}</title>
                <link href="https://fonts.googleapis.com/css?family=Rubik:300,700" rel="stylesheet"></link>
                <link rel="stylesheet" href="/style.css"></link>
                </head>

                <body>
                <div class="container">
                <div class='header'><h2>Taskbuddy</h2></div>
                <div class='notification'></div>
                    {this.props.children}
                </div>


                <script src="https://maps.googleapis.com/maps/api/js?libraries=places" type="text/javascript"></script>                <script src='/script.js'></script>
                </body>
            </html>
    );
  }
}

module.exports = DefaultLayout;