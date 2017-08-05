WebsocketRails::EventMap.describe do
  # You can use this file to map incoming events to controller actions.
  # One event can be mapped to any number of controller actions. The
  # actions will be executed in the order they were subscribed.
  # subscribe :client_connected, 'groups#new_user'
  #
  # Uncomment and edit the next line to handle the client connected event:
  #   subscribe :client_connected, :to => Controller, :with_method => :method_name
  #
  # Here is an example of mapping namespaced events:
  #   namespace :product do
  #     subscribe :new, :to => ProductController, :with_method => :new_product
  #   end
  # namespace :chatroom do
  #   subscribe :create_room, "groups#create_room"
  #   subscribe :update_members, 'groups#update'
  # end
  
  # namespace :members do
  subscribe :register_member, "broadcasts#register_member_to_group"
  subscribe :unregister, "broadcasts#delete_member_from_group"
  subscribe :cover_member, "broadcasts#mark_member_as_covered_for_all_groups"
  # end
  # The above will handle an event triggered on the client like `product.new`.
end
