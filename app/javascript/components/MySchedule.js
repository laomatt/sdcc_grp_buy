import React from "react"
import PropTypes from "prop-types"
class MySchedule extends React.Component {
  render () {
  	const time = this.props;
    return (
				<div className="row">
					{time.day_hash.map(function(elem, idx) {
							return (
									<div className="btn col-lg-2 time_col">
														<div className='time_list time_header'>
													 		{elem.day_str}
														</div>
											 			<div line_day_id={elem["12:00 AM"]} className={'time_list ' + (elem["12:00 AM"] ? 'occupied' : 'free')}>
												 			 { elem["12:00 AM"] ? 
												 					<a href={'/line_days/' + elem[" 1:00 AM"]['line_day_id']}>{elem["12:00 AM"]['day']} <br/> {elem["12:00 AM"]['present_time']}</a>
												 					: 
												 					'12:00 AM'
												 				}
											 			</div>
														<div line_day_id={elem[" 1:00 AM"]} className={'time_list ' + (elem[" 1:00 AM"] ? 'occupied' : 'free')}>
															 { elem[" 1:00 AM"] ? 
															 		<a style={ elem["12:00 AM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 1:00 AM"]['line_day_id']}>{elem[" 1:00 AM"]['day']} <br/> {elem[" 1:00 AM"]['present_time']}</a>
															 		: 
															 		' 1:00 AM'
															 	}
														</div>
														<div line_day_id={elem[" 2:00 AM"]} className={'time_list ' + (elem[" 2:00 AM"] ? 'occupied' : 'free')}>
															 { elem[" 2:00 AM"] ? 
															 		<a style={ elem[" 1:00 AM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 2:00 AM"]['line_day_id']}>{elem[" 2:00 AM"]['day']} <br/> {elem[" 2:00 AM"]['present_time']}</a>
															 		: 
															 		' 2:00 AM'
															 	}
														</div>
														<div line_day_id={elem[" 3:00 AM"]} className={'time_list ' + (elem[" 3:00 AM"] ? 'occupied' : 'free')}>
															 { elem[" 3:00 AM"] ? 
															 		<a style={ elem[" 2:00 AM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 3:00 AM"]['line_day_id']}>{elem[" 3:00 AM"]['day']} <br/> {elem[" 3:00 AM"]['present_time']}</a>
															 		: 
															 		' 3:00 AM'
															 	}
														</div>
														<div line_day_id={elem[" 4:00 AM"]} className={'time_list ' + (elem[" 4:00 AM"] ? 'occupied' : 'free')}>
															 { elem[" 4:00 AM"] ? 
															 		<a style={ elem[" 3:00 AM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 4:00 AM"]['line_day_id']}>{elem[" 4:00 AM"]['day']} <br/> {elem[" 4:00 AM"]['present_time']}</a>
															 		: 
															 		' 4:00 AM'
															 	}
														</div>
														<div line_day_id={elem[" 5:00 AM"]} className={'time_list ' + (elem[" 5:00 AM"] ? 'occupied' : 'free')}>
															 { elem[" 5:00 AM"] ? 
															 		<a style={ elem[" 4:00 AM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 5:00 AM"]['line_day_id']}>{elem[" 5:00 AM"]['day']} <br/> {elem[" 5:00 AM"]['present_time']}</a>
															 		: 
															 		' 5:00 AM'
															 	}
														</div>
														<div line_day_id={elem[" 6:00 AM"]} className={'time_list ' + (elem[" 6:00 AM"] ? 'occupied' : 'free')}>
															 { elem[" 6:00 AM"] ? 
															 		<a style={ elem[" 5:00 AM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 6:00 AM"]['line_day_id']}>{elem[" 6:00 AM"]['day']} <br/> {elem[" 6:00 AM"]['present_time']}</a>
															 		: 
															 		' 6:00 AM'
															 	}
														</div>
														<div line_day_id={elem[" 7:00 AM"]} className={'time_list ' + (elem[" 7:00 AM"] ? 'occupied' : 'free')}>
															 { elem[" 7:00 AM"] ? 
															 		<a style={ elem[" 6:00 AM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 7:00 AM"]['line_day_id']}>{elem[" 7:00 AM"]['day']} <br/> {elem[" 7:00 AM"]['present_time']}</a>
															 		: 
															 		' 7:00 AM'
															 	}
														</div>
														<div line_day_id={elem[" 8:00 AM"]} className={'time_list ' + (elem[" 8:00 AM"] ? 'occupied' : 'free')}>
															 { elem[" 8:00 AM"] ? 
															 		<a style={ elem[" 7:00 AM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 8:00 AM"]['line_day_id']}>{elem[" 8:00 AM"]['day']} <br/> {elem[" 8:00 AM"]['present_time']}</a>
															 		: 
															 		' 8:00 AM'
															 	}
														</div>
														<div line_day_id={elem[" 9:00 AM"]} className={'time_list ' + (elem[" 9:00 AM"] ? 'occupied' : 'free')}>
															 { elem[" 9:00 AM"] ? 
															 		<a style={ elem[" 8:00 AM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 9:00 AM"]['line_day_id']}>{elem[" 9:00 AM"]['day']} <br/> {elem[" 9:00 AM"]['present_time']}</a>
															 		: 
															 		' 9:00 AM'
															 	}
														</div>
														<div line_day_id={elem["10:00 AM"]} className={'time_list ' + (elem["10:00 AM"] ? 'occupied' : 'free')}>
															 { elem["10:00 AM"] ? 
																	<a style={ elem[" 9:00 AM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem["10:00 AM"]['line_day_id']}>{elem["10:00 AM"]['day']} <br/> {elem["10:00 AM"]['present_time']}</a>
																	: 
																	'10:00 AM'
																}
														</div>
														<div line_day_id={elem["11:00 AM"]} className={'time_list ' + (elem["11:00 AM"] ? 'occupied' : 'free')}>
															 { elem["11:00 AM"] ? 
																	<a style={ elem["10:00 AM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem["11:00 AM"]['line_day_id']}>{elem["11:00 AM"]['day']} <br/> {elem["11:00 AM"]['present_time']}</a>
																	: 
																	'11:00 AM'
																}
														</div>
														<div line_day_id={elem["12:00 PM"]} className={'time_list ' + (elem["12:00 PM"] ? 'occupied' : 'free')}>
															 { elem["12:00 PM"] ? 
																	<a style={ elem["11:00 AM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem["12:00 PM"]['line_day_id']}>{elem["12:00 PM"]['day']} <br/> {elem["12:00 PM"]['present_time']}</a>
																	: 
																	'12:00 PM'
																}
														</div>
														<div line_day_id={elem[" 1:00 PM"]} className={'time_list ' + (elem[" 1:00 PM"] ? 'occupied' : 'free')}>
															 { elem[" 1:00 PM"] ? 
															 		<a style={ elem["12:00 PM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 1:00 PM"]['line_day_id']}>{elem[" 1:00 PM"]['day']} <br/> {elem[" 1:00 PM"]['present_time']}</a>
															 		: 
															 		' 1:00 PM'
															 	}
														</div>
														<div line_day_id={elem[" 2:00 PM"]} className={'time_list ' + (elem[" 2:00 PM"] ? 'occupied' : 'free')}>
															 { elem[" 2:00 PM"] ? 
															 		<a style={ elem[" 1:00 PM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 2:00 PM"]['line_day_id']}>{elem[" 2:00 PM"]['day']} <br/> {elem[" 2:00 PM"]['present_time']}</a>
															 		: 
															 		' 2:00 PM'
															 	}
														</div>
														<div line_day_id={elem[" 3:00 PM"]} className={'time_list ' + (elem[" 3:00 PM"] ? 'occupied' : 'free')}>
															 { elem[" 3:00 PM"] ? 
															 		<a style={ elem[" 2:00 PM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 3:00 PM"]['line_day_id']}>{elem[" 3:00 PM"]['day']} <br/> {elem[" 3:00 PM"]['present_time']}</a>
															 		: 
															 		' 3:00 PM'
															 	}
														</div>
														<div line_day_id={elem[" 4:00 PM"]} className={'time_list ' + (elem[" 4:00 PM"] ? 'occupied' : 'free')}>
															 { elem[" 4:00 PM"] ? 
															 		<a style={ elem[" 3:00 PM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 4:00 PM"]['line_day_id']}>{elem[" 4:00 PM"]['day']} <br/> {elem[" 4:00 PM"]['present_time']}</a>
															 		: 
															 		' 4:00 PM'
															 	}
														</div>
														<div line_day_id={elem[" 5:00 PM"]} className={'time_list ' + (elem[" 5:00 PM"] ? 'occupied' : 'free')}>
															 { elem[" 5:00 PM"] ? 
															 		<a style={ elem[" 4:00 PM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 5:00 PM"]['line_day_id']}>{elem[" 5:00 PM"]['day']} <br/> {elem[" 5:00 PM"]['present_time']}</a>
															 		: 
															 		' 5:00 PM'
															 	}
														</div>
														<div line_day_id={elem[" 6:00 PM"]} className={'time_list ' + (elem[" 6:00 PM"] ? 'occupied' : 'free')}>
															 { elem[" 6:00 PM"] ? 
															 		<a style={ elem[" 5:00 PM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 6:00 PM"]['line_day_id']}>{elem[" 6:00 PM"]['day']} <br/> {elem[" 6:00 PM"]['present_time']}</a>
															 		: 
															 		' 6:00 PM'
															 	}
														</div>
														<div line_day_id={elem[" 7:00 PM"]} className={'time_list ' + (elem[" 7:00 PM"] ? 'occupied' : 'free')}>
															 { elem[" 7:00 PM"] ? 
															 		<a style={ elem[" 6:00 PM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 7:00 PM"]['line_day_id']}>{elem[" 7:00 PM"]['day']} <br/> {elem[" 7:00 PM"]['present_time']}</a>
															 		: 
															 		' 7:00 PM'
															 	}
														</div>
														<div line_day_id={elem[" 8:00 PM"]} className={'time_list ' + (elem[" 8:00 PM"] ? 'occupied' : 'free')}>
															 { elem[" 8:00 PM"] ? 
															 		<a style={ elem[" 7:00 PM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 8:00 PM"]['line_day_id']}>{elem[" 8:00 PM"]['day']} <br/> {elem[" 8:00 PM"]['present_time']}</a>
															 		: 
															 		' 8:00 PM'
															 	}
														</div>
														<div line_day_id={elem[" 9:00 PM"]} className={'time_list ' + (elem[" 9:00 PM"] ? 'occupied' : 'free')}>
															 { elem[" 9:00 PM"] ? 
															 		<a style={ elem[" 8:00 PM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem[" 9:00 PM"]['line_day_id']}>{elem[" 9:00 PM"]['day']} <br/> {elem[" 9:00 PM"]['present_time']}</a>
															 		: 
															 		' 9:00 PM'
															 	}
														</div>
														<div line_day_id={elem["10:00 PM"]} className={'time_list ' + (elem["10:00 PM"] ? 'occupied' : 'free')}>
															 { elem["10:00 PM"] ? 
																	<a style={ elem[" 9:00 PM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem["10:00 PM"]['line_day_id']}>{elem["10:00 PM"]['day']} <br/> {elem["10:00 PM"]['present_time']}</a>
																	: 
																	'10:00 PM'
																}
														</div>
														<div line_day_id={elem["11:00 PM"]} className={'time_list ' + (elem["11:00 PM"] ? 'occupied' : 'free')}>
															 { elem["11:00 PM"] ? 
																	<a style={ elem["10:00 PM"] ? {display: 'none'} : {display: 'block'} } href={'/line_days/' + elem["11:00 PM"]['line_day_id']}>{elem["11:00 PM"]['day']} <br/> {elem["11:00 PM"]['present_time']}</a>
																	: 
																	'11:00 PM'
																}
														</div>
									</div>
								) 
					})}
				</div>
    );
  }
}

export default MySchedule



























