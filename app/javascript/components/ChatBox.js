import React from "react"
import PropTypes from "prop-types"
import ChatMessage from './ChatMessage'
class ChatBox extends React.Component {
  render () {
    const that = this.props;
    return (
					<div>
						<h5>{this.props.title}</h5>
			    	<div className='col-md-6 web_socket_loading' id='site-chat-box'>
							<div className="file-folder row">
								<a href="#" className='col-md-6 btn-sm btn-primary expand-chat-log expand-chat-log-group' style={{'backgroundColor': '#efeacc'}}>Group chat</a>
								{
									this.props.is_admin ? 
										<a href="#" className='col-md-6 btn-sm btn-primary expand-chat-log  expand-chat-log-global' style={{'backgroundColor': 'rgb(193, 188, 158)'}}>Admin chat</a>
									:
										<div></div>
								}
							</div>
								{
									this.props.is_admin ?
										<div className="chat-box chat-box-global room-box-global">
											<div id="chat_container-global">
												<div className="chat-form-global">
													<form id='chat-dialog-global'>
														<h4>Admin Chat Room</h4>
														<input type="text" name="" className='chat-input-dialog chat-message-input-global chat-message-input' scope='global' placeholder="SAy sumthin'....." />
													</form>
													<span className="someone_typing_global"></span>
												</div>
												<div className="chat-log-global" id='chat_log_global'>
													{that.chat_messages.map(function(message, idx) {
														return (
															<div key={'global_message_'+idx}>
																<ChatMessage type='global' message={message} user={message.user} current_user={that.current_user} created_at={message.created_at} from='todom' global_scope={message.global_scope} />
															</div>
														)
													})}
												</div>
											</div>
										</div>
									:
										<div></div>
								}

							<div className="chat-box room-box chat-box-group">
								<div id="chat_container">
									<div className="chat-form">
										<form id='chat-dialog-group'>
											<h4>Group Chat Room</h4>
											<input type="text" name="" className='chat-input-dialog chat-message-input-group chat-message-input' scope='group' placeholder="SAy sumthin'....." />
										</form>
										<span className="someone_typing">Someone is typing a message.....</span>
									</div>
									<div className="chat-log" id='chat_log'>
										{that.chat_messages.map(function(message, idx) {
											return (
												<div key={'group_message_'+idx}>
													<ChatMessage type='group' message={message} user={message.user} current_user={that.current_user} created_at={message.created_at} from='group' global_scope={message.global_scope} />
												</div>
											)
										})}
									</div>
								</div>
							</div>
						</div>
		      
					</div>
        );
  }
}

export default ChatBox
