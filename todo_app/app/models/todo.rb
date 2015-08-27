class Todo < ActiveRecord::Base
  validates :title, presence: true
  validates :done, inclusion: [true, false]
end
