import React from "react"
import PropTypes from "prop-types"
export default class LineEvent extends React.Component {
	constructor (props) {
    super(props)
    this.props = props;
  }


  render () {
    const that = this;
    return (
    	<div>

        <a href={"/line_up_events/" + that.props.event.line_up_event_id} className="btn btn-primary btn-lg event-label">
          {that.props.event.event_name}
        </a>

        <div className='line-day' style={{textAlign: 'left', color: 'white', backgroundColor: 'transparent'}}>
          <div className="row">
            <div className="col-md-12" style={{textAlign: 'left', color: 'white', backgroundColor: 'transparent'}}>


            
              { that.props ? 
                <div className='img-line-day-container'>
                  <div className="row">
                    <div className="col-sm-3">
                      <img src={that.props.event.avatar_url} className='chat_avatar_el chat_avatar' style={{width: "100%"}}/> 
                      <br/>
                      <hr/>
                      by: {that.props.event.user_name}  
                    </div>
                    <div className="col-sm-9">

                      <p>
                        {that.props.event.description}
                      </p>
                      { that.props.event.start_date ? 
                          <p>
                            starts: {that.props.event.start_date.toLocaleString('es-ES', {weekday: 'short', month: 'short', day: 'numeric' })}
                          </p>
                          :
                          <p></p>

                      }
                      
                      
                    </div>
                  </div>
                </div>
                :
                <div></div>
              }
            </div>


          </div>


        </div>
        { this.props.is_admin ? 
          <div>
            <div className="admin_box_line_day" style={{'display':'inline-block'}}>
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
