import React, { Component } from 'react';

class UpdateContent extends Component{

    constructor(props){
        super(props);
        this.state = {
            id:this.props.data.id,
            title:this.props.data.title,
            desc:this.props.data.desc
        }
        this.inputFormHandler = this.inputFormHandler.bind(this);
    }

    inputFormHandler(e){
        this.setState({[e.target.name]:e.target.value});
    }

    render(){
      console.log(this.props.data);
      console.log('UpdateContent Render');
      return(
        <article>
          <h2>Update</h2>
          <form action="/create_process" method="post" onSubmit={function(e){
            e.preventDefault(); //페이지 안바뀌게 막음
            this.props.onSubmit(
                this.state.id,
                this.state.title,
                this.state.desc
            );
          }.bind(this)}>
            <input type="hidden" name="id" value={this.state.id}></input>
            <p>
                <input type="text" name="title" 
                placeholder="title" value={this.state.title}
                onChange={this.inputFormHandler}></input>
            </p>
            <p>
                <textarea name="desc" placeholder="description" 
                onChange={this.inputFormHandler} value={this.state.desc}></textarea>
            </p>
            <p>
                <input type="submit"></input>
            </p>
          </form>
        </article>
      );
    }
  }

export default UpdateContent;