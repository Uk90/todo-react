import React from 'react';
import Header from './Header';
import SidePanel from './SidePanel';
import Category from './Category';
import Comment from './Comment';

class App extends React.Component {
  render(){
    return (
      <div>
        <Header />
        <div className="cointainer">
          <SidePanel />
          <Category />
          <Comment />
        </div>
      </div>
   );
  }
}

export default App;
