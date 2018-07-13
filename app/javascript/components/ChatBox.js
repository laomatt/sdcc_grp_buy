import React from "react"
import PropTypes from "prop-types"
import ChatMessage from './ChatMessage'
class ChatBox extends React.Component {
	expandChatLogGroup(event) {
			event.preventDefault()
			event.target.style.backgroundColor = '#efeacc';
			event.target.style.color = 'black';

			document.getElementsByClassName('expand-chat-log-global')[0].style.backgroundColor = 'rgb(193, 188, 158)';
			document.getElementsByClassName('expand-chat-log-global')[0].style.color = 'white';
			document.getElementsByClassName('chat-box-global')[0].style.display = 'none';
			document.getElementsByClassName('chat-box-group')[0].style.display = 'block';
	}

	expandChatLogGlobal(event) {
			event.preventDefault()
			event.target.style.backgroundColor = '#efeacc';
			event.target.style.color = 'black';
	
			document.getElementsByClassName('expand-chat-log-group')[0].style.backgroundColor = 'rgb(193, 188, 158)';
			document.getElementsByClassName('expand-chat-log-group')[0].style.color = 'white';

			document.getElementsByClassName('chat-box-group')[0].style.display = 'none';
			document.getElementsByClassName('chat-box-global')[0].style.display = 'block';
	}

	someoneTyping () {
  	document.getElementsByClassName('someone_typing')[0].style.display = 'block';
  	setTimeout(function(){
	  	document.getElementsByClassName('someone_typing')[0].style.display = 'none';
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
	  }


	takeOffline(){
				$('.info_top').fadeIn(500, function() {
						$(".web_socket_loading").fadeOut(500, function() {});
				});
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
		var loads = document.getElementsByClassName('loading');
		var socketLoads = document.getElementsByClassName('web_socket_loading');

		for (var i = loads.length - 1; i >= 0; i--) {
			loads[i].style.display = 'none';
		}

		for (var i = socketLoads.length - 1; i >= 0; i--) {
			socketLoads[i].style.display = 'block';
		}

	}



	startDispatch(){
	  // dispatcher = new WebSocketRails(server_location + "/" + "websocket");
	  this.setState({
	  	  	dispatcher: new WebSocketRails(server_location + "/" + "websocket")
	  })

	  var element = this;

	  this.state.dispatcher.on_open = function(data) {

			var dispatcher = this;
	  	element.takeOnline();

	  	if (!element.state.activeDispatcher) {
		    console.log('Connection has been established: ', data);
		    var group_room_conn = 'group_'+ element.props.group_id;
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
			  setInterval(function(){
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
		    	element.someoneTyping();
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

  	setTimeout(function(){
		  element.startDispatch();
		}, 500);

    const that = this.props;
    return (
					<div>
						<center>
							<h3>{this.props.title}</h3>
						</center>
						<div className="info_top">
						  <img src="/assets/danger.gif" alt="Danger"/>
						    Your live connection was interrupted, please refresh your browser to continue getting live updates  
						    <img src="/assets/danger.gif" alt="Danger"/>
						</div>
						<div className="loading">
							<img src="/assets/bar.gif" alt="Bar" />
							<br />
							  websocket loading, please wait... (if this takes more than 5 seconds then refresh your browser)
						</div>
			    	<div className='web_socket_loading' id='site-chat-box'>
							<div className="file-folder row">
								<a href="#" className='col-md-6 btn-sm btn-primary expand-chat-log expand-chat-log-group' style={{'backgroundColor': '#efeacc'}} onClick={this.expandChatLogGroup}>Group chat</a>
								{
									this.props.is_admin ? 
										<a href="#" className='col-md-6 btn-sm btn-primary expand-chat-log expand-chat-log-global' onClick={this.expandChatLogGlobal} style={{'backgroundColor': 'rgb(193, 188, 158)'}}>Admin chat</a>
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

							<div className="chat-box room-box chat-box-group">
								<div id="chat_container">
									<div className="chat-form">
										<form id='chat-dialog-group'>
											<h4>Group Chat Room</h4>
											<input type="text" name="" className='chat-input-dialog chat-message-input-group chat-message-input' onKeyDown={(event) => this.processMessage(this,'group',event)} parent_element={this} scope='group' placeholder="SAy sumthin'....." />
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
