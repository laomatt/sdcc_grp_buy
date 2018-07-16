import React from "react"
import PropTypes from "prop-types"
import ChatMessage from './ChatMessage'
import LoadingMessage from './LoadingMessage'

class ChatBox extends React.Component {
	constructor (props) {
		super(props);
		const dispatcher = new WebSocketRails(server_location + "/" + "websocket")
		this.state = {
			dispatcher: dispatcher,
			activeDispatcher: false,
			socket_loaded: false
		}
		this.startDispatch(dispatcher);
  }

	expandChatLogGroup(event) {
			event.preventDefault()
			event.target.style.backgroundColor = '#efeacc';
			event.target.style.color = 'black';

			document.getElementById('expand-chat-log-global-' + event.target.attributes.group_id).style.backgroundColor = 'rgb(193, 188, 158)';
			document.getElementById('expand-chat-log-global-' + event.target.attributes.group_id).style.color = 'white';
			document.getElementById('chat-box-global-' + event.target.attributes.group_id).style.display = 'none';
			document.getElementById('chat-box-group-' + event.target.attributes.group_id).style.display = 'block';
	}

	expandChatLogGlobal(event) {
			event.preventDefault()
			event.target.style.backgroundColor = '#efeacc';
			event.target.style.color = 'black';
	
			document.getElementById('expand-chat-log-group-' + event.target.attributes.group_id).style.backgroundColor = 'rgb(193, 188, 158)';
			document.getElementById('expand-chat-log-group-' + event.target.attributes.group_id).style.color = 'white';

			document.getElementById('chat-box-group-' + event.target.attributes.group_id).style.display = 'none';
			document.getElementById('chat-box-global-' + event.target.attributes.group_id).style.display = 'block';
	}

	someoneTyping (element) {
  	document.getElementsByClassName('someone_typing'+element.props.group_id)[0].style.display = 'block';
  	setTimeout(function(){
	  	document.getElementsByClassName('someone_typing'+element.props.group_id)[0].style.display = 'none';
  	},2000);
  }

	processMessage(parent,type,event) {
			var type = type;
			var element = parent;
			var group_id = parent.props.group_id;

			if (event.which == 13) {
			 	event.preventDefault();
			 	var message = event.target.value;
			 	event.target.value = '';
			 	$.ajax({
			 		url: '/groups/process_message',
			 		type: 'POST',
			 		data: {message: {message: message, group_id: group_id}, type: type},
			 	})
			 	.done(function(data) {
			 		if (data.success) {
				 		var obj = { message: data.message, room: data.group_id, user_id: data.user_id, connection: data.connectionID, type: data.type};
				 		element.state.dispatcher.trigger('send_chat_message', obj);
			 		} else {
			 			// element.populateErrors(data.message);
			 		}
			 	})
			} else {
				// notify users that someone is typing
				element.state.dispatcher.trigger('someone_typing', {room: element.props.group_id});
			}
	}

// start react refactor
	addCommentToDom(message) {
			var that = this;
	  	var message_id = message.message_id;
	    	$.ajax({
	    		url: '/groups/add_comment',
	    		data: {message_id: message_id, from: 'dom'},
	    	})
	    	.done(function(data) {
			      $("#chat_log").prepend(data);
			      that.shakeLastMessageGrp('group');
	    	});


	    var elem = $('#chat_log');
	    elem.scrollTop = 0;
	    console.log('just received new message: ' + message);
	  }


	addCommentToDomGlobal(message) {
	  	var message_id = message.message_id;
	    // if (message.connection_id == connectionID) {
	    	$.ajax({
	    		url: '/groups/add_comment',
	    		data: {message_id: message_id, from: 'dom'},
	    	})
	    	.done(function(data) {
			      $("#chat_log_global").prepend(data);
			      shakeLastMessageGrp('global');
	    	})
	    	
	    var elem = $('#chat_log_global');
	    elem.scrollTop = 0;
	    console.log('just received new message: ' + message);
		  // }
	  }


	shakeLastMessageGrp(type){
	  	if (type == 'group') {
		  	var shakeSub = $('#chat_log .chat-line-group')[0];
	  	} else {
		  	var shakeSub = $('#chat_log_global .chat-line')[0];
	  	}
		  var initial=0
		  var incre=0
			quibble()
	    function quibble(){
		      if(incre<10)
		      {
		        if(incre%2==0)
		          {
		            initial+=25
		          }
		        else
		          {
		            initial-=25
		          }
		        shakeSub.style.marginRight=initial+"px"
		        incre+=1
		        setTimeout(quibble,20)
		      } else {
		        shakeSub.style.marginRight="25px"

		      }
		    }

	  }

	  shake(shakeSub){
		  var initial=0
		  var incre=0
			quibble()
	    function quibble(){
		      if(incre<10)
		      {
		        if(incre%2==0)
		          {
		            initial+=15
		          }
		        else
		          {
		            initial-=15
		          }
		        shakeSub.style.marginRight=initial+"px"
		        incre+=1
		        setTimeout(quibble,20)
		      } else {
		        shakeSub.style.marginRight="25px"

		      }
		    }

	  }

	takeOnline(){
		this.setState({socket_loaded: true});

	}

	takeOffline(){
			this.setState({socket_loaded: false});
			clearInterval(this.state.interval);
  }


	startDispatch(dispatcher){
		console.log('starting dispatch...')
	  const element = this;

	  dispatcher.on_open = function(data) {

			var dispatcher = this;
	  	element.takeOnline();

	  	if (!element.state.activeDispatcher) {
		    console.log('Connection has been established: ', data);
		    var group_room_conn = 'chat_box_'+ element.props.group_id;
		    var room_create_success = group_room_conn + '_created';

		    element.setState(
		    	{
		    		channel: dispatcher.subscribe(group_room_conn),
				    channel_global: dispatcher.subscribe('global'),
			    	activeDispatcher: true,
			    	connectionID: data.connection_id
		    	}
		    )

		    // BINDING EVENTS
			  element.state.interval = setInterval(function(){
			  	if (dispatcher.state != 'connected') {
			  		element.takeOffline();
			  	}
			  },3000);

		    // chatroom listeners
		    element.state.channel_global.bind('add_global_message', function(message) {
		    	console.log('global:' + message);

		    	if (document.getElementsByClassName('chat-box-global')[0].style.display == 'none') {
			    	var globes = document.getElementsByClassName('expand-chat-log-global');
			    	for (var i = globes.length - 1; i >= 0; i--) {
			    		globes[i].style.backgroundColor = 'red';
			    	}
		    	}
		    	if (typeof message.connection_id != 'undefined' ) {
			    	element.addCommentToDomGlobal(message);
		    	}
		    });

		    element.state.channel.bind('add_room_message', function(message) {
		    	if (document.getElementsByClassName('chat-box-group')[0].style.display == 'none') {
			    	var globes = document.getElementsByClassName('expand-chat-log-group');
			    	for (var i = globes.length - 1; i >= 0; i--) {
			    		globes[i].style.backgroundColor = 'red';
			    	}
		    	}

		    	if (typeof message.connection_id != 'undefined' ) {
			    	element.addCommentToDom(message);
		    	}
		    });

		    // someone_typing
		    element.state.channel.bind('someone_typing', function(message) {
		    	element.someoneTyping(element);
		    });

		    element.state.dispatcher.bind('connection_closed', function() {
					setTimeout(function(){
						element.takeOffline();
					}, 500);
				});

		    console.log(room_create_success);
	  	}
	  }
	}

  render () {

  	var element = this;

    const that = this.props;
    return (
					<div>
						<div style={element.state.socket_loaded ? {display: 'none'} : {display:'block'}}>
							<LoadingMessage />
						</div>
						<div className="web_socket_loading" style={element.state.socket_loaded ? {display: 'block'} : {display:'none'}}>
				    	<div className='web_socket_loading' id='site-chat-box'>
								<div className="file-folder row">
									<a href="#" className='col-md-6 btn-sm btn-primary expand-chat-log expand-chat-log-group' id={'expand-chat-log-group-' + this.props.group_id} style={{'backgroundColor': 'rgb(34, 45, 50)'}} group_id={this.props.group_id} onClick={this.expandChatLogGroup}><h5 style={{color: 'white'}}>{this.props.title}: Group chat</h5></a>
									{
										this.props.is_admin ? 
											<a href="#" className='col-md-6 btn-sm btn-primary expand-chat-log expand-chat-log-global' id={'expand-chat-log-global-' + this.props.group_id} group_id={this.props.group_id} onClick={this.expandChatLogGlobal} style={{'backgroundColor': 'rgb(193, 188, 158)'}}><h5 style={{color: 'white'}}>Admin chat</h5></a>
										:
											<div></div>
									}
								</div>
									{
										this.props.is_admin ?
											<div className="chat-box room-box-global chat-box-global" id={'chat-box-global-' + this.props.group_id}>
												<div id="chat_container-global">
													<div className="chat-form-global">
														<form id='chat-dialog-global'>
															<input type="text" name="" className='chat-input-dialog chat-message-input-global chat-message-input' onKeyDown={(event) => this.processMessage(this,'global',event)} parent_element={this} scope='global' placeholder="SAy sumthin'....." />
														</form>
														<span className="someone_typing_global"></span>
													</div>
													<div className="chat-log-global" id='chat_log_global'>
														{that.global_chat_messages.map(function(message, idx) {
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

								<div className="chat-box room-box chat-box-group" id={'chat-box-group-' + this.props.group_id}>
									<div id="chat_container">
										<div className="chat-form">
											<form id='chat-dialog-group'>
												<input type="text" name="" className='chat-input-dialog chat-message-input-group chat-message-input' onKeyDown={(event) => this.processMessage(this,'group',event)} parent_element={this} scope='group' placeholder="SAy sumthin'....." />
											</form>
											<span className={"someone_typing someone_typing" + this.props.group_id}>Someone is typing a message.....</span>
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
					</div>
        );
  }
}

export default ChatBox
