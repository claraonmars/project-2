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
                <h2>Taskbuddy</h2>

                    {this.props.children}
                </div>

                <script src='/script.js'></script>
                </body>
            </html>
    );
  }
}

module.exports = DefaultLayout;