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
												 			12:00 AM  { elem["12:00 AM"] ? 
												 					<a href={'/line_days/' + elem[" 1:00 AM"]['line_day_id']}>{elem[" 1:00 AM"]['day']}</a>
												 					: 
												 					''
												 				}
											 			</div>
														<div line_day_id={elem[" 1:00 AM"]} className={'time_list ' + (elem[" 1:00 AM"] ? 'occupied' : 'free')}>
															 1:00 AM { elem[" 1:00 AM"] ? 
															 		<a href={'/line_days/' + elem[" 1:00 AM"]['line_day_id']}>{elem[" 1:00 AM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem[" 2:00 AM"]} className={'time_list ' + (elem[" 2:00 AM"] ? 'occupied' : 'free')}>
															 2:00 AM { elem[" 2:00 AM"] ? 
															 		<a href={'/line_days/' + elem[" 2:00 AM"]['line_day_id']}>{elem[" 2:00 AM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem[" 3:00 AM"]} className={'time_list ' + (elem[" 3:00 AM"] ? 'occupied' : 'free')}>
															 3:00 AM { elem[" 3:00 AM"] ? 
															 		<a href={'/line_days/' + elem[" 3:00 AM"]['line_day_id']}>{elem[" 3:00 AM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem[" 4:00 AM"]} className={'time_list ' + (elem[" 4:00 AM"] ? 'occupied' : 'free')}>
															 4:00 AM { elem[" 4:00 AM"] ? 
															 		<a href={'/line_days/' + elem[" 4:00 AM"]['line_day_id']}>{elem[" 4:00 AM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem[" 5:00 AM"]} className={'time_list ' + (elem[" 5:00 AM"] ? 'occupied' : 'free')}>
															 5:00 AM { elem[" 5:00 AM"] ? 
															 		<a href={'/line_days/' + elem[" 5:00 AM"]['line_day_id']}>{elem[" 5:00 AM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem[" 6:00 AM"]} className={'time_list ' + (elem[" 6:00 AM"] ? 'occupied' : 'free')}>
															 6:00 AM { elem[" 6:00 AM"] ? 
															 		<a href={'/line_days/' + elem[" 6:00 AM"]['line_day_id']}>{elem[" 6:00 AM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem[" 7:00 AM"]} className={'time_list ' + (elem[" 7:00 AM"] ? 'occupied' : 'free')}>
															 7:00 AM { elem[" 7:00 AM"] ? 
															 		<a href={'/line_days/' + elem[" 7:00 AM"]['line_day_id']}>{elem[" 7:00 AM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem[" 8:00 AM"]} className={'time_list ' + (elem[" 8:00 AM"] ? 'occupied' : 'free')}>
															 8:00 AM { elem[" 8:00 AM"] ? 
															 		<a href={'/line_days/' + elem[" 8:00 AM"]['line_day_id']}>{elem[" 8:00 AM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem[" 9:00 AM"]} className={'time_list ' + (elem[" 9:00 AM"] ? 'occupied' : 'free')}>
															 9:00 AM { elem[" 9:00 AM"] ? 
															 		<a href={'/line_days/' + elem[" 9:00 AM"]['line_day_id']}>{elem[" 9:00 AM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem["10:00 AM"]} className={'time_list ' + (elem["10:00 AM"] ? 'occupied' : 'free')}>
															10:00 AM { elem["10:00 AM"] ? 
																	<a href={'/line_days/' + elem["10:00 AM"]['line_day_id']}>{elem["10:00 AM"]['day']}</a>
																	: 
																	''
																}
														</div>
														<div line_day_id={elem["11:00 AM"]} className={'time_list ' + (elem["11:00 AM"] ? 'occupied' : 'free')}>
															11:00 AM { elem["11:00 AM"] ? 
																	<a href={'/line_days/' + elem["11:00 AM"]['line_day_id']}>{elem["11:00 AM"]['day']}</a>
																	: 
																	''
																}
														</div>
														<div line_day_id={elem["12:00 PM"]} className={'time_list ' + (elem["12:00 PM"] ? 'occupied' : 'free')}>
															12:00 PM { elem["12:00 PM"] ? 
																	<a href={'/line_days/' + elem["12:00 PM"]['line_day_id']}>{elem["12:00 PM"]['day']}</a>
																	: 
																	''
																}
														</div>
														<div line_day_id={elem[" 1:00 PM"]} className={'time_list ' + (elem[" 1:00 PM"] ? 'occupied' : 'free')}>
															 1:00 PM { elem[" 1:00 PM"] ? 
															 		<a href={'/line_days/' + elem[" 1:00 PM"]['line_day_id']}>{elem[" 1:00 PM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem[" 2:00 PM"]} className={'time_list ' + (elem[" 2:00 PM"] ? 'occupied' : 'free')}>
															 2:00 PM { elem[" 2:00 PM"] ? 
															 		<a href={'/line_days/' + elem[" 2:00 PM"]['line_day_id']}>{elem[" 2:00 PM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem[" 3:00 PM"]} className={'time_list ' + (elem[" 3:00 PM"] ? 'occupied' : 'free')}>
															 3:00 PM { elem[" 3:00 PM"] ? 
															 		<a href={'/line_days/' + elem[" 3:00 PM"]['line_day_id']}>{elem[" 3:00 PM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem[" 4:00 PM"]} className={'time_list ' + (elem[" 4:00 PM"] ? 'occupied' : 'free')}>
															 4:00 PM { elem[" 4:00 PM"] ? 
															 		<a href={'/line_days/' + elem[" 4:00 PM"]['line_day_id']}>{elem[" 4:00 PM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem[" 5:00 PM"]} className={'time_list ' + (elem[" 5:00 PM"] ? 'occupied' : 'free')}>
															 5:00 PM { elem[" 5:00 PM"] ? 
															 		<a href={'/line_days/' + elem[" 5:00 PM"]['line_day_id']}>{elem[" 5:00 PM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem[" 6:00 PM"]} className={'time_list ' + (elem[" 6:00 PM"] ? 'occupied' : 'free')}>
															 6:00 PM { elem[" 6:00 PM"] ? 
															 		<a href={'/line_days/' + elem[" 6:00 PM"]['line_day_id']}>{elem[" 6:00 PM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem[" 7:00 PM"]} className={'time_list ' + (elem[" 7:00 PM"] ? 'occupied' : 'free')}>
															 7:00 PM { elem[" 7:00 PM"] ? 
															 		<a href={'/line_days/' + elem[" 7:00 PM"]['line_day_id']}>{elem[" 7:00 PM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem[" 8:00 PM"]} className={'time_list ' + (elem[" 8:00 PM"] ? 'occupied' : 'free')}>
															 8:00 PM { elem[" 8:00 PM"] ? 
															 		<a href={'/line_days/' + elem[" 8:00 PM"]['line_day_id']}>{elem[" 8:00 PM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem[" 9:00 PM"]} className={'time_list ' + (elem[" 9:00 PM"] ? 'occupied' : 'free')}>
															 9:00 PM { elem[" 9:00 PM"] ? 
															 		<a href={'/line_days/' + elem[" 9:00 PM"]['line_day_id']}>{elem[" 9:00 PM"]['day']}</a>
															 		: 
															 		''
															 	}
														</div>
														<div line_day_id={elem["10:00 PM"]} className={'time_list ' + (elem["10:00 PM"] ? 'occupied' : 'free')}>
															10:00 PM { elem["10:00 PM"] ? 
																	<a href={'/line_days/' + elem["10:00 PM"]['line_day_id']}>{elem["10:00 PM"]['day']}</a>
																	: 
																	''
																}
														</div>
														<div line_day_id={elem["11:00 PM"]} className={'time_list ' + (elem["11:00 PM"] ? 'occupied' : 'free')}>
															11:00 PM { elem["11:00 PM"] ? 
																	<a href={'/line_days/' + elem["11:00 PM"]['line_day_id']}>{elem["11:00 PM"]['day']}</a>
																	: 
																	''
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



























