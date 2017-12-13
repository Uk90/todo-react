var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

var Todos = [];
var selectedCatgry = 0;
var selectedTask = 0;
var showComments = false;
var emptyCmt = {};
var showTask = false;
var istaskCompleted = false;

module.exports = {

  getTodos: function() {
    return Todos;
  },
  getTodoTask: function(id) {
    return Todos[id];
  },
  getShowComments: function() {
    return showComments;
  },
  getSelectedCatgry: function() {
    return selectedCatgry;
  },
  getSelectedTaskId: function() {
    return selectedTask;
  },
  setSelectedCatgry: function(id) {
    selectedCatgry = id;
    showComments = false;
    emmiterAll(['listTask','listComments']);
  },
  setSelectedTaskId: function(id) {
    selectedTask = id;
    showComments = true;
    showTask = true;
    emmiterAll(['listComments']);
  },
  getTodoTaskComments: function(id) {
    if(!showTask){
      return emptyCmt;
    }else{
      return Todos[selectedCatgry].subCategory[id];
    }
  },
  categoryNewList: function(callback) {
    emitter.addListener('listCatgry', callback);
  },
  commentsNewList: function(callback) {
    emitter.addListener('listComments', callback);
  },
  taskNewList: function(callback) {
    emitter.addListener('listTask', callback);
  },
  addNewTodoList: function(newCtgry) {
    Todos = Todos.concat({
      'category':newCtgry,
      'subCategory':[]
    });
    emitter.emit('listCatgry');
  },
  addSubTaskList: function(newSubCtgryName) {
    if(!Todos.length){
      alert('Add Todo to add task');
      return;
    }
    Todos[selectedCatgry].subCategory = Todos[selectedCatgry].subCategory.concat({
      'subTask':newSubCtgryName,
      'description':'',
      'comments':[]
    });
    emitter.emit('listTask');
  },
  updateTaskDescription: function(e){
    Todos[selectedCatgry].subCategory[selectedTask].description = e.target.value;
    emmiterAll(['listTask','listComments']);
  },
  updateTaskCommentsList: function(newComment){
    Todos[selectedCatgry].subCategory[selectedTask].comments = Todos[selectedCatgry].subCategory[selectedTask].comments.concat({
      'comment':newComment,
    });
    emmiterAll(['listComments']);
  },
  updateCategoryname: function(event){
    Todos[selectedCatgry].category = event.target.value;
    emmiterAll(['listCatgry','listTask']);
  },
  updateTaskName: function(event){
    Todos[selectedCatgry].subCategory[selectedTask].subTask = event.target.value;
    emmiterAll(['listTask','listComments']);
  },
  deleteTask: function(){
    delete Todos[selectedCatgry].subCategory[selectedTask];
    showComments = false;
    emmiterAll(['listTask','listComments']);
  },
  completedTask: function(taskIndex){
    var target = getElemId("taskIndex"+taskIndex);
    var icon = getElemId("icon"+taskIndex);
    if(istaskCompleted){
      icon.style.color='#3c495a';
      target.classList.remove("checked");
    }else{
      icon.style.color='#10ef10';
      target.setAttribute('class','checked');
    }
    istaskCompleted = !istaskCompleted;
  },

};
function emmiterAll(tasks){
  tasks.forEach(function (value) {
    emitter.emit(value);
  });
}
function getElemId(id){
  return document.getElementById(id);
}
