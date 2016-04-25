# nodoc
class ApplicationTestController < ActionController::Base
  def test_action
    'Here comes the test'
  end

  def another_test_action
    {
      action: 'Here comes the object test'
    }
  end
end
