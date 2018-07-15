import React from "react"
import PropTypes from "prop-types"
class DayContainer extends React.Component {
  render () {
  	var days = ['wensday','thursday','friday','saturday','sunday'];
  	var dayMap = {
  		'wensday': 'WENS',
  		'thursday': 'THURS',
  		'friday': 'FRI',
  		'saturday': 'SAT',
  		'sunday': 'SUN'
  	}

    return (
      { type == 'need' 
				for (var i = days.length - 1; i >= 0; i--) {
					var day = days[i]
					{ member[day] ?
						<div class="day-block">
								{dayMap[day]}
						</div>
						:
						<div></div>
					}
				}

			:

				<% if member.min_days %>
					<% ['wensday','thursday','friday','saturday','sunday'].each do |day| %>
						<% if member.min_days[day] && member.needs[day] %>
							<div class="day-block" style="background-color: <%= member.days_bought[day] ? 'red' : '#d9fcd9' %>;color: <%= member.days_bought[day] ? 'white' : 'black' %>;">
									<%= day_map[day] %>
							</div>
						<% end %>
					<% end %>
				<% else %>
					-n/a-
				<% end %>
			}    

			);
  }
}

export default DayContainer
