import React, { Component } from 'react';

class Filter extends Component {

handleChange(event){
    this.setState({
        val : event.target.value,
    })
    if(event.target.value != "all"){
        console.log(event.target.value)
        this.props.searchSignatures(parseInt(event.target.value), this.props.method)
    } else {
        this.props.resetSignatures()
    } 
}

render() {
    return (
        <div className="filter_div">
            <div className="filter_heading">Filter by {this.props.filter} Level</div>
            <div>
                <select value={this.props.val} onChange={(event)=>this.handleChange(event)}>
                    <option value="all">All</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>
    );
  }
}

export default Filter;