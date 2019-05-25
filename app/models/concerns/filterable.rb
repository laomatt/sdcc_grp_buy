module Concerns::Filterable
	extend ActiveSupport::Concern
  def filter_aggregate(filtering_params)
  	results = ""
    filtering_params.each do |key, value|
      results += self.where("#{key} like ?", "%#{value}%")
    end
    
    results
  end
end