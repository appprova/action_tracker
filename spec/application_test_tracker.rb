# nodoc
class ApplicationTestTracker < ActionTracker::Base
  def action_test
    'Here comes the test'
  end

  def another_action_test
    {
      action: 'Here comes the object test'
    }
  end
end
