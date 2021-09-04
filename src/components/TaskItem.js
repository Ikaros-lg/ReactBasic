import React, { Component } from "react";

class TaskItem extends React.Component {
  onChangeStatus = () => {
    this.props.onChangeStatus(this.props.id);
  }

  onDelete = () => {
    this.props.onDelete2(this.props.id);
  }

  onUpdate = () => {
    var taskUpdate = {
      id : this.props.id,
      name : this.props.name,
      status : this.props.status
    }
    this.props.onUpdate2(taskUpdate);

  }

  render() {
    let status = this.props.status ? 'Kich hoat':'An';
    let class_name = this.props.status ? 'label label-danger':'label label-success';
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.name}</td>
        <td className="text-center">
          <span className={class_name} onClick={this.onChangeStatus}>{status}</span>
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
            <span className="fa fa-pencil mr-1"></span>Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger" onClick={this.onDelete}>
            <span className="fa fa-trash mr-5"></span>Xóa
          </button>
        </td>
      </tr>
    );
  }
}
export default TaskItem;
