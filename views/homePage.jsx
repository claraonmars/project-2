var React = require("react");
var DefaultLayout = require('./layout/default');

class homePage extends React.Component {
  render() {
    return (
        <DefaultLayout title="Login">

        <div className="header_img">
            <div className="copy">
                <h2>The convenient way to get things done together</h2>
                <p class="center">Start looking for your task buddy today</p>
                <div className="buttons">
                    <a href="/login" className="header_button">Login</a>
                    <a href="/register" className="header_button right">Register</a>
                </div>
            </div>

        </div>

        <div className="article">
            <div className="copy">
                <br/><h2>How it works</h2><br/>
                <div className="row justify-content-center block">
                  <div className="col-3 demo">
                    <img src="/images/icons-03.png"/>
                  </div>
                  <div className="col-6">
                    <h5>What's the task?</h5>
                    <p>Select from a list of activities and
                    select the day and time you'd like to meet a TaskBuddy.
                    Give some details and get the app working.
                    </p>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-6">
                    <h5>Found a Buddy!</h5>
                    <p>Buddies will connect with you or you could connect with other buddies
                      and decide when to fulfill your task.
                    </p>
                  </div>
                  <div className="col-3 demo">
                    <img src="/images/icons-01.png"/>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-3 demo">
                    <img src="/images/icons-02.png"/>
                  </div>
                  <div className="col-6">
                    <h5>Get things done!</h5>
                    <p>Menial tasks will never be boring again.
                    </p>
                  </div>
                </div>
            </div>
        </div>


        </DefaultLayout>
    );
  }
}

module.exports = homePage;
