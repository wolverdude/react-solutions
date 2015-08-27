class Api::TodosController < ApplicationController

  def index
    @todos = Todo.all
  end

  def show
    @todo = Todo.find(params[:id])
  end

  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      render 'show', status: :created
    else
      render @todo.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @todo = Todo.find(params[:id])

    if @todo.destroy
      render '', status: :no_content
    else
      render 'show', status: :unprocessable_entity
    end
  end

  def update
    @todo = Todo.find(params[:id])

    if @todo.update_attributes(todo_params)
      render 'show'
    else
      render @todo.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:title, :body, :done)
  end
end
