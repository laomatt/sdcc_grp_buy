import React from "react"
import PropTypes from "prop-types"
import BuyGroupMember from "./BuyGroupMember"
import LoadingMessage from './LoadingMessage'

class BuyGroup extends React.Component {
	constructor (props) {
    super(props)
    this.state = {
      day: props.day,
      slots: props.time_slots,
      is_admin: props.is_admin,
      children: []
    }

    this.closeAll = this.closeAll.bind(this);
  }

  closeAll() {
    const children = this.refs;
    for (var i in children) {
      children[i].closeBox();
    }
  }


  render () {
  	const that = this;
    return (
    	<LoadingMessage />
      <div className='web_socket_loading'>
      	<div className="member-box room-box">
				  <a href="#" type="button" className="btn btn-warning btn-lg web_socket_loading2" style={{width: "100%"}} data-toggle="modal" data-target="#addUserModal">+ Member</a>

					{ this.props.member_count > 0 ?
						<h2 className='number-of-members'>{this.props.member_count} Member in this buying group</h2>
					:

						<h2 className='number-of-members'>This buying group is empty</h2>

					}

					<h5><a href="#" id='non-covered-toggle' style={{width: "100%"}} className='btn btn-primary btn-lg'>Toggle Non-Covered Members</a></h5>
					<h5><a href="#" id='non-checked-in-toggle' style={{width: "100%"}} className='btn btn-primary btn-lg'>Toggle Non-Checked in Members</a></h5>

					<div className="member-list" id='member-list'>
						<ul id="table_sort" className='mem-list-container' style={{paddingLeft: "0",paddingRight: "0", margin: "0"}}>
							
							{
								this.props.members.map(function(member, idx) {
									return (
										<div key={'global_message_'+idx}>
											<BuyGroupMember member={member} ref={"mem-action"+idx} idx={idx} onChange={that.closeAll} current_user_valid={that.props.current_user_valid} order={that.order} />
										</div>
									)
								})
							}
						</ul>
					</div>
				</div>
      </div>
    );
  }
}

export default BuyGroup
