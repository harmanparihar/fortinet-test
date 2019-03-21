import React, { Component } from 'react';

class Applications extends Component {
    handleClick(event){
        event.preventDefault();
        console.log("here",event.target.id)
        this.props.setSingleAppView(event.target.id)
    }
    render() {
        const mapped_products = (this.props.data ? this.props.data.map((a) => {
            return (
                <div className="app_list_item" key={a[0]}>
                    <a href={"#"+a[14]} id={a[14]} onClick={(event) => {this.handleClick(event)}} className="title">{a[0]} - {a[1]}</a>
                    <div className="description">{a[9] && a[9].replace(/<br\/>/g,'').substring(0, 150)}...</div>
                    <div className="meta">
                        <div className="date"><i className="fas fa-calendar-week"></i> Release Date : {a[5]}</div>
                        <div className="risk"> <i className="fas fa-exclamation-triangle"></i> Risk : {a[3]}</div>
                        <div className="popularity"><i className="fas fa-star"></i> Popularity : {a[4]}</div>
                    </div>   
                </div>
            )
            }) : null )
        return (
            <main className="application_list">
                {mapped_products}
            </main>
        );
    }
}

export default Applications;
