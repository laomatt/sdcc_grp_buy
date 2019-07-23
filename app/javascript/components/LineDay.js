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


        <div className='line-day'>
          <div className="row">
            <div className="col-lg-12">

              <a href={this.state.link} className="btn btn-primary btn-lg" style={{width: '100%'}}>
                  <div className="col-md-8" style={{textAlign: 'left'}}>
                    { that.props.owner ? 
                      <div className='img-line-day-container'>
                        {that.props.day.day}
                      </div>
                      :
                      <div></div>
                    }
                  </div>
                  <div className="col-md-4" style={{textAlign: 'left'}}>
                      <p>
                        {that.props.day.description}
                        by: {that.props.owner.name} <br/>
                      </p>
                      <p>
                        starts: {that.props.start}
                      </p>
                  </div>

              </a>

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
