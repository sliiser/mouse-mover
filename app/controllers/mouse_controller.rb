class MouseController < WebsocketRails::BaseController
  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def create
  end

  def update
  end

  def destroy
  end

  private

  def create_params
  end
end