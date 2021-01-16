import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveTask } from '../../../store/actions/tasksActions';
import ErrorMsg from '../../../components/ErrorMsg/ErrorMsg';
import InputField from '../../../components/InputField/InputField';

const FIELDS = [
    { name: 'title', type: 'text', label: 'Title' },
    { name: 'author', type: 'text', label: 'Author', disabled: 'disabled' }
];

class EditTask extends Component {
    state = {
        task: {},
        errors: {}
    };

    componentDidMount() {
        const taskId = this.props.match.params.id;
        let task, errors;
        if (localStorage.getItem('Edit' + taskId) === null) {
            localStorage.setItem('Edit' + taskId, JSON.stringify({ task: this.props.task, errors: {} }));
            task = this.props.task;
            errors = {};
        } else {
            task = JSON.parse(localStorage.getItem('Edit' + taskId)).task;
            errors = JSON.parse(localStorage.getItem('Edit' + taskId)).errors;
        }

        this.setState(prevState => {
            return {
                ...prevState,
                task: { ...task },
                errors: { ...errors }
            };
        });
    }

    handleValidation = (field, value) => {
        let error = {};
        if (value === '') {
            error[field] = 'This field is required';
        } else {
            error[field] = '';
        }
        return error;
    }

    handleInputChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;

        const errors = { ...this.state.errors, ...this.handleValidation(field, value) }
        this.setState((prevState) => {
            return {
                ...prevState,
                task: {
                    ...prevState.task,
                    [field]: value
                },
                errors: { ...errors }
            };
        }, () => localStorage.setItem('Edit' + this.state.task._id, JSON.stringify(this.state)));
    }

    handleEditTaskSubmit = (e) => {
        e.preventDefault();
        let errors = { ...this.state.errors };
        const formValuesValid = Object.keys(errors).filter(field => errors[field] !== "").length === 0 ? true : false;
        if (!formValuesValid) {
            return;
        } else {
            this.props.saveTask(this.props.match.params.id, this.state.task)
                .then(res => {
                    if (res.errors) {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                task: { ...prevState.task },
                                errors: { ...prevState.errors, ...res.errors }
                            };
                        });
                    } else {
                        localStorage.removeItem('Edit' + this.props.match.params.id);
                        this.props.history.push('/tasks/' + this.props.match.params.id);
                    }
                })
        }
    }

    componentWillUnmount() {
        localStorage.removeItem('Edit' + this.props.match.params.id);
    }

    render() {
        const inputFields = FIELDS.map(field =>
            <InputField key={field.name}
                type={field.type} name={field.name} label={field.label}
                defaultValue={this.state.task[field.name]} disabled={field.disabled}
                errors={this.state.errors}
                onChange={this.handleInputChange} />
        );
        return (
            <div className="container">
                <br />
                <h3 className="text-center">Edit Task</h3>
                <div className="jumbotron">
                    <form onSubmit={this.handleEditTaskSubmit}>
                        {inputFields}
                        <div className="form-group">
                            <label>Body</label>
                            <textarea
                                name="body" style={{ height: '200px' }}
                                className="form-control"
                                onChange={this.handleInputChange}
                                defaultValue={this.state.task.body} />
                            {this.state.errors.body !== '' && <ErrorMsg msg={this.state.errors.body} />}
                        </div>
                        <button className="btn btn-success">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        task: state.tasks.task
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveTask: (taskId, taskData) => dispatch(saveTask(taskId, taskData))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditTask));
