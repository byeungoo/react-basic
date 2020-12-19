import React, { Component } from 'react';
import './App.css';  //App이라는 컴포넌트의 디자인
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import CreateContent from './components/CreateContent';

class App extends Component {

  //내부적으로 사용하는건 안에 컴포넌트안에 state로 감춤
  constructor(props){
    super(props);
    this.state = {
      mode : 'read',
      selected_content_id:2,
      subject:{title: 'WEB', sub:'World Wide Web!'},
      welcome:{title:'Welcome', desc:'Hello React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'},
      ]
    }
  }

  //state의 값을 props에 전달
  render() {
    console.log('App Render');
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if(this.state.mode === 'read'){
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];

        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }

      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if(this.state.mode === 'create'){
      _article = <CreateContent></CreateContent>;
    }

    return(
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode: 'welcome'});
          }.bind(this)}
        >
        </Subject>
        {/* <header>
          <h1><a href="/" onClick={function(e){
            console.log(e);
            e.preventDefault(); //a태그 기본적인 동작방법 금지
            this.setState({
              mode: 'welcome'
            });
          }.bind(this) }>{this.state.subject.title}</a></h1>
          {this.state.subject.sub}
        </header> */}
        <TOC 
          onChangePage={function(id) {
            this.setState({
              mode: 'read',
              selected_content_id :Number(id)
          });
          }.bind(this)} 
          data={this.state.contents}>
        </TOC>
        <Control onChangeMode={function(_mode){
          this.setState({
            mode:_mode
          })
        }.bind(this)}></Control>
        {_article}
      </div>
    );
  }
}

export default App;