import React from "react"
import PropTypes from "prop-types"
import LineEvent from "./LineEvent"
export default class EventList extends React.Component {
	constructor (props) {
    super(props)
    this.props = props;
  }

  render () {
  	var that = this;
  	var events = that.props.events;
    return (
			<div>
		  	{
		  		events.map(function(event, idx) {
					    return (
					  			<div className="line-day-event-container" key={idx}>
						    		<LineEvent event={event} is_admin={that.props.is_admin}/>
									</div>
						    );
			  	})
		  	}
			</div>
		)
      
  }
}

