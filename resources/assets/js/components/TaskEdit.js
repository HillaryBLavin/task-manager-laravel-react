import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class TaskEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            task: []
        };
        // Bind methods to constructor
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // console.log(event.target.value);
        this.setState({
            name: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.put(`/tasks/${this.props.match.params.id}`, {
            name: this.state.name
        }).then(response => {
            // console.log('from handle submit', response);
            this.props.history.push('/home');
        }).catch(error => {
            console.log(error.response);
        });
    }

    getTask() {
        axios.get(`/tasks/${this.props.match.params.id}/edit`).then(response => this.setState({
            task: [response.data.task],
            name: response.data.task.name
            })
        );
    }

    componentWillMount() {
        this.getTask();
    }

    render() {
        console.log(this.props.match.params.id);
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Task Editor</div>

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
                                        Edit Task
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default TaskEdit; 