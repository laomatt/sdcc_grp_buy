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
    this.buyModal = this.buyModal.bind(this);
    this.addCoverage = this.addCoverage.bind(this);
  }

  componentDidmount(){
    console.log("Is is mounted ?")
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
  }

  addCoverage(){
  	$.ajax({
  		url: '/members/'+this.props.member.id+'/change_status',
  		method: 'PATCH',
  		data: {new_status: 'covered', room: this.props.room_id}
  	})
  }


  buyModal(){

  	$.ajax({
			url: '/members/present_confirmation_partial',
			data: {member_id: this.props.member.id, mem_group_id: this.props.member_grp_id}
		})
		.done(function(data) {
			console.log(data)
			$('#confirmation-body-for-the-modal').html(data);
	  	$('#purchase-confirmation-pop-up').modal('show');
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
							{
								member.days_needed.map(function(elem, idx) {
									return (
											elem['covered'] ?
												<span className="day_container covered_day" key={idx}>
													{elem['day']}
												</span>
											:
												<span className="day_container uncovered_day" key={idx}>
														{elem['day']}
												</span>
									)
								})		
							}
						</div>
				</div>

				<div className="col-sm-2">
					{/* status actions */}
					<i className={"fas check_in_btn fa-check-square action-icon " + (member.checked_in ? 'action-on' : 'action-off')} onClick={that.checkIn}></i>
					<i className={"container__actions_" + this.props.member_id + " fas fa-shopping-cart action-icon " + (member.in_progress ? 'action-on' : 'action-off')} onClick={that.buyModal} style={{display: (member.checked_in ? 'inline-block' : 'none')}}></i>
				</div>
			</div>

			</li>
    );
  }
}

export default BuyGroupMember
