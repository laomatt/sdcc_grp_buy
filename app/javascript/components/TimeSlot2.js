import React from "react"
import PropTypes from "prop-types"
import PersonContact from "./PersonContact"


class TimeSlot2 extends React.Component {
	constructor (props) {
    super(props);
    this.state = {
			// expanded: false
    };

    // This binding is necessary to make `this` work in the callback
    // this.expandBox = this.expandBox.bind(this);
  }

  render () {
  	const time = this.props;
    return (
    	<div className='time-row' style={time.count == time.total_limit ? {backgroudColor:'#a2de6c'} : {backgroudColor:'transparent'}}>
    	<div className='btn-person-container'>
				<a href="#" className='broadcast-message btn-wide btn btn-lg btn-primary btn-contact-grp' data-slot-id={time.id} data-id={time.id} end-pt='/line_day/time_slots/broadcast_to_slot' data-type={this.props.type} data-identifier={"Wait shift: " + time.time} data-toggle="modal" data-target="#timeSlotContactModal" alt='Broadcast'><i className="fas fa-broadcast-tower"></i></a>
			</div>

    	<div className='btn-person-container'>
			<a href="#" data-id={time.id} end-pt={"/line_day/time_slots/" + time.id} data-toggle="modal" data-target="#timeSlotEdit" className='modal-pop edit-slot btn-wide centered btn edit-desc btn-lg btn-warning border-color' style={{'backgroundColor': 'transparent' }} alt='Edit Notes'><i className="fas fa-edit"></i></a>
			</div>


    	<div className='btn btn-lg time-sched-container'>
	    	<span className='time-slot-date-container' id={"date_for"+time.id}>{time.date}</span>
	    	<b id={"start_for_dis"+time.id}>
		    	{time.time} 
	    	</b> 
    	</div>
				{time.people_hash.map(function(elem, idx) {
						const timeSlotId = time.id;
						return (
								<div key={"contact_" + idx} className='btn-person-container'>
									<PersonContact user_id={elem.id} avatar_url={elem.avatar_url} name={elem.name} slot_id={timeSlotId} type={time.type}/>
					    	</div>
							)
				})}

			
			<div className='btn-person-container'>
					<form className="new_holder" id="new_holder" action={ time.has_current ? "/holders/erase" : "/holders"} method={ time.has_current ? "GET" : "POST"} acceptCharset="UTF-8"><input name="utf8" type="hidden" value="✓" />
						<input type="hidden" name="authenticity_token" value={time.authenticity_token} />
						<input type="hidden" name="holder[time]" id={"start_for" + time.id} value={time.start_time} />
						<input type="hidden" name="holder[end_time]" id={"end_for" + time.id} value={time.end_time} />
						
						<input value={time.id} type="hidden" name="holder[line_day_time_slot_id]" id="holder_line_day_time_slot_id" />
					{time.has_current ? 
							<input type="submit" name="commit" value="leave" className="btn btn-lg  btn-spec assign-btn btn-primary border-color" style={{backgroundColor: 'red'}} data-disable-with="leaving..." />
						:
							<input type="submit" name="commit" value="Join" className="btn btn-lg  border-color assign-btn btn-spec btn-primary border-color" style={{backgroundColor: 'green'}} data-disable-with="joining" />
						}
					</form>
			</div>	

			<div className='actions-container'>
					<div>
				    
						<a href="#" data-id={time.id} end-pt={"/line_day/time_slots/" + time.id} data-toggle="modal" data-target="#timeSlotEdit" className='modal-pop edit-slot btn-wide centered btn btn-spec edit-desc btn-lg btn-warning border-color' style={{'backgroundColor': 'transparent' }}>Edit</a>
					</div>
					{ 
						this.props.is_admin ? 
							<div>
									<a href={"/line_day/time_slots/" + time.id} style={{'backgroundColor': 'red' }} data-id={time.id} className='modal-pop btn-wide delete-slot btn-spec centered btn btn-lg btn-danger border-color'>Delete</a>
							</div>
						:
							<div></div>
					}
				</div>

				{
							time.notes ? 
							<div className='notes-section' id={"notes_for" + time.id}>
								{ time.notes }
							</div>
							:
							<div id={"notes_for" + time.id}></div>
						}

			</div>
    );
  }
}

export default TimeSlot2
