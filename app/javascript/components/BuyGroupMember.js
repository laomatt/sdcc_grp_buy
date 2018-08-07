import React from "react"
import PropTypes from "prop-types"
class BuyGroupMember extends React.Component {

	constructor (props) {
    super(props);
    this.state = {
			expanded: false,
			status: props.member.status_class,
			status_msg: props.member.status_msg
    };

    // This binding is necessary to make `this` work in the callback
    this.expandBox = this.expandBox.bind(this);
    this.checkIn = this.checkIn.bind(this);
  }

  expandBox() {
  	if (!this.state.expanded) {
	  	this.props.onChange();
  	}

		this.setState((prevState, props) => ({
				expanded: !prevState.expanded
		}));
  }


  closeBox(){
  	this.setState((prevState, props) => ({
				expanded: false
		}));

  }

  checkIn(){
  	$.ajax({
  		url: '/members/'+this.props.member.id+'/change_status',
  		method: 'PATCH',
  		data: {new_status: 'checked_in', room: this.props.room_id}
  	})
  	.done(function() {
  		console.log("success");
  	})
  
  }

  checkInListen(status,status_msg){
  	this.setState((prevState, props) => ({
				status: status,
				status_msg: msg
		}));
  }

  render () {
  	var member = this.props.member;
  	var that = this;
    return (
			<li className={"btn-lg "+(member.status_class)+" member-item-container " + (member.covered ? "covered-member" : "uncovered-member") + ' member-item-container_'+ this.props.member_id} order={this.props.idx} member_group_id={that.props.grp_id}>
			<div className="row">
				<div className="col-sm-4">
							{member.name} <b>({member.sdcc_member_id})</b> 
				</div>
				<div className={'col-sm-2 status_message_for_' + member.id}>
						{member.status_msg}
				</div>

				<div className="col-sm-4">
						<div className="days_container_rightr">
							{member.days_needed}
						</div>
				</div>

				<div className="col-sm-2">
					{/* status actions */}
					<i className={"fas check_in_btn fa-check-square action-icon " + (member.checked_in ? 'action-on' : 'action-off')} onClick={that.checkIn}></i>
					<i className={"fas fa-shopping-cart action-icon " + (member.in_progress ? 'action-on' : 'action-off')}></i>
				</div>
			</div>



				<div className="actions-container"  style={ this.state.expanded ? {display: "block"} : {display: "none"} }>
					{ !(member.full_covered) && this.props.current_user_valid ?
						<div>
						{ member.active && member.current_user_buying_for_member ?
							<div>
								<a href="#" className={'active-button active-button-' +  member.id + ' btn btn-sm btn-primary cancel-this ' + (member.current_user_buying_for_member ? 'active-button-shown' : '')} data-id={member.mem_grp.id} member-id={member.id}>CANCEL</a>
								<a href="#" className={'active-button active-button-' + member.id + ' btn btn-sm btn-primary confirm-this' + (member.current_user_buying_for_member ? 'active-button-shown' : '')} member-id={member.id} data-toggle="modal" data-target="#purchase-confirmation-pop-up" data-id={member.mem_grp.id} >CONFIRM</a>
							</div>
						:
							<div>
								<a href="#" className={'active-button active-button-'+ member.id + ' btn btn-sm btn-primary cancel-this  ' + (member.current_user_buying_for_member ? 'active-button-shown' : '')} data-id={member.mem_grp.id} member-id={member.id} style={{display: "none"}}>CANCEL</a>
								<a href="#" className={'active-button active-button-' + member.id + ' btn btn-sm btn-primary confirm-this' + (member.current_user_buying_for_member ? 'active-button-shown' : '')} member-id={member.id} style={{display: "none"}} data-toggle="modal" data-target="#purchase-confirmation-pop-up" data-id={member.mem_grp.id} >CONFIRM</a>
							</div>
						}
						{ member.active ?
							<div>
								<a href="#" className={'activate activate-button-for' + member.id + ' btn btn-sm btn-primary activate-this-user ' + (member.active ? 'active_member_style' : 'non_active_member_style')} member-id={member.id} style={{display: ( member.checked_in ? 'inline-block' : 'none'),width: '30%'}} data-id={member.mem_grp.id} >START</a>
							</div>
						:
							<div>
								<a href="#" className={'activate activate-button-for' + member.id + ' btn btn-sm btn-primary activate-this-user '+ (member.active ? 'active_member_style' : 'non_active_member_style')} style={{display: ( member.checked_in ? 'inline-block' : 'none'), width: '30%'}} data-id={member.mem_grp.id} member-id={member.id}>START</a>
							</div>
						}
						{ member.checked_in ?
							<div>
								<a href="#" className={'check-in check-in-button-for' + member.id + ' btn btn-sm btn-warning check-in-this-user ' + (member.active ? 'active_member_style' : 'non_active_member_style')} data-id={member.mem_grp.id} member-id={member.id} style={{display: 'none'}}>CHECK IN</a>
								<a href="#" className={'check-out btn btn-sm btn-danger uncheck-in-this-user check-out-button-for' + member.id} data-id={member.mem_grp.id} member-id={member.id}>UN-CHECK</a>
							</div>
						:
							<div>
								<a href="#" className={'check-in check-in-button-for' + member.id + ' btn btn-sm btn-warning check-in-this-user '+ (member.active ? 'active_member_style' : 'non_active_member_style')} data-id={member.mem_grp.id} member-id={member.id}>CHECK IN</a>
								<a href="#" className={'check-out btn btn-sm btn-danger uncheck-in-this-user check-out-button-for' + member.id} data-id={member.mem_grp.id} member-id={member.id} style={{display: 'none'}}>UN-CHECK</a>
							</div>
						}
						</div>
					:
						<div></div>
					}
				</div>
			</li>
    );
  }
}

export default BuyGroupMember
