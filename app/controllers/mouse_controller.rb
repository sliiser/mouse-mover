class MouseController < WebsocketRails::BaseController
  before_action :authenticate_user!

  def initialize_session
  end

  def create
  	target.send_message :create, message, namespace: 'mouse'
  end

  def update
    target.send_message :update, message, namespace: 'mouse'
  end

  def destroy
    target.send_message :destroy, message, namespace: 'mouse'
  end

  private

  def target
    WebsocketRails.users[message[:user_id]]
  end
end