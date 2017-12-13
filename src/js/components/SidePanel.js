import React from 'react';
import {getTodos, categoryNewList, addNewTodoList, setSelectedCatgry, updateCategoryname} from '../store/TodoStore';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos:[]
    };
    this.updateTodo = this.updateTodo.bind(this);
  }
  componentWillMount() {
    categoryNewList(this.updateTodo);
  }
  updateTodo(){
    this.setState({
      todos: getTodos(),
    });
  }
  render(){
    return (
     <div className="left-side-panel">
       <User />
       <SidePanelContent todos={this.state.todos} />
     </div>
   );
  }
}

class SidePanelContent extends React.Component {
  render(){
    return (
     <div className="side-panel-content">
        <ToDoInput todos={this.props.todos} />
     </div>
   );
  }
}
class User extends React.Component {
  render(){
    return (
     <div className="todo-heading">
        <i className="fa fa-plus" aria-hidden="true"></i>
        Add New ToDo
     </div>
   );
  }
}
class ToDoInput extends React.Component {

  addNewTodo(e){
    if (e.key === 'Enter' && e.target.value !== '') {
      addNewTodoList(e.target.value)
      e.target.value='';
    }
  }
  render(){
    return (
      <div>
        <div className="todo-input">
            <input type="text" placeholder="Enter TODO's" id="catgryName" onKeyPress={this.addNewTodo}/>
            <i className="fa fa-external-link-square" aria-hidden="true"></i>
        </div>
        <div className="todo-category-all">
            {this.props.todos.map((todo, i) => <CategoryList key={i} Catgindex = {i} todo = {todo}/>)}
        </div>
      </div>

   );
  }
}

class CategoryList extends React.Component {
  render(){
    return (
      <div className="todo-category">
        <i className="fa fa-list" aria-hidden="true"></i>
        <input type="text" value={this.props.todo.category} onChange={updateCategoryname} onClick={(e) => setSelectedCatgry(this.props.Catgindex, e)}/>
     </div>
   );
  }
}

export default SidePanel;
