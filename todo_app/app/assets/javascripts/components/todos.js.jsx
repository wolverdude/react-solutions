Components = (function (Components) {

  var Components.TodoList = React.createClass({
    render: function () {
      <div><ul>
          { this.props.todos.map(function (todo) {
            <li>{ todo.title }</li>
          }) }
      </ul></div>
    }
  });

  var globalRender = function () {
    todos = new Todos(function () {});
    React.render(<TodoList todos={ todos }>);
  };

}(Components || {}));
