import React, { Component } from "react";
import './../App.css';

class Sort extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sort : {
        by : '',
        value : 0
      }
    };
  }

  onClick = (a, b) => {
    this.setState({sort : {
      by : a,
      value : b
    }});
    
    this.props.onSort2(a, b);
    
    
  }

  render() {
    var sort = this.state.sort;
    return(
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li>
            <a role="button" className={(sort.by === 'name' && sort.value === 1) ? 'checked' : ''} onClick={() => {this.onClick('name', 1)}}>
              <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
            </a>
          </li>

          <li>
            <a role="button" className={(sort.by === 'name' && sort.value === -1) ? 'checked' : ''} onClick={() => {this.onClick('name', -1)}}>
              <span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
            </a>
          </li>

          <li role="separator" className="divider" />
          <li>
            <a role="button" className={(sort.by === 'status' && sort.value === 1) ? 'checked' : ''} onClick={() => {this.onClick('status', 1)}}>Trạng Thái Kích Hoạt</a>
          </li>
          
          <li>
            <a role="button" className={(sort.by === 'status' && sort.value === -1) ? 'checked' : ''} onClick={() => {this.onClick('status', -1)}}>Trạng Thái Ẩn</a>
          </li>
        </ul>
      </div>
    );
  }
}
export default Sort;
