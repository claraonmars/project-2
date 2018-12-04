var React = require("react");
var DefaultLayout = require('../layout/default');


class Chat extends React.Component {
    render() {

        return (
          <div class= 'chatbox'>
          <div class ='chatheader'>{this.props.username}</div>

          <div class="chatbody"></div>

          <div class='text_input'>
          <form class='chat_input' method ='POST' action='/user/chat' id = 'form'>
          <input name="input" type="text" id='chatform'/>
          <input type='submit' id ='submitchatform' value='<'/>
          </form>

          </div>
          </div>
        );
    }
}

module.exports = Chat;