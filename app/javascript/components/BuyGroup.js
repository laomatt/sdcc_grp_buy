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

		this.startDispatch(dispatcher,props.group_id);
		console.log('starting dispatch...');

		// $('body').on('click', '#confirm-trigger', function(event) {
		// 	event.preventDefault();
		// 	$('.member-coverage-form').trigger('submit');
		// });

		$('body').on('click', '#non-covered-toggle', function(event) {
			event.preventDefault();
			$('.covered').toggle(500);
		});

		$('body').on('click', '#non-checked-in-toggle', function(event) {
			event.preventDefault();
			$('.not_checked_in').toggle(500);
		});


		this.signUpMember = this.signUpMember.bind(this);
		this.addMemberToDom = this.addMemberToDom.bind(this);
		this.signNewUpMember = this.signNewUpMember.bind(this);
  }

  closeAll() {
    const children = this.refs;
    for (var i in children) {
      children[i].closeBox();
    }
  }

  signUpMember(e){
  	e.preventDefault();
  	$(".create-mem-and-reg").attr('disabled', true);
  	$(".create-mem-and-reg-message").text('working....');
  	var dataSend = $("#reg-member-try").serialize();
		$.ajax({
			url: '/members/register_member_to_group',
			method: 'POST',
			data: dataSend
		})
		.done(function(data) {
			if (data.success == true) {
				$("#reg-member").trigger('reset');
				$('.add-member-footer .btn').trigger('click');
				$("#create-member-form").trigger('reset');
				$("#reg-member-try").trigger('reset');
			} else {
				if (data.new_member) {
					$('#new-member-form').slideDown('500', function() {
						var sdcc_num = $('#sdcc_member_id_holder').val();
						$('#sdcc_member_id_holder_create').val(sdcc_num);
					});
				} else {
					populateErrors(data.message);
				}
				$(".create-mem-and-reg").attr('disabled', false);
				$(".create-mem-and-reg-message").text('');
			}
		})
	}

	signNewUpMember(e){
	  	e.preventDefault();
	  	$(".create-mem-and-reg").attr('disabled', true);
	  	$(".create-mem-and-reg-message").text('working....');
	  	var dataSend = $("#create-member-form").serialize('#new-member-form');
			$.ajax({
				url: '/members/register_member_to_group',
				method: 'POST',
				data: dataSend
			})
			.done(function(data) {
				if (data.success == true) {
					$("#reg-member").trigger('reset');
					$('.add-member-footer .btn').trigger('click');
					$("#create-member-form").trigger('reset');
					$("#reg-member-try").trigger('reset');
				} else {
					populateErrors(data.message);
				}
				$(".create-mem-and-reg").attr('disabled', false);
				$(".create-mem-and-reg-message").text('');
			})
		}

  addMemberToDom(member) {
    document.getElementById("myList").appendChild(member); 
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
				// listen for any covered members across all groups in this group
		    channel.bind("member_covered",function(mes) {
		    	debugger
			    $("#member_row_" + mes.member_group_id).addClass('member_covered');
			    $('.active-button-' + mes.member_id).hide(500);

			    member_id = mes.member_id
			    
			    $("#action-holder-for" + mes.member_group_id).html("This member has been covered");
		    })



		    channel.bind("reg_member_to_group",function(mes) {
		    	var that = this;
		    	$.ajax({
		    		url: '/members/present_member_dom',
		    		data: {member_id: mes.member_id, group_id: mes.room},
		    	})
		    	.done(function(data) {
		    		$('.my_list').append(data);
		    	});
		    });

		    channel.bind("check_in_member_to_group",function(mes) {
		    	var toRem = ['not_active','active','covered','full_covered','not_checked_in','checked_in'];
		    	for (var i = toRem.length - 1; i >= 0; i--) {
			    	$('.member-item-container_' + mes.member_id).removeClass(toRem[i]);
		    	}

		    	if (mes.online == 'online') {
			    	$('.member-item-container_' + mes.member_id + ' .' + mes.dom).css('color', 'red');
			    	$('.container__actions_' + mes.member_id).css('display', 'inline-block');
		    	} else {
			    	$('.member-item-container_' + mes.member_id + ' .' + mes.dom).css('color', 'black');
			    	$('.container__actions_' + mes.member_id).css('display', 'none');
		    	}

		    	$('.member-item-container_' + mes.member_id).addClass(mes.status_class)
		    	$('.status_message_for_' + mes.member_id).text(mes.status_msg)
		    });

		    channel.bind("update_coverage_to_member",function(mes) {
		    	var toRem = ['active','covered','full_covered','not_checked_in','checked_in'];
		    	for (var i = toRem.length - 1; i >= 0; i--) {
			    	$('.member-item-container_' + mes.member_id).removeClass(toRem[i]);
		    	}

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
	    	<div className="row">
	    		<div className="col-lg-6">
			    	<h5>{ that.props.group_name }</h5>
	    		</div>
	    		<div className="col-lg-6">
						<b>Group Coordinator: <a href="#" className='user-modal-pop btn' data-toggle="modal" data-target="#userModal" data-id={ that.props.group_id }> { that.props.coordinator_name } </a> </b> ({that.props.coordinator_email})
	    		</div>
	    	</div>
				<div style={that.state.socket_loaded ? {display: 'none'} : {display:'block'}}>
					<LoadingMessage />
				</div>
	      <div className='web_socket_loading' style={that.state.socket_loaded ? {display: 'block'} : {display:'none'}}>
	      	<div className="member-box room-box">
						<div className="member-list" id={'member-list' + that.props.group_id}>
							<div className="row" style={{paddingLeft: "0",paddingRight: "0", margin: "0"}}>
								  <a href="#" type="button" className="col-sm-4 btn btn-warning btn-sm web_socket_loading2"  data-toggle="modal" data-target="#addUserModal">+ Member</a>
									<a href="#" id='non-covered-toggle' className='col-sm-4 btn btn-primary btn-sm'>Toggle Non-Covered Members</a>
									<a href="#" id='non-checked-in-toggle' className='col-sm-4 btn btn-primary btn-sm'>Toggle Non-Checked in Members</a>
							</div>
							<ul id="table_sort" className='mem-list-container my_list' style={{paddingLeft: "0",paddingRight: "0", margin: "0"}}>
								
								{
									that.props.members.map(function(member, idx) {
										return (
											<div key={'member'+idx}>
												<BuyGroupMember member={member} idx={idx} current_user_valid={that.props.current_user_valid} member_grp_id={member.mem_grp.id} member_id={member.id} room_id={that.props.group_id} />
											</div>
										)
									})
								}
							</ul>
						</div>
					</div>
	      </div>


				{/*<!-- add member modal -->*/}

				{/*<!-- Modal -->*/}
				<div id="addUserModal" className="modal fade" role="dialog">
				  <div className="modal-dialog">

				    {/*<!-- Modal content-->*/}
				    <div className="modal-content content-add-member">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal">&times;</button>
				        <h4 className="modal-title">Add Members</h4>
				        <span className="create-mem-and-reg-message"></span>
				      </div>
				      <div className="modal-body add-member">

								<h2 className='to_hide_on_create'>Add member to this group</h2>
								<p className='to_hide_on_create'>
									<b>(Only the user that started this group may add members to this group)</b>
								</p>
								<p className='to_hide_on_create'>
									To register yourself or a member into this group, please provide a valid SDCC member ID here, and check off the days desired.
								</p>
								<form method="" id="reg-member-try" className='to_hide_on_create'>
										<input type="hidden" name="member_group[group_id]" value={that.props.group_id}/>
										<input type="text" name="sdcc_member_id" id='sdcc_member_id_holder' className="form-control" style={{width: '100%'}} placeholder="SDCC member ID"/>
										<div id="error_list" style={{color: "red"}}></div>
										<hr/>
								</form>
								<button type="" style={{width: '100%'}} onClick={that.signUpMember} className="create-mem-and-reg btn btn-primary btn-lg to_hide_on_create"> Add Member </button>
								<span className="create-mem-and-reg-message"></span>


								<div className="browse to_hide_on_create">
									<p>Or Select members from list</p>
									<p>
										<a href="#" id='browse-for-members' style={{width: '100%'}} className="btn btn-primary btn-lg">Browse Members</a>
									</p>
								</div>

								<div className="browse-control to_hide_on_create" style={{display: 'none'}}>
										<input type="text" name="q" id='am_modal_search' className="form-control" autoComplete="off" placeholder="Search Members by SDCC member ID or name..."/>
										<div className='member-list-results-add-member'>
										</div>
								</div>


								{/*<!-- id: integer, user_id: integer, sdcc_member_id: integer, name: string, phone: string, email: string, covered: boolean, -->*/}
								<div id="new-member-form" style={{display: 'none'}}>
									<div className="create-form">
										<form action='/members' method='POST' id='create-member-form'>
											<input type="hidden" name="member_group[group_id]" value={that.props.group_id}/>
											<h3>Create a new Member</h3>
											<small>This Member ID is not yet in the system, you may sign up below</small>
											<input type="hidden" name="authenticity_token" id="authenticity_token" value={that.props.authenticity_token}/>

											<div className="row">
												<div className="form-group col-sm-6">
													<label htmlFor='member[name]'>First Name</label>
													<input className="form-control" type="text" name='member[name]'/>
												</div>
									      <div className="form-group col-sm-6">
									        <label htmlFor='member[last_name]'>Last Name</label>
									        <input className="form-control" type="text" name='member[last_name]'/>
									      </div>
											</div>

											<div className="row">
												<div className="form-group col-sm-6">
													<label htmlFor='member[phone]'>Phone</label>
													<input className="form-control" type="text" name='member[phone]'/>
												</div>
												<div className="form-group col-sm-6">
													<label htmlFor='member[email]'>E-Mail</label>
													<input className="form-control" type="text" name='member[email]'/>
												</div>
											</div>

											<div className="form-group">
												<label htmlFor='member[phone]'>SDCC Member ID</label>
												<input className="form-control" id='sdcc_member_id_holder_create' type="text" name='member[sdcc_member_id]'/>
											</div>
											<h3>Select the Days this member needs</h3>

											<div className="row">
												<div className="form-check form-check-stacked col-sm-2">
													<input type="checkbox" name="member[wensday]" id="member_wensday" value="1"/>
														Wen
												</div>
												<div className="form-check form-check-stacked col-sm-2">
													<input type="checkbox" name="member[thursday]" id="member_thursday" value="1"/>
														Thu
												</div>
												<div className="form-check form-check-stacked col-sm-2">
													<input type="checkbox" name="member[friday]" id="member_friday" value="1"/>
														 Fri
												</div>

												<div className="form-check form-check-stacked col-sm-2">
													<input type="checkbox" name="member[saturday]" id="member_saturday" value="1"/>
														 Sat
												</div>

												<div className="form-check form-check-stacked col-sm-2">
													<input type="checkbox" name="member[sunday]" id="member_sunday" value="1"/>
														 Sun
												</div>
											</div>

											<div id="error_list" style={{color: 'red'}}></div>
											<button type="submit" onClick={that.signNewUpMember} className="create-mem-and-reg btn btn-primary btn-lg">Register Member</button>
											<span className="create-mem-and-reg-message"></span>
										</form>
									</div>
								</div>



				      </div>
				      <div className="modal-footer add-member-footer">
				        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
				      </div>
				    </div>

				  </div>
				</div>



    	</div>
    );
  }
}

export default BuyGroup
