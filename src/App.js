import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const ADD = 'ADD'

const addItem = (item) => {
  return {
    type: ADD,
    item: item
  }
}

const itemReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.item]

    default:
      return state
  }
}

const store = createStore(itemReducer, applyMiddleware(thunk));

const provider = Provider;
const Connect = connect;

class MainApp extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div className='half-parent'>
          <ToDoList />
        </div>
        <div className='half-parent'>
          <AddItem />
        </div>
      </div>
    )
  }
}

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
  }
  createDomList(details) {
    return (
      <li><span className='taskName'>{details.name}</span> <br/><span className='deadline'>End Date: {details.date} <br/> End Time: {details.time}</span></li>
    )
  }
  render() {
    const todo = this.props.toDoList.map(this.createDomList);
    return (
      <div>
        <h1>To-Doist</h1>
        <hr/>
        <ul>
          {todo}
        </ul>
      </div>
    );
  }
}

class AddItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskName: '',
      endTime: '',
      endDate: ''
    }
  }
  handleDateChange(e) {
    this.setState({
      endDate: e.target.value
    })
  }
  handleTimeChange(e) {
    this.setState({
      endTime: e.target.value
    })
  }
  handleTaskChange(e) {
    this.setState({
      taskName: e.target.value
    })
  }
  createTask() {
    this.props.submitNewItem({
      name: this.state.taskName,
      date: this.state.endDate,
      time: this.state.endTime
    })
  }
  render() {
    return (
      <div>
        <form>
          <div>
            <label>Task Name</label>
            <input type='text' onChange={this.handleTaskChange.bind(this)} value={this.state.taskName}/>
            <hr/>
          </div>
          <div>
            <label>Task End Date</label>
            <input type='date' onChange={this.handleDateChange.bind(this)} value={this.state.endDate}/>
            <label>Task End Time</label>
            <input type='time' onChange={this.handleTimeChange.bind(this)} value={this.state.endTime}/>
            <hr/>
          </div>
          <div>
            <button onClick={this.createTask.bind(this)}>Create </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {items: state}
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewItem: (item) => {
      dispatch(addItem(item));
    }
  }
}

const Container = Connect(mapStateToProps, mapDispatchToProps)(MainApp)
class AppWrapper extends React.Component {
  render() {
    return (
      <provider store={store}>
        <Container />
      </provider>
    )
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'))