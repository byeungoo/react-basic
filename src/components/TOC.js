import React, { Component } from 'react';

class TOC extends Component{
    render(){
        console.log('TOC Render');
        var lists = [];
        var data = this.props.data;
        var i = 0;
        
        //여러개 생성하는 경우 key에 id를 줘야함
        while(i < data.length){
            lists.push(<li key={data[i].id}>
                <a 
                    href={"/content" + data[i].id}
                    data-id={data[i].id}
                    onClick={function(id, e){
                        e.preventDefault();
                        // this.props.onChangePage(e.target.dataset.id);
                        this.props.onChangePage(id);
                    }.bind(this, data[i].id)}>{data[i].title}
                </a>
            </li>);
            i = i + 1;
        }

        return(
        <nav>
            <ul>
                {lists}
            </ul>
        </nav>
        );
    }
}  

//이걸 통해서 외부에서 TOC 사용가능
export default TOC;  //여러가지 변수나 함수들을 외부에서 사용할 수 있게 할지. 