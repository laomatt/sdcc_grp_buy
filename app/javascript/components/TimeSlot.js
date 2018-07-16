import React from "react"
import PropTypes from "prop-types"
import PersonContact from "./PersonContact"

export default class TimeSlot extends React.Component {

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
  	const time = this.props;
    return (
    	<div key={time.id}>
      	<a data-id={time.id} className={ (this.state.expanded ? 'selected-time-slot' : 'expand-slot') + ' expand-slot btn btn-lg btn-primary time_slot centered ' + (this.props.type == 'total_list' ? 'bottom-tab' : 'middle-tab') } onClick={this.expandBox}>
					<b>
				     {time.time}:  
					</b>
					<span className="ppl_list">
					   __({time.people})__{time.count}/<span className="user_slot_limit">{time.total_limit}</span>
					</span>
				</a>

				<div className="list-grp-detail border-color" style={ this.state.expanded ? {display: "block"} : {display: "none"} } id={"info-" + time.id}>

				<div className="row">


					<div className="col-lg-10">


						<div className="contact-list">
						{
							time.notes ? 
							<div className='notes-section' id={"notes_for" + time.id}>
								{ time.notes }
							</div>
							:
							<div></div>
						}

							<h3>Contact List (click a name to send a message)</h3>
							<div className="verbose_list">
								<div>
									{time.people_hash.map(function(elem, idx) {
											const timeSlotId = time.id;
											return (
													<div key={"contact_" + idx}>
														<PersonContact user_id={elem.id} avatar_url={elem.avatar_url} name={elem.name} slot_id={timeSlotId} type={time.type}/>
										    	</div>
												)
									})}
								</div>

								<a href="#" className='broadcast-message btn-wide btn btn-lg btn-primary btn-contact-grp' data-slot-id={time.id} data-id={time.id} end-pt='/line_day/time_slots/broadcast_to_slot' data-type={this.props.type} data-identifier={"Wait shift: " + time.time} data-toggle="modal" data-target="#timeSlotContactModal">Broadcast a message to this group</a>
							</div>
						</div>


					</div>


					<div className="col-lg-2">

						  <div className="btn-actions border-color">
							{time.has_current ? 
									<form className="new_holder" id="new_holder" action="/holders/erase" acceptCharset="UTF-8"><input name="utf8" type="hidden" value="✓" /><input type="hidden" name="authenticity_token" value={time.authenticity_token} />

									  <div className="field form-group">
									    <input value={time.id} type="hidden" name="holder[line_day_time_slot_id]" id="holder_line_day_time_slot_id" />
									  </div>

										{time.type == 'indiv_list' ?

									    <div>
												<div>
										    <input type="submit" name="commit" value="leave" className="btn btn-md btn-wide btn-spec assign-btn btn-primary border-color" style={{backgroundColor: 'red'}} data-disable-with="leaving..." />
												<a href="#" data-id={time.id} end-pt={"/line_day/time_slots/" + time.id} data-toggle="modal" data-target="#timeSlotEdit" className='modal-pop edit-slot btn-wide centered btn btn-spec edit-desc btn-lg btn-warning border-color' style={{'backgroundColor': 'transparent' }}>Edit Description</a>
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
									    :
									    <div></div>
										}
									</form> 
								: 
								<form className="new_holder" id="new_holder" action="/holders" acceptCharset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓" /><input type="hidden" name="authenticity_token" value={time.authenticity_token} />

								  <div className="field form-group">
								    <input value={time.id} type="hidden" name="holder[line_day_time_slot_id]" id="holder_line_day_time_slot_id" />
								  </div>


										{ time.type == 'indiv_list' ?
											<div>
												<div>
													
											    <input type="submit" name="commit" value="Join" className="btn btn-md btn-wide border-color assign-btn btn-spec btn-primary border-color" style={{backgroundColor: 'green'}} data-disable-with="joining" /><br/>
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
										:
										<div></div>
										}

								</form>
							}
						  </div>

					</div>


				</div>

					


					</div>
				

				</div>
    );
  }
}

