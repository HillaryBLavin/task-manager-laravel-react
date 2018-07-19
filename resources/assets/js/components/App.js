import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tasks: []
        };
        // Bind methods to constructor
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTasks = this.renderTasks.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(event) {
        // console.log(event.target.value);
        this.setState({
            name: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('/tasks', {
            name: this.state.name
        }).then(response => {
            // console.log('from handle submit', response);
            this.setState({
                tasks: [response.data, ...this.state.tasks],
                name: ''
            })
        }).catch(error => {
            console.log(error.response);
        });
    }

    renderTasks() {
        return this.state.tasks.map(task => (
            <div key={task.id} className="media">
                <div className="media-body">
                    <div>
                        {task.name}{' '} 
                        <Link to={`/${task.id}/edit`} className="btn btn-sm btn-success float-right">Edit</Link>
                        <button onClick={() => this.handleDelete(task.id)} className="btn btn-sm btn-danger float-right">Delete</button>
                    </div>
                </div>
            </div>
        ))
    }

    getTasks() {
        axios.get('/tasks').then(response => this.setState({
            tasks: [...response.data.tasks]
            })
        );
    }

    componentWillMount() {
        this.getTasks();
    }

    handleDelete(id) {
        // Use filter method to filter out all tasks other than the selected task
        const isNotId = task => task.id !== id;
        const updatedTasks = this.state.tasks.filter(isNotId); 
        // Remove task from local state
        this.setState({tasks: updatedTasks}); 
        // Delete task from database
        axios.delete(`/tasks/${id}`);
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">React Component</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea 
                                            onChange={this.handleChange} 
                                            value={this.state.name}
                                            className="form-control" 
                                            rows="5"
                                            maxLength="255" 
                                            placeholder="Create a new task" 
                                            required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Create Task
                                    </button>
                                </form>
                                <hr />
                                {this.renderTasks()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;