import React from "react"
import PropTypes from "prop-types"
class ChatMessage extends React.Component {
  render () {
		const props = this.props;
  	if (this.props.type == 'global') {
	  	return (
	  			<div>
	  				{ props.current_user.id == props.user.id ?
							<div className="chat-line chat-line-global" style={{"textAlign": "left"}}>
								<a href="#" className='user-modal-pop btn chat-avatar' data-toggle="modal" data-target="#userModal" data-id={props.user.id}><img src={ props.user.avatar_url } className="img-circle img-circle-mod" alt="User Image" /></a> 
								<div className="talk-bubble tri-right left-top ">
								  <div className="talktext">
								  <p>
									  <b> { props.user.name } : </b>{ props.message.message }  
								  </p>
								  
								  <div className='bubble-time'>
								   { props.message.created_at }
								  </div>
								  </div>
								</div>
									<br />
							</div>
						:
							<div className="chat-line chat-line-global" style={{"textAlign": "right"}}>
								<div className="talk-bubble tri-right right-top" style={{'left': '0%'}}>
								  <div className="talktext">
								  <p>
									  <b> { props.user.name } : </b>{ props.message.message }  
								  </p>
								  
								  <div className='bubble-time '>
								   { props.message.created_at }
								  </div>
								  </div>
								</div>
								<a href="#" className='user-modal-pop btn chat-avatar' data-toggle="modal" data-target="#userModal" data-id={props.user.id} style={{'right': '3%'}}><img src={ props.user.avatar_url } className="img-circle img-circle-mod" alt="User Image"/></a> 
								<br />
							</div>
						}
	  			</div>

	  		)

  	} else if (!props.global_scope) {
	  	return (
	  		<div>
					{ props.current_user.id == props.user.id ?
						<div className="chat-line chat-line-group" style={{"textAlign": "left"}}>
							<a href="#" className='user-modal-pop btn chat-avatar' data-toggle="modal" data-target="#userModal" data-id={props.user.id}><img src={ props.user.avatar_url } className="img-circle img-circle-mod" alt="User Image" /></a> 
							<div className="talk-bubble tri-right left-top ">
							  <div className="talktext">
							  <p>
								  <b> { props.user.name } : </b>{ props.message.message } 
							  </p>
							  <div className='bubble-time'>
								   { props.message.created_at }
							  </div>
							  </div>
							</div>
							<br />
						</div>
						:
						<div className="chat-line chat-line-group" style={{"textAlign": "right"}}>

							<div className="talk-bubble tri-right right-top" style={{'left': '0%'}}>
							  <div className="talktext">
							  <p>
								  <b> { props.user.name } : </b>{ props.message.message }   
							  </p>
							  
							  <div className='bubble-time '>
								   { props.message.created_at }
							  </div>
							  </div>
							</div>
							<a href="#" className='user-modal-pop btn chat-avatar' data-toggle="modal" data-target="#userModal" data-id={props.user.id} style={{'right': '3%'}}><img src={ props.user.avatar_url } className="img-circle img-circle-mod" alt="User Image"/></a> 
							<br />
						</div>
					}
	  		</div>
	  		)
  		
  	}
  }
}

export default ChatMessage
