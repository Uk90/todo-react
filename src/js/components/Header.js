import React from 'react';

class Header extends React.Component {
  render(){
    return (
     <header>
       <div className="header-conatinor">
         <HeaderLogo />
         <HeaderBody />
         <User />
       </div>
     </header>
   );
  }
}
class HeaderLogo extends React.Component {
  render(){
    return (
     <div className="header-logo">
      <img src={"/images/todo.jpg"} alt=""/>
     </div>
   );
  }
}
class User extends React.Component {
  render(){
    return (
     <div className="todo-profile">
     <img src={"/images/profile.jpg"} alt=""/>
      <div className="profile-name">Unni Krishnan M</div>
     </div>
   );
  }
}
class HeaderBody extends React.Component {
  render(){
    return (
     <div className="header-body">
      <h1>
        To-Do APP
      </h1>
    </div>
   );
  }
}
export default Header;
