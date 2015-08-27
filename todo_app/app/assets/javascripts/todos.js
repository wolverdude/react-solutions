"use strict";

var Todos = function (onChange) {
  this.changed = onChange;
  this._todos = [];
};

Todos.prototype.fetch = function () {
  var url = window.location.origin + "/api/todos";

  ajax("GET", url, {}, function (responseText) {
    this._todos = JSON.parse(responseText);
    this.changed();
  }.bind(this));
};

Todos.prototype.create = function (params) {
  var url = window.location.origin + "/api/todos";
  ajax("POST", url, params, function (responseText) {
    this._todos.push(JSON.parse(responseText));
    this.changed();
  }.bind(this));
};

Todos.prototype.destroy = function (id) {
  var url = window.location.origin + "/api/todos/" + id;
  ajax("DELETE", url, {}, function (responseText) {
    var todoIndex = null;
    this._todos.forEach(function (todo, i) {
      todoIndex = i;
    });
    this._todos.splice(todoIndex, 1);

    this.changed();
  }.bind(this));
};


Todos.prototype.toggleDone = function (id) {
  var url = window.location.origin + "/api/todos/" + id;
  var todo = this._todos.filter(function (todo) {
    return todo.id == id;
  }.bind(this))[0];
  var done = !todo.done;

  ajax("PATCH", url, { done: done } , function (responseText) {
    var todoIndex = null;
    todo.done = done;
    this.changed();
  }.bind(this));
};

Todos.prototype.all = function () {
  return this._todos;
};

var ajax = function (method, url, data, callback) {
  var json = JSON.stringify(data);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE ) {
      if(xhr.status == 200){
        callback(xhr.responseText);
      } else {
        raise (new Error(xhr.status + "\n" + xhr.url));
      }
    }
  }
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(json);
};
