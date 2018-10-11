var React = require("react");
var DefaultLayout = require('../layout/default');

class EditPost extends React.Component {
    render() {
    let postId = this.props.postid;
    let actionURL = '/post/'+postId+'?_method=PUT'

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
            <DefaultLayout title = "Taskbuddy" >
            <div class='topbar'>
            <form method ='POST' action='/logout?_method=DELETE'>
            <input type= 'submit' value='Logout'/>
            </form>

            <form method ='GET' action ='/'>
            <input type='submit' value ='Home'/>
            </form>

            </div>

            <article>
            <h3>Modify</h3>
            <form method='POST' action ={actionURL}>
            I am looking for a {this.props.reqinfo[0].category} buddy!<br/>

            Location: <input type='text' name='location'/><br/>

            Time:
            <select name="time">
            <option></option>
            {timelist}
            </select><br/>

            Details:
            <input type='text' maxlength="150" name="details"/>

            <input type='submit' name='submit'/>
            </form>
            </article>

            </DefaultLayout>
        );
    }
}

module.exports = EditPost;