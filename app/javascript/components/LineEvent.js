import React from "react"
import PropTypes from "prop-types"
export default class LineEvent extends React.Component {
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


        <div className='line-day' style={{textAlign: 'left', color: 'white', backgroundColor: 'transparent'}}>
          <div className="row">
            <div className="col-md-12" style={{textAlign: 'left', color: 'white', backgroundColor: 'transparent'}}>

              <a href={this.state.link} className="btn btn-primary btn-lg" style={{width: '100%', marginBottom: '3%'}}>
                {that.props.title}
              </a>

            
              { that.props.owner ? 
                <div className='img-line-day-container'>
                  by: {that.props.owner.name} <br/>

                  <p>
                    {that.props.day.description}
                  </p>

                  <p>
                    starts: {that.props.start}
                  </p>
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
