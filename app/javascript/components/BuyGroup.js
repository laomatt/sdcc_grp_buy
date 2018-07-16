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
      children: [],
      dispatcher: dispatcher,
      activeDispatcher: false,
			socket_loaded: false
    }
		
		this.startDispatch(dispatcher);
    this.closeAll = this.closeAll.bind(this);
  }

  closeAll() {
    const children = this.refs;
    for (var i in children) {
      children[i].closeBox();
    }
  }


	regMember(dataSend){
		$.ajax({
			url: '/members/register_member_to_group',
			method: 'POST',
			data: dataSend,
		})
		.done(function(data) {
			if (data.success == true) {
				// $("#reg-member").trigger('reset');
				var obj = {connection: connectionID, room: group_id, member_id: data.member_id, member_group_id: data.member_group_id}
				// $('.add-member-footer .btn').trigger('click');
				dispatcher.trigger('register_member', obj);
			} else {
				if (data.new_member) {
					// $('#new-member-form').slideDown('500', function() {
					// 	var sdcc_num = $('#sdcc_member_id_holder').val();
					// 	$('#sdcc_member_id_holder_create').val(sdcc_num);
					// });
				} else {
					populateErrors(data.message);
				}
			}
		})
	}

	coverMember(member_id, need_id, member_group_id, group_id){
		$.ajax({
			url: '/members/cover_member',
			data: {member_id: member_id, need_id: need_id, member_group_id: member_group_id, group_id: group_id},
		})
		.done(function(data) {
			getGroupCount();
			if (data.success) {
				var obj = {connection: connectionID, member_group_id: data.member_group_id, groups: data.groups, group_id: data.group_id};
				dispatcher.trigger('cover_member', obj);
			} else {
				// populateErrors(data.message);
			}
		})
		
	}

  removeMemberFromDom(member_group_id) {
    $.ajax({
    	url: '/members/remove_member',
    	method: 'DELETE',
    	data: {mem_grp_id: member_group_id, grp_id: group_id},
    })
    .done(function(data) {
    	if (data.success) {
			  	var obj = {connection: connectionID, room: group_id, member_group_id: data.message}
					dispatcher.trigger('unregister', obj);
					setTimeout(function(){
						getGroupCount();
					},1000)
			
    	}
    })
  }

  getGroupCount(){
		setTimeout(function(){
	  	$.ajax({
	  		url: '/groups/get_count',
	  		data: {group_id: group_id},
	  	})
	  	.done(function(data) {
				dispatcher.trigger('group_updated', {count: data.count, room: group_id});
	  	})
		},500);
  }

  addMemberToDom(member) {
    document.getElementById("myList").appendChild(member); 
    // add the member to the dom via react
  }

  memberDom(element,member){
  	const that = element;
  	const mem = member;
  	return (
	  		<div>
	  			<BuyGroupMember key='' member={mem} ref={"mem-action"+mem.id} onChange={that.closeAll} current_user_valid={that.props.current_user_valid} order={that.order} />
  			</div>
  		)
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

	startDispatch(dispatcher){
	  // dispatcher = new WebSocketRails(server_location + "/" + "websocket");
		console.log('starting dispatch...')
	  const element = this;

	  dispatcher.on_open = function(data) {

			var dispatcher = this;
	  	element.takeOnline();

	  	if (!activeDispatcher) {
		    console.log('Connection has been established: ', data);
		    var group_room_conn = 'buy_group_'+ connection;
		    var room_create_success = group_room_conn + '_created';
		    element.setState(
		    	{
		    		channel: dispatcher.subscribe(group_room_conn),
			    	activeDispatcher: true,
			    	connectionID: data.connection_id
		    	}
		    )
		    // BINDING EVENTS

		    // listen for newly registered members
		    channel.bind("member_registered", function(mes) {
		    	var number = mes.num_of_ppl;
		    	var node = memberDom(99,element,mes.member);
		    	this.performNumberUpdate(number,element.props.group_id);
		    	element.addMemberToDom(node);
		    });

		    // listen for any dropped members
		    channel.bind("unregister_member",function(mes) {
		    	var number = mes.num_of_ppl;
		    	this.performNumberUpdate(number,element.props.group_id);

		    	// $("#member_row_" + mes.member_group_id).fadeOut('500', function() {
				   //  $("#member_row_" + mes.member_group_id).remove();
		    	// });
		    })

  		    // listen for any checked in members
		    channel_global.bind("check_in_member",function(mes) {
		    	// member_id = mes.member_id
		    	// $(".check-in-button-for" + member_id).fadeOut(300, function() {
		    	// 	$(".check-out-button-for" + member_id).fadeIn(300);
		    	// 	$(".activate-button-for" + member_id).fadeIn(300, function() {
		    	// 		$(this).parents('.member-item').removeClass('member_not_checked_in');
		    	// 		$(this).parents('.member-item').addClass('member_checked_in');
		    	// 	});
		    	// });
		    })

				// listen for any checked out members
		    channel_global.bind("check_out_member",function(mes) {
		    	// member_id = mes.member_id
		    	// $(".check-out-button-for" + member_id).fadeOut(300, function() {
		    	// 	$(".check-in-button-for" + member_id).fadeIn(300);
		    	// 	$(".activate-button-for" + member_id).fadeOut(300, function() {
		    	// 		$(this).parents('.member-item').removeClass('member_checked_in');
		    	// 		$(this).parents('.member-item').addClass('member_not_checked_in');
		    	// 	});
		    	// });
		    })

		    // listen for any covered members across all groups in this group
		    channel_global.bind("member_covered",function(mes) {
			    // $("#member_row_" + mes.member_group_id).addClass('member_covered');
			    // $('.active-button-' + mes.member_id).hide(500);

			    // member_id = mes.member_id
			    // $.ajax({
			    // 	url: '/groups/present_day_container',
			    // 	data: {member_id: mes.member_id},
			    // })
			    // .done(function(html) {
			    // 	$('.day-holder-for' + member_id).html(html);
			    // })
			    

			    // $("#action-holder-for" + mes.member_group_id).html("This member has been covered");
		    })



		    channel_global.bind("group_updated",function(mes) {
		    	var group_id_specific = mes.group_id
		    	var newCount = mes.count
		    	var oldCount = $("#side-item-count-for-group-" + group_id_specific).text();


			   //  if (group_id == 'master_tab') {
			   //  	// find the row and update the percent
			   //  	$.ajax({
			   //  		url: '/groups/present_master_partial',
			   //  		data: {group_id: group_id_specific}
			   //  	})
			   //  	.done(function(html) {
				  //   	$("#master_tab_group_" + group_id_specific).html(html);
			   //  	})
			   //  }

		    // 	if (mes.group_id != group_id) {
				  // 	$("#side-item-group-" + group_id_specific).css("border-left", "10px solid red");
		    // 	}
			  	// if (mes.complete) {
				  // 	$("#side-item-group-" + group_id_specific).css('background-color', '#6dff94');
				  // 	if (group_id == group_id_specific) {
				  // 		// $(".content").css('background-color', '#6dff94');
				  // 	} 
			  	// } else {
				  // 	$("#side-item-group-" + group_id_specific).css('background-color', '#ecf0f5');
			  	// 	$(".content").css('background-color', 'transparent');

			  	// }

		  		// $("#side-item-count-for-group-" + group_id_specific).text(newCount);
			  	// if (newCount != oldCount) {
			  	// 	$("#side-item-count-for-group-" + group_id_specific).css('background-color', 'yellow');
			  	// 	setTimeout(function(){
				  // 		$("#side-item-count-for-group-" + group_id_specific).css('background-color', 'transparent');
			  	// 	},1000)
			  	// }
		    })

		    // listen for active members
		    channel_global.bind("activate_member",function(mes) {
		    	// if (mes.connection_id != connectionID) {
			    // 	$(".activate-button-for" + mes.member_id).fadeOut(1000, function() {
				   //  	$("#action-message-for" + mes.member_id).fadeIn(1000, function() {});
			    // 	});
				   //  $(".member_groups_marker_" + mes.member_id).addClass('member_active');
		    	// }
		    })

		    channel_global.bind("deactivate_member",function(mes) {
		    	// if (mes.connection_id != connectionID) {
			    // 	$("#action-message-for" + mes.member_id).fadeOut(1000, function() {
				   //  	$(".activate-button-for" + mes.member_id).fadeIn(1000, function() {});
			    // 	});
				   //  $(".member_groups_marker_" + mes.member_id).removeClass('member_active');
		    	// }
		    })

		    // chatroom listeners
		   

		    dispatcher.bind('connection_closed', function() {
					setTimeout(function(){
						takeOffline();
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

						<h5><a href="#" id='non-covered-toggle' style={{width: "100%"}} className='btn btn-primary btn-lg'>Toggle Non-Covered Members</a></h5>
						<h5><a href="#" id='non-checked-in-toggle' style={{width: "100%"}} className='btn btn-primary btn-lg'>Toggle Non-Checked in Members</a></h5>

						<div className="member-list" id={'member-list' + that.props.group_id}>
							<ul id="table_sort" className='mem-list-container' style={{paddingLeft: "0",paddingRight: "0", margin: "0"}}>
								
								{
									that.props.members.map(function(member, idx) {
										return (
											<div key={'member'+idx}>
												<BuyGroupMember member={member} ref={"mem-action"+idx} idx={idx} onChange={that.closeAll} current_user_valid={that.props.current_user_valid} order={that.order} />
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
