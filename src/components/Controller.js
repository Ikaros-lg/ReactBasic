import React, { Component } from "react";
import Search from "./Search";
import Sort from "./Sort";

class Controller extends React.Component {
  render() {
    return (
      <div>
        {/* Search */}
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <Search onSearch2={this.props.onSearch}/>
        </div>

        {/* Sort */}
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <Sort onSort2={this.props.onSort}/>
        </div>
      </div>
    );
  }
}
export default Controller;
