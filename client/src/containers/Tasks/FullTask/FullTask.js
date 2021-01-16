import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTask, deleteTask } from '../../../store/actions/tasksActions';
import WrappedLink from '../../../components/WrappedLink/WrappedLink';
import './FullTask.css'

class FullTask extends Component {
    componentDidMount() {
        this.getSingleTask();
    }

    getSingleTask() {
        if (this.props.match.params.id) {
            if (!this.props.task || (this.props.task._id !== + this.props.match.params.id)) {
                this.props.getTask(this.props.match.params.id);
            }
        }
    }

    handleEditTaskClick() {
        this.props.history.replace({ pathname: '/task/edit/' + this.props.match.params.id });
    }

    handledeleteTaskClick() {
        alert('We are deleting your task...');
        this.props.deleteTask(this.props.match.params.id)
            .then(res => {
                if (res.success) {
                    this.props.history.push('/');
                }
            })
    }

    render() {
        return (
            <div className="container">
                <br />
                <div className="jumbotron FullTask">
                    <h3 className="text-center">{this.props.task.title}</h3>
                    <h5 className="text-right">- By {this.props.task.author}</h5>
                    <p>{this.props.task.body}</p>
                    {this.props.isAuthenticated && this.props.authenticatedUsername === this.props.task.author
                        && <button
                            className="btn btn-danger"
                            style={{ float: 'right', padding: '6px 12px' }}
                            onClick={() => this.handledeleteTaskClick()}>Delete</button>}
                    {this.props.isAuthenticated && this.props.authenticatedUsername === this.props.task.author
                        && <WrappedLink
                            to={"/task/edit/" + this.props.match.params.id}
                            buttonClasses={['btn', 'btn-info', 'mr-2']}
                            click={() => this.handleEditTaskClick()}>Edit</WrappedLink>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        task: state.tasks.task,
        isAuthenticated: state.users.isAuthenticated,
        authenticatedUsername: state.users.authenticatedUsername
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTask: (taskId) => dispatch(getTask(taskId)),
        deleteTask: (taskId) => dispatch(deleteTask(taskId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullTask);
