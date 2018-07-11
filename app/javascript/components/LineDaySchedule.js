import React from "react"
import PropTypes from "prop-types"
import TimeSlot from './TimeSlot'

export default class LineDaySchedule extends React.Component {

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
    const that = this;
    const children = this.refs;
    for (var i in children) {
      children[i].closeBox();
    }
  }

  render () {
    const data = this.state.slots;
  	const isAdmin = this.state.is_admin;
    const that = this;
    return (
      <div>
      {data.map(function(time, idx){
        return ( 
          <TimeSlot key={time.id} type='indiv_list' time={time.time} people={time.people} id={time.id} authenticity_token={time.authenticity_token} is_admin={isAdmin} notes={time.notes} has_current={time.has_current} people_hash={time.people_hash} ref={"timeSlot"+time.id} total_limit={that.props.limit} count={Object.keys(time.people_hash).length} onChange={that.closeAll} />
          );
       })}

      <TimeSlot key='' type='total_list' time='Entire Group' people='Whole Group' id={this.props.day_id} authenticity_token={this.props.authenticity_token} is_admin={isAdmin} notes='This is all the people that should be in this line' people_hash={this.props.all_hash} ref='454545' count={this.props.all_hash.length} total_limit={this.props.all_hash.length} onChange={that.closeAll} />
      </div>
    );
  }
}


