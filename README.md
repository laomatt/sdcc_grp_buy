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