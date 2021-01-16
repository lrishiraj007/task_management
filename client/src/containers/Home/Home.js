import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllTasks } from '../../store/actions/tasksActions';
import Task from '../../components/Task/Task';
import WrappedLink from '../../components/WrappedLink/WrappedLink';
import './Home.css';

class Home extends Component {
    componentDidMount() {
        this.props.initTasks();
    }

    render() {
        const tasks = this.props.tasks.map(task => (
            <Task
                key={task._id}
                id={task._id}
                title={task.title} />
        ));

        return (
            <div className="container">
                <br />
                <div className="Header">
                    <h1 style={{ display: 'inline-block' }}>All Tasks</h1>
                    <WrappedLink to="/task/add" buttonClasses={['btn', 'btn-primary', 'AddTaskButton']}>Add Task</WrappedLink>
                </div>
                <br />
                <div>
                    <section className="jumbotron">
                        <div className="Tasks">
                            {tasks}
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks.tasks,
        isAuthenticated: state.users.isAuthenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initTasks: () => dispatch(getAllTasks())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
