import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios'
import Applications from './Applications'
import Search from './Search'
import Filter from './Filter'
import AppDetails from './AppDetails';


class Home extends Component {
  constructor(){
    super()
    this.state={
        isSingleAppView: false,
        singleViewApp: [],
        data: [],
        signatures: [],
        originalList: [],
        offset : 0,
        perPage : 10,
        error: "",
        risk_val: "",
        popularity_val: "",
    }
}

componentDidMount(){ 
    this.getSignatures()
}

resetSignatures(){
    if(this.state.originalList){
        this.setState({ 
            error: "",
            isSingleAppView : false,
            singleViewApp : [],
            signatures : this.state.originalList,
            data: this.state.originalList.slice(0, this.state.perPage),
            offset: 0,
            risk_val: "all",
            popularity_val: "all",
        });
    }
}

handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);
    this.setState({ 
        offset : offset,
        data : this.state.signatures.slice(offset, offset+this.state.perPage),
    });
}
searchSignatures(keyword,method){
    let searchlist = [];
    let found = false;
    if(method == 1){
        keyword = keyword.toLowerCase()
        for(let item in this.state.originalList){
            if(this.state.originalList[item][0] && this.state.originalList[item][0].toLowerCase().includes(keyword)){
                found = true;
                searchlist.push(this.state.originalList[item]);
            }
        }
    }
    if(method == 2){
        for(let item in this.state.originalList){
            if(this.state.originalList[item][3] && this.state.originalList[item][3] == keyword){
                found = true;
                searchlist.push(this.state.originalList[item]);
            }
        }
        this.setState({
            risk_val: keyword,
            popularity_val: "all",
        })
    }
    if(method == 3){
        for(let item in this.state.originalList){
            if(this.state.originalList[item][4] && this.state.originalList[item][4] == keyword){
                found = true;
                searchlist.push(this.state.originalList[item]);
            }
        }
        this.setState({
            risk_val: "all",
            popularity_val: keyword,
        })
    }
    if(found){
        this.setState({
            error: "",
            isSingleAppView : false,
            data: searchlist.slice(0, this.state.perPage),
            signatures : searchlist,
            offset : 0,
        })
    } else{
        this.setState({
            isSingleAppView : false,
            error : "Nothing Found. Try a different keyword/filter!",
            offset : 0,
        })
    }
    
}

setSingleAppView(id){
    console.log("here",id)
    for(let item in this.state.data){
        if(this.state.data[item][14] && (this.state.data[item][14] == parseInt(id))){
            this.setState({
                isSingleAppView : true,
                singleViewApp : this.state.data[item],
            })
        }
    }
    
}

getSignatures(){
    axios.get(`https://s3.amazonaws.com/fortios-hiring/test.json`)
    .then(response => {
        if (!response.data.errmsg) {
            this.setState({
                originalList : response.data,
                signatures : response.data,
                data : response.data.splice(this.state.offset, this.state.perPage)
            })
        } else {
          console.log('get products failed')
        }
    }).catch(error => {
            console.log('error: ')
            console.log(error)
    })
}

render() {
    return (
        <div className="home">
            
            <Search searchSignatures={this.searchSignatures.bind(this)} resetSignatures={this.resetSignatures.bind(this)}/>
            <div className="filter_parent">
                <Filter method={2} val={this.state.risk_val} filter="Risk" searchSignatures={this.searchSignatures.bind(this)}  resetSignatures={this.resetSignatures.bind(this)}/>
                <Filter method={3} filter="Popularity" val={this.state.popularity_val} searchSignatures={this.searchSignatures.bind(this)} resetSignatures={this.resetSignatures.bind(this)}/>
            </div>
            {!this.state.isSingleAppView && !this.state.error && <Applications setSingleAppView={this.setSingleAppView.bind(this)} data={this.state.data}/>}
            {!this.state.isSingleAppView && !this.state.error && <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.state.signatures ? Math.ceil(this.state.signatures.length/10) : null}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
            />}
            {this.state.error && <div>{this.state.error}</div>}
            {this.state.isSingleAppView && <AppDetails app={this.state.singleViewApp} />}
        </div>
    );
  }
}

export default Home;