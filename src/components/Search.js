import React, { Component } from 'react';

class Search extends Component {
    state={
        search_keyword : "",
    }

handleChange(event){
    this.setState({
        search_keyword: event.target.value,
    })
}

handleSubmit(event){
    event.preventDefault()
    console.log(this.state.search_keyword)
    this.props.searchSignatures(this.state.search_keyword, 1)
}
reset(){
    this.setState({
        search_keyword: "",
    })
    this.props.resetSignatures()
}
render() {
    return (
        <div className="search_div">
            <div className="desc">
            <div className="search_heading">Looking for a specific app?</div>
                    Browse the Fortiguard Labs extensive encyclopedia of applications. Click any title to view more details of the application. Can't find what you are looking for? Try using the search bar below to find a specific application description.
            </div>
            <form onSubmit={(event)=>{this.handleSubmit(event)}} className="form">
                <input placeholder="Search Application" className="search_box" value={this.state.search_keyword} type="text" onChange={(event)=>this.handleChange(event)}/>
                <a onClick={()=>{this.reset()}} className="reset_search">All</a>
            </form>
        </div>
    );
  }
}

export default Search;