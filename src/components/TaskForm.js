import React, { Component } from "react";


class TaskForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id : '',
      name : '',
      status : false
    };
  }

  // componentDidMount(){
  //   if(this.props.onUpdateForm){
  //     this.setState({id : this.props.onUpdateForm.id});
  //     this.setState({name : this.props.onUpdateForm.name});
  //     this.setState({status : this.props.onUpdateForm.status});
  //   }
  // }

  static getDerivedStateFromProps(props, state) {
    if (props.onUpdateForm) {
      if(props.onUpdateForm.id !== state.id){
        return {
          id: props.onUpdateForm.id,
          name: props.onUpdateForm.name,
          status: props.onUpdateForm.status
        }
      }
    } else {
      if(state.id !== ''){
        return {
          id : '',
          name : '',
          status : false
        }
      }
    }
    

    return null;
  }

  onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if(name === 'status'){
      value = value === 'true' ? true:false;
    }
    this.setState({[name] : value});
  }
  
  onCloseTaskForm2 = () => {
    this.props.onCloseTaskFormSend();
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onTaskSend(this.state);
    this.onClear();
    this.onCloseTaskForm2();
  }

  onClear = () => {
    this.setState({
      name : '',
      status : false
    })
  }


  render() {
    
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {this.state.id === '' ? 'Them cong viec':"Cap nhat cong viec"}
            <button className="fas fa-times-circle pull-right" onClick={this.onCloseTaskForm2}></button>
          </h3>
        </div>

        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">

              <label>Ten: </label>
              <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange}/>
            </div>
            <label>Trang thai:</label>

            <select className="form-control" name="status" value={this.state.status} onChange={this.onChange}>
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />

            <div className="text-center">
              <button type="submit" className="btn btn-warning" >
                <span className="fa fa-plus" />
                &nbsp;Lưu Lại
              </button>
              &nbsp;
              <button type="button" className="btn btn-danger" onClick={this.onClear}>
                <span className="fa fa-times" />
                &nbsp;Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default TaskForm;
