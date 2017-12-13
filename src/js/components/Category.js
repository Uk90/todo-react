import React from 'react';
import {getSelectedCatgry, getTodoTask, taskNewList, addSubTaskList, setSelectedTaskId, completedTask} from '../store/TodoStore';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task:{},
      showTask:false
    };
  }
  componentWillMount() {
    var SelectedCatgry = getSelectedCatgry();
    this.setState({
      task: getTodoTask(SelectedCatgry),
    });
    taskNewList(this.updateTask.bind(this));
    if(!this.state.task.length){
      this.setState({
        task: {
          category:'Category',
          subCategory:[]
        },
      });
    }
  }
  updateTask(){
    var SelectedCatgry = getSelectedCatgry();
    this.setState({
      task: getTodoTask(SelectedCatgry),
    });
  }

  render(){
    const {task} = this.state;
    return (
      <div className="category">
        <Heading catName={task.category} />
        <SubCategoryInput subTask={task.subCategory} />
      </div>
   );
  }
}
class Heading extends React.Component {
  render(){
    return (
      <div className="heading">
        <h4>
          <i className="fa fa-tasks" aria-hidden="true"></i>
          {this.props.catName}
        </h4>
     </div>
   );
  }
}
class SubCategoryInput extends React.Component {
  addNewTask(e){
    if (e.key === 'Enter' && e.target.value !== '') {
      addSubTaskList(e.target.value)
      e.target.value='';
    }
  }
  render(){
    return (
      <div>
        <div className="task-input">
            <input type="text" placeholder="Enter Task's" id="subCtgryName" onKeyPress={this.addNewTask}/>
        </div>
        <div className="task-category">
            {this.props.subTask.map((task, i) => <SubCategoryList key={i} taskIndex = {i} task = {task}/>)}
        </div>
      </div>
   );
  }
}
class SubCategoryList extends React.Component {
  render(){
    const {taskIndex, task} = this.props;
    return (
      <div className="category-list">
        <div className="check">
          <i className="fa fa-thumb-tack" aria-hidden="true"></i>
        </div>
        <div className="sub-category">
          <h3 id={"taskIndex" + taskIndex} onClick={(e) => setSelectedTaskId(taskIndex, e)}>{task.subTask}
            <i id={"icon" + taskIndex} className="fa fa-check flt-right" title="Delete Task" aria-hidden="true" onClick={(e) => completedTask(taskIndex, e)}></i>
          </h3>
          <p>{this.props.task.description}.</p>
        </div>
      </div>
   );
  }
}

export default Category;
