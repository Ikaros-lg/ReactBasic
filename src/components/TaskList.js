import React, { Component } from "react";
import TaskItem from "./TaskItem";

class TaskList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      filterName : '',
      filterStatus : -1     //all:-1     active:1        deactive:-0
    }
  }

  onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if(name === 'filterStatus'){
      value = parseInt(value);
    }
    this.props.onFilter(
      this.state.filterName = name === 'filterName' ? value : this.state.filterName,
      this.state.filterStatus = name === 'filterStatus' ? value : this.state.filterStatus
    );
    // this.setState({[name] : value});
  }

  render() {
    var tasks = this.props.taskSend;
   
    

    var taskItem = tasks.map((item) => {
      return <TaskItem key={item.id} id={item.id} name={item.name} status={item.status}
      onChangeStatus={this.props.onChangeStatus} onDelete2={this.props.onDelete} onUpdate2={this.props.onUpdate}/>
    })
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>

            <td>
              <input type="text" className="form-control" name="filterName"
               value={this.state.filterName} onChange={this.onChange}/>
            </td>

            <td>
              <select className="form-control" name="filterStatus"
              value={this.state.filterStatus} onChange={this.onChange}>
                <option value={-1}>Tất Cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích Hoạt</option>
              </select>
            </td>
            <td></td>
          </tr>

            {/* Loop */}
          {/* <TaskItem/> */}
          {taskItem}
        </tbody>
      </table>
    );
  }
}
export default TaskList;