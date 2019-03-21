import React, { Component } from 'react';

class AppDetails extends Component {
  render() {
    return (
      <main>
        <a href="/" className="go_back">← Go back</a>
        <div className="app_detail">
                    <a className="title">{this.props.app[0]}</a>
                    <div className="description">{this.props.app[9] && this.props.app[9].replace(/(<([^>]+)>)/ig,"")}</div>
                    <div className="meta">
                        <div className="id"><i className="fas fa-qrcode"></i> Id : {this.props.app[14]} </div>
                        <div className="category"><i className="fas fa-tag"></i> Category : {this.props.app[1]} </div>
                        {this.props.app[6] && <div className="vender"><i className="fas fa-briefcase"></i> Vendor : {this.props.app[6]}</div>}
                        <div className="date"><i className="fas fa-calendar-week"></i> Release Date : {this.props.app[5]}</div>
                        <div className="risk"> <i className="fas fa-exclamation-triangle"></i> Risk : {this.props.app[3]}</div>
                        <div className="popularity"><i className="fas fa-star"></i> Popularity : {this.props.app[2]}</div>
                    </div>
                    {this.props.app[13] && <div className="ref"><h1>References : </h1>{this.props.app[13].replace(/(<([^>]+)>)/ig,"")}</div>}
                </div>
      </main>
    );
  }
}

export default AppDetails;
