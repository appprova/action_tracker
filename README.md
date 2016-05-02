<a href="https://codeclimate.com/github/appprova/action_tracker"><img src="https://codeclimate.com/github/appprova/action_tracker/badges/gpa.svg" /></a>
[![Build Status](https://travis-ci.org/appprova/action_tracker.svg?branch=develop)](https://travis-ci.org/appprova/action_tracker)
[ ![Codeship Status for appprova/action_tracker](https://codeship.com/projects/a038f7b0-f2ce-0133-3399-42c612817579/status?branch=master)](https://codeship.com/projects/149594)

# Action Tracker

Action and event trackers made easy. With this gem you can track your user actions without adding unnecessary code in your controllers.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'action_tracker'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install action_tracker

<!-- ## Usage

To use Action Tracker is easy, is needed to create a Tracker to any Controller to track. The structure of the files is simple.

To specify the tracker tool you want to use, you need to create a initializer and set the wanted tools.

```ruby
# config/initializers/action_tracker.rb
ActionTracker::Settings.configuration do |config|
  config.use_tool :mix_panel
  config.use_tool :dito
  config.use_tool :custom_tool
end
``` -->

The Tracker file structure must follow the controllers names and actions

### Simple usage

Simple add the wanted actions to track, with same name as the controller.

```ruby
# app/trackers/users_tracker.rb
class UsersTracker < ActionTracker::Base
  # This file tracks UsersController

  def index; end
  def show; end
  def create; end
end
```

### Advanced usage

The parameters that will be send to Tracker tools can be easily customized. As the example above, is necessary to create the action, same as controllers and the return will be send to tracker tool.

```ruby
# app/trackers/posts_tracker.rb
class PostsTracker < ActionTracker::Base
  # This file tracks PostsController

  def show
    {
      name: 'post-was-viewed',
      data: {
        post_id: @post.id,
        tags: @post.tags
      }
    }
  end
end
```

#### Options

| Name | Description | Default |
|--|--|--|--|
|*name*| The name of the tracked event.  | The controller action name. Eg.: 'users#index'|

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/appprova/action_tracker.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
