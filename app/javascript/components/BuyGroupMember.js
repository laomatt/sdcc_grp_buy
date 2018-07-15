import React from "react"
import PropTypes from "prop-types"
class BuyGroupMember extends React.Component {

	constructor (props) {
    super(props);
    this.state = {
			expanded: false
    };

    // This binding is necessary to make `this` work in the callback
    this.expandBox = this.expandBox.bind(this);
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

  render () {
  	var member = this.props.member
  	var that = this;
    return (
			<li className={"btn-lg member-item-container " + (member.covered ? "covered-member" : "uncovered-member")} onClick={this.expandBox} id={'member-item-container_'+ this.props.idx} order={this.props.idx} member_group_id={that.props.grp_id}>
			<div className="row">
				<div className="col-sm-4">
							{member.name} <b>({member.sdcc_member_id})</b> 
				</div>
				<div className="col-sm-4">

						{ member.full_covered ?
							<div class="covered-member">	
									COMPLETE
							</div>
							:
							<div></div>
						}

						{ member.active && !member.current_user_buying_for_member ? 
							<div class="mem-block-message" id={"action-message-for" + member.id} style={{float: 'right', display: 'block'}}>
								IN PROGRESS
							</div>

						:
							<div></div>
						}
				</div>

				<div className="col-sm-4">
						<div className="days_container_rightr">
							{member.days_needed}
						</div>
				</div>
			</div>



				<div className="actions-container" style={ this.state.expanded ? {display: "block"} : {display: "none"} }>
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
