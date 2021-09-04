import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import Controller from "./components/Controller";
import TaskList from "./components/TaskList";
import Redux from './redux/redux.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: [],
      taskFormDisplay : false,
      taskUpdate : '',
      filter : {
        name : '',
        status : -1   //default render all
      },
      keyword : '',    //search
      sort : {
        by : '',
        value : 0
      }
    };
  }

  componentDidMount(){
    if(localStorage && localStorage.getItem('taskLocal')){
      let taskLocal = JSON.parse(localStorage.getItem('taskLocal'));
      this.setState({task : taskLocal});
    }
  }

  insert = () => {
    var task2 = [
      {
        id: this.generateID(),
        name: "Hoc Java",
        status: true,
      },
      {
        id: this.generateID(),
        name: "Hoc C++",
        status: true,
      },
      {
        id: this.generateID(),
        name: "Hoc Python",
        status: false,
      },
    ];
    console.log(task2);
    // this.setState({task : task2});

    localStorage.setItem('taskLocal', JSON.stringify(task2));
  }

  s4(){
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID(){
    return this.s4() + '-' + this.s4() + '-' + this.s4();
  }

  taskFormDisplay = () => {
    if(this.state.taskFormDisplay && this.state.taskUpdate == null){
      this.setState({taskFormDisplay : false});
    }
    else {
      this.setState({taskFormDisplay : true});
      this.setState({taskUpdate : null})
    }
  }

  onCloseTaskForm1 = () => {
    this.setState({taskFormDisplay : false});
  }

  addTask = (data) => {
    if(data.id === ''){
      var addTask = {
        id : this.generateID(),
        name : data.name,
        status : data.status 
      }
      var taskLocal2 = this.state.task;
      taskLocal2.push(addTask);
      this.setState({task : taskLocal2});
  
      localStorage.setItem('taskLocal',JSON.stringify(taskLocal2));
    }
    
    else {
      var updateTask = {
        id : data.id,
        name : data.name,
        status : data.status 
      }
      var updateTaskList = this.state.task;
      for(let item of updateTaskList){
        if(item.id === updateTask.id){
          item.name = updateTask.name;
          item.status = updateTask.status;
        }
      }
      console.log(updateTaskList);
      this.setState({
        task : updateTaskList,
        taskUpdate : null
      });
      localStorage.setItem('taskLocal', JSON.stringify(updateTaskList));
      
    }
  }

  onChangeStatus = (id) => {
    var findIndex = '';
    var taskStatusArray = this.state.task;
    taskStatusArray.forEach((item, index) => {
      findIndex = id === item.id ? index:findIndex;
    })

    taskStatusArray[findIndex].status = taskStatusArray[findIndex].status ? false : true;
    this.setState({task : taskStatusArray});
    localStorage.setItem('taskLocal',JSON.stringify(taskStatusArray));
  }

  onDelete1 = (id) => {
    var findIndex = '';
    var taskDeleteArray = this.state.task;
    taskDeleteArray.forEach((item, index) => {
      findIndex = id === item.id ? index:findIndex;
    })

    taskDeleteArray.splice(findIndex,1);
    this.setState({task : taskDeleteArray});
    localStorage.setItem('taskLocal', JSON.stringify(taskDeleteArray));
  }

  onUpdate1 = (data) => {
    this.setState({taskFormDisplay : true});
    this.setState({taskUpdate : data});
  }

  onFilter = (filterName, filterStatus) => {
    console.log(filterName + '  ' + filterStatus + ' ' + typeof(filterStatus));
    this.setState({
      filter : {
        name : filterName.toLowerCase(),
        status : filterStatus
      }
    })
  }

  onSearch1 = (data) => {
    this.setState({
      keyword : data.toLowerCase()
    })
    console.log(data);
  }

  onSort1 = (a ,b) => {
    console.log(a + '  '+  b);
    this.setState({
      sort : {
        by : a,
        value : b
      }
    })
  }



  render() {
    var tasks = this.state.task;
    var taskUpdate = this.state.taskUpdate;
    var taskFilter = this.state.filter;
    var taskSearch = this.state.keyword;
    var taskSort = this.state.sort;
    var taskFormDisplay = this.state.taskFormDisplay === true ?    
      <TaskForm onTaskSend={this.addTask}  onCloseTaskFormSend={this.onCloseTaskForm1}
        onUpdateForm={taskUpdate}
      /> : '';

 
    if(taskFilter.name !== ''){
      tasks = tasks.filter((item) => {
        if(item.name.toLowerCase().indexOf(taskFilter.name)!== -1)
        return item;
      });
    }

    if(taskFilter.status === 1){
      tasks = tasks.filter((item) => {
        if(item.status === true){
          return item;
        }
      })
    }
    else if(taskFilter.status === 0){
      tasks = tasks.filter((item) => {
        if(item.status === false){
          return item;
        }
      })
    }

    if(taskSearch !== null){
      tasks = tasks.filter((item) => {
        if(item.name.toLowerCase().includes(taskSearch)){
          return item;
        }
      })
    }

    if(taskSort.by === 'name'){
      tasks = tasks.sort((a, b) => {
        if(a.name > b.name) return taskSort.value;
        else if (a.name < b.name) return -taskSort.value;
        else return 0;
      })
    }

    if(taskSort.by === 'status'){
      tasks = tasks.sort((a, b) => {
        if(a.status > b.status) return -taskSort.value;
        else if (a.status < b.status) return taskSort.value;
        else return 0;
      })
    }
      
    
    return (
      
      <div className="container">
        <div className="text-center">
          <h1>Quan ly cong viec</h1>
        </div>

      
        <div className="row">
          <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
            {/* Form */}
            {taskFormDisplay}
          </div>
 
          <div className={this.state.taskFormDisplay === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'}>
            <button type="button" className="btn btn-primary mb-2" onClick={this.taskFormDisplay}>
              <span className="fa fa-plus "></span>&nbsp; Thêm Công Việc
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-danger mb-2"
              onClick={this.insert}
            >
              <span className="fa fa-plus"></span>&nbsp; Tao cong viec
            </button>
            <div className="row" style={{ marginTop: "10px" }}>
              {/* Search and Sort*/}
              <Controller onSearch={this.onSearch1} onSort={this.onSort1}/>
            </div>
            &nbsp;
            {/* List */}
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList taskSend={tasks} onChangeStatus={this.onChangeStatus} onDelete={this.onDelete1}
                  onUpdate={this.onUpdate1} onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
