import React from "react"
import PropTypes from "prop-types"
class LoadingMessage extends React.Component {
  render () {
    return (
      <div>
      	<div className="info_top">
				  <img src="/assets/danger.gif" alt="Danger"/>
				    Your live connection was interrupted, please refresh your browser to continue getting live updates  
				    <img src="/assets/danger.gif" alt="Danger"/>
				</div>
				<div className="loading">
					<img src="/assets/bar.gif" alt="Bar" />
					<br />
					  websocket loading, please wait... (if this takes more than 5 seconds then refresh your browser)
				</div>
      </div>
    );
  }
}

export default LoadingMessage
