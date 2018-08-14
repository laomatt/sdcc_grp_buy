# README

to run tests:
```
bundle exec rspec spec/path-to-spec-file_spec.rb
```

to get react working with rails:
```
bundle exec rails webpacker:install:react

rails g react:component TimeSlot
rails g react:component PersonContact
```


If the rails generator hangs run:

```
spring stop	

```

To run the chat box in local host

```
redis-server
sh reset.sh
```


To run the mail catcher in dev

```
gem install mailcatcher
mailcather



then: http://127.0.0.1:1080/

```