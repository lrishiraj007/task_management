import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { submitNewTask } from '../../../store/actions/tasksActions';
import ErrorMsg from '../../../components/ErrorMsg/ErrorMsg';
import InputField from '../../../components/InputField/InputField';

const FIELDS = [
    { name: 'title', type: 'text', label: 'Title' },
    { name: 'author', type: 'text', label: 'Author', disabled: 'disabled' }
];

class AddTask extends Component {
    state = {
        task: {},
        errors: {}
    };

    componentWillMount() {
        if (localStorage.getItem('AddTaskPage') !== null) {
            const { task, errors } = JSON.parse(localStorage.getItem('AddTaskPage'));
            this.setState(prevState => {
                return {
                    ...prevState,
                    task: { ...task },
                    errors: { ...errors }
                };
            });
        }
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
        }, () => localStorage.setItem('AddTaskPage', JSON.stringify(this.state)));
    }

    componentWillUnmount() {
        localStorage.removeItem('AddTaskPage');
    }

    handleNewTaskSubmit = (e) => {
        e.preventDefault();
        let errors = { ...this.state.errors };
        const formValuesValid = Object.keys(errors).filter(field => errors[field] !== "").length === 0 ? true : false;
        if (!formValuesValid) {
            return;
        } else {
            this.props.submitNewTask({ ...this.state.task, author: this.props.authenticatedUsername })
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
                        console.log(this.props)
                        this.props.history.push('/');
                    }
                })
        }
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="container">
                <br />
                <h3 className="text-center">Add Task</h3>
                <div className="jumbotron">
                    <form onSubmit={this.handleNewTaskSubmit}>
                        <InputField key={FIELDS[0].name}
                            type={FIELDS[0].type} name={FIELDS[0].name} label={FIELDS[0].label}
                            defaultValue={this.state.task.title}
                            errors={this.state.errors}
                            onChange={this.handleInputChange} />
                        <InputField key={FIELDS[1].name}
                            type={FIELDS[1].type} name={FIELDS[1].name} label={FIELDS[1].label}
                            defaultValue={this.props.authenticatedUsername} disabled={FIELDS[1].disabled}
                            errors={this.state.errors}
                            onChange={this.handleInputChange} />
                        <div className="form-group">
                            <label>Body</label>
                            <textarea
                                name="body" style={{ height: '200px' }}
                                className="form-control" placeholder="Your Task Description !"
                                onChange={this.handleInputChange}
                                defaultValue={this.state.task.body} />
                            {this.state.errors.body !== '' && <ErrorMsg msg={this.state.errors.body} />}
                        </div>
                        <button className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.users.isAuthenticated,
        authenticatedUsername: state.users.authenticatedUsername
    };
}

const mapDispatchToProps = dispatch => {
    return {
        submitNewTask: (taskData) => dispatch(submitNewTask(taskData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
