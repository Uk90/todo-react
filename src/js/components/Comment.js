import React from 'react';
import {getSelectedTaskId,getShowComments, commentsCheckCommentState,  getTodoTaskComments, commentsNewList, updateTaskName, updateTaskCommentsList, updateTaskDescription, deleteTask} from '../store/TodoStore';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments:{},
      showComments:false
    };
  }
  componentWillMount() {
    commentsNewList(this.updateComments.bind(this));
  }
  updateComments(){
    var selectedTaskId = getSelectedTaskId();
    this.setState({
      comments: getTodoTaskComments(selectedTaskId),
      showComments:getShowComments()
    });
  }
  render(){
    const {showComments, comments} = this.state;
    if(!showComments){
      return '';
    }
    return (
     <div className="comment-cointainor">
       <TitleSecEdit />
       <TaskTitle task={comments.subTask} />
       <Description taskDesc={comments.description} taskCmts={comments.comments} />
     </div>
   );
  }
}
class TaskTitle extends React.Component {
  render(){
    return (
     <div className="title">
      <i className="fa fa-bell" aria-hidden="true"></i>
        <input type="text" value={this.props.task} onChange={updateTaskName} />
     </div>
   );
  }
}
class Description extends React.Component {
  addNewComment(e){
    if (e.key === 'Enter' && e.target.value !== '') {
      updateTaskCommentsList(e.target.value)
      e.target.value='';
    }
  }
  render(){
    return (
      <div>
        <div className="title-description">
          <h4><i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            Description:
          </h4>
          <textarea name="name" rows="4" cols="30" maxLength="80" onChange={updateTaskDescription} value={this.props.taskDesc} placeholder="Enter your description"></textarea>
        </div>
        <div className="comments-input">
          <h4><i className="fa fa-comments" aria-hidden="true"></i>
          Comments:
          </h4>
          <input type="text" placeholder="Add Comments" id="tskComment" onKeyPress={this.addNewComment}/>
        </div>
        <div className="comments-sec">
          {this.props.taskCmts.map((cmts, i) => <Comments key={i} cmnts = {cmts}/>)}
        </div>
      </div>
   );
  }
}

class Comments extends React.Component {

  render(){
    return (
        <div className="comments-list">
          <h3><i className="fa fa-comment-o" aria-hidden="true"></i>{this.props.cmnts.comment}</h3>
        </div>
    );
  }
}
class TitleSecEdit extends React.Component {
  render(){
    return (
      <div className="task-delete">
        <h3>
          <i className="fa fa-trash-o flt-right" title="Delete Task" aria-hidden="true" onClick={deleteTask}></i>
        </h3>
      </div>
   );
  }
}

export default Comment;
