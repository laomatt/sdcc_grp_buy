import React from "react"
import PropTypes from "prop-types"
export default class LineDay extends React.Component {
	constructor (props) {
    super(props)
    this.state = {
    	user_id: props.user_id,
    	day: props.day,
    	description: props.description,
    	link: props.link
    }

    this.props = props;
  }


  render () {
    const that = this;
    return (
    	<div>
				<a href={this.state.link} className='btn line-day btn-primary'>
        
        {this.state.day}
				<br/>
        { that.props.owner ? 
          <div class='img-line-day-container'>
            by: {that.props.owner.name}
            <img src={that.props.owner.avatar_url} className='chat-avatar img-circle' alt={that.props.owner.name} style={{float:'right'}}/> 
          </div>
          :
          <div></div>
        }




				</a>
          { this.props.is_admin ? 
            <div>
              <div className="admin_box_line_day" style={{'display':'none'}}>
                <div className="btn btn-warning btn-lg">edit</div>
                <div className="btn btn-danger btn-lg">delete</div>
              </div>
            </div>
            :
            <div></div>
          }
      </div>
    );
  }


}
