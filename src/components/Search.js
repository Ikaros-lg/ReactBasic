import React, { Component } from "react";

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      keyword : ''
    }
  }

  onChange = (event) => {
    this.setState({keyword : event.target.value});
  }

  onSearch = () => {
    this.props.onSearch2(this.state.keyword);
  }

  render() {
    return (
      <div className="input-group">
        <input
          name="keyword"
          type="text"
          className="form-control"
          placeholder="Nhập từ khóa..."
          onChange={this.onChange}
          value={this.state.keyword}
        />
        <span className="input-group-btn">
          <button className="btn btn-primary" type="button" onClick={this.onSearch}>
            <span className="fa fa-search mr-5"></span>Tìm
          </button>
        </span>
      </div>
    );
  }
}
export default Search;
