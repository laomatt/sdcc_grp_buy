import React from "react"
import PropTypes from "prop-types"

export default class PersonContact extends React.Component {

	constructor (props) {
    super(props)
    this.state = {
    	id: props.user_id,
    	name: props.name,
      slot_id: props.slot_id,
      espanded: false
    }

    this.expandBox = this.expandBox.bind(this);
    this.closeBox = this.closeBox.bind(this);
  }

  expandBox() {
    this.setState((prevState, props) => ({
        expanded: true
    }));
  }

  closeBox(){
    this.setState((prevState, props) => ({
        expanded: false
    }));

  }


  render () {
    return (
	    	<a href="#" style={{backgroundColor: (this.props.current_user_id == this.props.user_id ? 'red' : '#3c8dbc' )}} data-id={this.state.id} data-toggle="modal" data-identifier={this.state.name} data-target="#timeSlotContactModal" data-type={this.props.type} data-slot-id={this.state.slot_id} className='btn btn-md btn-person btn-primary broadcast-message btn-contact-list-item border-color' end-pt='/holders/send_text' alt={this.state.name} onMouseOut={this.closeBox} onMouseOver={this.expandBox}>
          <img src={this.props.avatar_url} className="img-circle border-color" alt="User Image" /> 
          <span style={{backgroundColor: (this.props.current_user_id == this.props.user_id ? 'red' : '#3c8dbc' )}} className={"nameUser " + (this.state.expanded ? 'visible-name-span' : 'non-visible-name-span')}>{this.props.name}</span>
        </a>
    );
  }
}
