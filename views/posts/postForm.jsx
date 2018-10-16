var React = require("react");
var DefaultLayout = require('../layout/default');

class postForm extends React.Component {
  render() {
       let logout
        let logoutURL
        let profile
        let profileURL

            let actionURL = '/post/' + this.props.type


        if (this.props.cookies.status === 'loggedIn'){
          logout = 'Logout'
          logoutURL = '/logout' + '?_method=DELETE';
          profile =' Profile'
          profileURL = '/profile'
        }

    let time =[
      {   id: 1,
          time: "11:00"
      },
      {
          id: 2,
          time: "11:30"
      },
      {
          id: 3,
          time: "12:00"
      },
      {
          id: 4,
          time: "12:30"
      },
      {
          id: 4,
          time: "13:00"
      },
      {
          id:5,
          time: "13:30"
      },
      {
        id:6,
          time: "14:00"
      },
      {
        id:7,
          time: "14:30"
      }
      ]

    const timelist = time.map ((time)=>{
        return (<option> {time.time}</option>
)
    })



    return (
        <DefaultLayout title="Login">
            <div class='topbar'>
            <form method ='POST' action={logoutURL}>
            <input type= 'submit' value={logout}/>
            </form>

            <form method='GET' action={profileURL}>
            <input type='submit' value ={profile}/>
            </form>

            <form method ='GET' action ='/user/notification'>
            <input type='submit' value ='Alerts'/>
            </form>

            <form method ='GET' action ='/'>
            <input type='submit' value ='Home'/>
            </form>
            </div>

            <article>
            <div class='postform'>
            <form method='POST' action ={actionURL}>
            I am looking for a {this.props.type} buddy!<br/><br/>

            Location:
            <input id="location" type="text" size="50" placeholder="Enter a location" autocomplete="on" runat="server" />
            <input type="hidden" id="city2" name="locName" />
            <input type="hidden" id="cityLat" name="locLat" />
            <input type="hidden" id="cityLng" name="locLong" />
            <br/>
            <br/>
            Time:
            <select name="time">
            <option></option>
            {timelist}
            </select><br /><br />

            Details:
            <input type='text' maxlength="150" name="details"/>
            <br /><br />
            <input type='submit' name='submit'/>
            </form>
            </div>
            </article>
        </DefaultLayout>
    );
  }
}

module.exports = postForm;
