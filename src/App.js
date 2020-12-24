import React, { Component } from 'react';
import './App.css';  //App이라는 컴포넌트의 디자인
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component {

  //내부적으로 사용하는건 안에 컴포넌트안에 state로 감춤
  constructor(props){
    super(props);
    this.max_content_id = 3;  //UI에 영향을 주지 않는 값은 state 값으로 안해도 됨.
    this.state = {
      mode : 'welcome',
      selected_content_id:1,
      subject:{title: 'WEB', sub:'World Wide Web!'},
      welcome:{title:'Welcome', desc:'Hello React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'},
      ]
    }
  }

  getReadContent(){
    var i = 0;
    while(i < this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
        break;
      }
      i = i + 1;
    }
  }

  getContent(){
    console.log('App Render');
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    } else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc) {
        this.max_content_id = this.max_content_id + 1;
        
        //push는 원본을 바꿈. 성능 바꿀 때 힘들어짐
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );


        //push 쓰고 싶으면 Array.from으로 내용복사 기능 사용
        // var newContents = Array.from(this.state.contents);
        // newContents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );

        //concat은 원본은 그대로임. state를 변경할 때는 concat을 사용하기
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );

        this.setState({
          contents: _contents
        });

      }.bind(this)}></CreateContent>;
    } else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc) {

          var _contents = Array.from(this.state.contents);

          var i = 0;
          while(i < _contents.length){
            if(_contents[i].id === _id){
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
            i = i + 1;
          }

          this.setState({
            contents: _contents
          });

        }.bind(this)}></UpdateContent>;
    }
    
    return _article;
  }

  //state의 값을 props에 전달
  render() {

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

          if(_mode === 'delete'){
            if(window.confirm("really?")){
              var _contents = Array.from(this.state.contents);

              var i = 0;
              while(i < _contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1); //i부터 1개를 지운다
                  this.max_content_id = this.max_content_id-1;
                  break;
                }
                i += 1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents,
              })
              alert('deleted!');
            }
          } else{
            this.setState({
              mode:_mode
            })
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;