import React from "react"
import PropTypes from "prop-types"
import BuyGroupMember from "./BuyGroupMember"
import LoadingMessage from './LoadingMessage'

class BuyGroup extends React.Component {
	constructor (props) {
    super(props)
    const dispatcher = new WebSocketRails(server_location + "/" + "websocket")
    this.state = {
      day: props.day,
      slots: props.time_slots,
      is_admin: props.is_admin,
      childrenRefs: {},
      dispatcher: dispatcher,
      activeDispatcher: false,
			socket_loaded: false
    }

    this.actListen = element => {
      el.state.childrenRefs[element.props.member_id] = element
      store[element.props.member_id] = element
    };
		this.startDispatch(dispatcher,grp_id,this);
		console.log('starting dispatch...')
  }

  closeAll() {
    const children = this.refs;
    for (var i in children) {
      children[i].closeBox();
    }
  }


  addMemberToDom(member) {
    // document.getElementById("myList").appendChild(member); 
    // add the member to the dom via react
  }

	takeOnline(){
		this.setState({socket_loaded: true});

	}

	takeOffline(){
			this.setState({socket_loaded: false});
			clearInterval(this.state.interval);
  }

  performNumberUpdate(number,group_id){
  	if (number == 1) {
	    	document.getElementById('number-of-members'+group_id).text(number + ' Member in this buying group')
    	} else if (number == 0) {
	    	document.getElementById('number-of-members'+group_id).text('This buying group is empty')
    	} else {
	    	document.getElementById('number-of-members'+group_id).text(number + ' Members in this buying group')
    	}
  }

	startDispatch(dispatcher,id,scp){
	  // dispatcher = new WebSocketRails(server_location + "/" + "websocket");
		console.log('starting dispatch...')
	  const element = this;

	  dispatcher.on_open = function(data) {

			var dispatcher = this;
	  	element.takeOnline();

	  	if (!activeDispatcher) {
		    console.log('Connection has been established: ', data);
		    const group_room_conn = 'buy_group_'+ id;
		    var room_create_success = group_room_conn + '_created';
		    var channel = dispatcher.subscribe(group_room_conn);
		    element.setState(
		    	{
			    	activeDispatcher: true,
			    	connectionID: data.connection_id
		    	}
		    )
		    // BINDING EVENTS

		    channel.bind("check_in_member_to_group",function(mes) {
		    	console.log('a message was received' + mes);
		    	$('.member-item-container_' + mes.member_id).removeClass('active');
		    	$('.member-item-container_' + mes.member_id).removeClass('covered');
		    	$('.member-item-container_' + mes.member_id).removeClass('full_covered')
		    	$('.member-item-container_' + mes.member_id).removeClass('not_checked_in');
		    	$('.member-item-container_' + mes.member_id).removeClass('checked_in');
		    	if (mes.online == 'online') {
			    	$('.member-item-container_' + mes.member_id + ' .' + mes.dom).css('color', 'red');
		    	} else {
			    	$('.member-item-container_' + mes.member_id + ' .' + mes.dom).css('color', 'black');
		    	}
		    	$('.member-item-container_' + mes.member_id).addClass(mes.status_class)
		    	$('.status_message_for_' + mes.member_id).text(mes.status_msg)
		    });


		    dispatcher.bind('connection_closed', function() {
					setTimeout(function(){
						element.takeOffline();
					}, 500);
				});

	    console.log(room_create_success);
	  	}
	  }
	}

  render () {
  	const that = this;
    return (
    	<div>
				<div style={that.state.socket_loaded ? {display: 'none'} : {display:'block'}}>
					<LoadingMessage />
				</div>
	      <div className='web_socket_loading' style={that.state.socket_loaded ? {display: 'block'} : {display:'none'}}>
	      	<div className="member-box room-box">
					  <a href="#" type="button" className="btn btn-warning btn-lg web_socket_loading2" style={{width: "100%"}} data-toggle="modal" data-target="#addUserModal">+ Member</a>

						{ that.props.member_count > 0 ?
							<h2 className={'number-of-members' + that.group_id}>{that.props.member_count} Member in this buying group</h2>
						:

							<h2 className={'number-of-members' + that.group_id}>This buying group is empty</h2>
						}

						<div className="row">
							<div className="col-md-6">
								<a href="#" id='non-covered-toggle' style={{width: "100%"}} className='btn btn-primary btn-lg'>Toggle Non-Covered Members</a>
							</div>
							<div className="col-md-6">
								<a href="#" id='non-checked-in-toggle' style={{width: "100%"}} className='btn btn-primary btn-lg'>Toggle Non-Checked in Members</a>
							</div>
						</div>

						<div className="member-list" id={'member-list' + that.props.group_id}>
							<ul id="table_sort" className='mem-list-container' style={{paddingLeft: "0",paddingRight: "0", margin: "0"}}>
								
								{
									that.props.members.map(function(member, idx) {
										// this.childrenRefs["mem_action"+idx] = React.createRef();
										return (
											<div key={'member'+idx}>
												<BuyGroupMember member={member} ref={that.actListen} idx={idx} onChange={that.closeAll} current_user_valid={that.props.current_user_valid} member_id={member.id} room_id={that.props.group_id} order={that.order} />
											</div>
										)
									})
								}
							</ul>
						</div>
					</div>
	      </div>
    	</div>
    );
  }
}

export default BuyGroup
