import React from 'react';


class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentPage: 'Todo',
      alllist: [],
      todo: [],
      completedlist: []
    };

    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.changePage = this.changePage.bind(this);
    this.clearList = this.clearList.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.clearComplete = this.clearComplete.bind(this);
  }

  componentDidMount() {
    if (window.localStorage.alllist) {
      this.setState({
        alllist: JSON.parse(window.localStorage.alllist),
        completedlist: JSON.parse(window.localStorage.completedlist),
        todo: JSON.parse(window.localStorage.todo)
      })
    }
  }

  componentDidUpdate() {
    window.localStorage.setItem('alllist', JSON.stringify(this.state.alllist))
    window.localStorage.setItem('todo', JSON.stringify(this.state.todo))
    window.localStorage.setItem('completedlist', JSON.stringify(this.state.completedlist))
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value !== "") {
      const latestValue = { value: this.state.value, status: 'unchecked', disable: true, id: Date.now() }
      // console.log(latestValue)
      const newalllist = this.state.alllist.concat(latestValue)
      // console.log(latestValue)
      const newtodolist = this.state.todo.concat(latestValue)
      // console.log(latestValue)
      this.setState({
        todo: newtodolist,
        alllist: newalllist,
        value: ''
      })
    }
  }


  changePage(e) {
    // console.log('changed to page to', e.target.id)
    this.setState({
      currentPage: e.target.id
    })
  }


  clearList() {
    this.setState({ alllist: [] })
    this.setState({ completedlist: [] })
    this.setState({ todo: [] })
    window.localStorage.clear();
  }


  handleDeleteButton(e) {

    this.state.alllist.map((item, i) => {
      if (e.target.id == item.id) {
        this.state.alllist.splice(i, 1)
      }
    })

    this.state.todo.map((todoitem, i) => {
      if (e.target.id == todoitem.id) {
        this.state.todo.splice(i, 1)
      }
    })

    this.state.completedlist.map((item, i) => {
      if (e.target.id == item.id) {
        this.state.completedlist.splice(i, 1)
      }
    })

    this.setState({
      alllist: this.state.alllist,
      todo: this.state.todo,
      completedlist: this.state.completedlist
    })
  }

  handleCheckbox(e) {

    const newalllist = this.state.alllist
    //renamed array to placeholder so that alllist can be changed
    newalllist.map((item) => {
      //update specific item that matches e.target.id

      if (e.target.id == item.id && item.status === 'unchecked') {
        item.status = 'checked'
        e.target.checked = true
        //adding item to completed list
        this.state.completedlist.push(item)
        //loops todo and remove item that matches id
        this.state.todo.map((todoitem, i) => {
          if (todoitem.id == e.target.id) {
            this.state.todo.splice(i, 1)
          }
        })

      }
      else if (e.target.id == item.id && item.status === 'checked') {
        item.status = 'unchecked'
        e.target.checked = false
        //adds item on to do when unchecked
        this.state.todo.push(item)
        //loop completedlist and remove item that matches id
        this.state.completedlist.map((compitem, i) => {
          if (compitem.id == e.target.id) {
            this.state.completedlist.splice(i, 1)
          }
        })


      }
    })


    this.setState({
      alllist: newalllist,
      completedlist: this.state.completedlist,
      todo: this.state.todo
    })

  }

  handleEdit(e) {
    e.persist();

    console.log('handling edit', e.target.id)

    this.state.alllist.map((item)=>{
      if(e.target.id == item.id && item.disable == true){
        item.disable = false
      }
      else if(e.target.id == item.id && item.disable == false){
        item.disable = true
      }
    })

      this.setState({alllist: this.state.alllist})

  }

  handleEditChange(e){
    // this.state.alllist.map((item,i)=>{
    //   if(e.target.id == item.id){
    //     item.value = e.target.value
    //   }
    // })
    // this.setState({alllist: this.state.alllist})
  }

  handleReturn() {
    console.log('entered return')
    this.state.alllist.map((item) => {
      if (item.status == 'checked') {
        item.status = 'unchecked'
        this.state.todo.push(item)
      }
    })

    this.setState({
      alllist: this.state.alllist,
      completedlist: [],
      todo: this.state.todo,
      currentPage: 'Todo'
    })
  }

  clearComplete() {
    console.log('entered coomplete')
    //filter
    const newalllist = this.state.alllist.filter((item) => item.status == 'unchecked')

    this.setState({
      alllist: newalllist,
      completedlist: []
    })
  }

  render() {
    //setup which array its looping through'
    let looping = ''

    if (this.state.currentPage == 'All') {
      // console.log('change loop to all')
      looping = this.state.alllist
    }

    if (this.state.currentPage == 'Todo') {
      // console.log('change loop to todo')
      looping = this.state.todo
    }

    if (this.state.currentPage == 'Completed') {
      // console.log('change loop to completed')
      looping = this.state.completedlist
    }

    const reversedList = []
    looping.map((item) => {
        reversedList.unshift(item)
        return
    })

    const toDoList = reversedList.map((item, i) => {
      let checkit = '';
      let myStyle = {};
      if (item.status == 'checked') {
        myStyle = {
          backgroundColor: 'lightgrey',
          textDecorationLine: 'line-through'
        }
        checkit = true
      }
      else {
        myStyle = {
          backgroundColor: 'white'
        }
        checkit = false;
      }
      // item.status == 'checked' ? checkit = true : checkit = false;

      return (
        <li style={myStyle} type="none" className="rounded my-2 mr-3 " key={i} name={item.value} id={item.id}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <input
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  checked={checkit}
                  onChange={this.handleCheckbox}
                  key={i} id={item.id}
                  name={item.value} />
              </div>
            </div>
            <input
              type="text"
              style={myStyle}
              className="form-control"
              aria-label="Text input with checkbox"
              // onBlur={}
              value={item.value}
              // value={item.value}
              // onChange={this.handleEditChange}
              // defaultValue={item.value}   
              disabled = {item.disable}        
            />
            <div className="input-group-append">
              <button
                id={item.id}
                onClick={this.handleDeleteButton}
                className="btn btn-danger btn-sm fa fa-trash-o"
                type="button">X</button>
            </div>
          </div>
        </li>
      )
    })

    return (
      <div className="container pt-2" >
        <div className="row">
          <div className="col-12">
            <h1 id="shadow" className="display-4 font-weight-bold text-center">To Do List</h1>
            {/* <span class="fa fa-check-square-o fa-spin" aria-hidden="true"></span> */}
          </div>
        </div>
        <div className="row">
          <div className="bg-warning col-10 mx-auto border rounded">
            <div className="row">
              <div className="mx-auto col-12">
                <form className="mt-3 mx-auto" onSubmit={this.handleSubmit}>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">TO-DO:</span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Items to-do"
                      value={this.state.value}
                      id={this.state.id}
                      onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                      <input
                        className="input-group-text bg-success"
                        type="Submit"
                        defaultValue="Add" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <h2 id="" className="text-center"><u>{this.state.currentPage} Tasks</u></h2>
              </div>
              <div className="col-3 pr-0 pl-4">
                <h5 className="text-center bg-white rounded">Tasks Todo:
              <br />
                  {this.state.todo.length}
                </h5>
              </div>
            </div>
            <ul className="" id="list">
              {toDoList}
            </ul>
            <div className="row mb-2 pt-2 border-top">
              <div className="pl-3 col-4">
                <button className="btn btn-sm btn-block btn-secondary" onClick={this.changePage} id="Todo">
                  To-do
                </button>
              </div>
              <div className="col-4">
                <button className="btn btn-sm btn-block btn-secondary" onClick={this.changePage} id="Completed">
                  Completed
                </button>
              </div>
              <div className="col-4">
                <button className="btn btn-sm btn-block btn-secondary" onClick={this.changePage} id="All">
                  All
                </button>
              </div>
              <div className="col-6">
                <button className="mx-3 mt-3 pr-3 btn btn-sm btn-primary btn-block" onClick={this.handleReturn}>
                  Return Completed tasks into To-do list
              </button>
              </div>
              <div className="col-6 pr-5">
                <button className="mx-3 mt-3 btn btn-sm btn-danger btn-block" onClick={this.clearComplete}>
                  Clear Completed Tasks
              </button>
              </div>
              <button className="mx-3 mt-3 btn btn-sm btn-danger btn-block" onClick={this.clearList}>
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default InputBox