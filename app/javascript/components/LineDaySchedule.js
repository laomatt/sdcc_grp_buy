import React from "react"
import PropTypes from "prop-types"
import TimeSlot from './TimeSlot'
import TimeSlot2 from './TimeSlot2'

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
          <TimeSlot2 key={time.id} type='indiv_list' date={time.date} index={idx} time={time.time}
           end_time={time.end_time} start_time={time.start_time} people={time.people} id={time.id} authenticity_token={time.authenticity_token} is_admin={isAdmin} notes={time.notes} has_current={time.has_current} current_user_id={that.props.current_user_id} people_hash={time.people_hash} ref={"timeSlot"+time.id} total_limit={that.props.limit} count={Object.keys(time.people_hash).length} onChange={that.closeAll} />
          );
       })}

      </div>
    );
  }
}


