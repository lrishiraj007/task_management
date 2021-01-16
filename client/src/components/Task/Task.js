import React from 'react';
import './Task.css';
import WrappedLink from '../WrappedLink/WrappedLink';

const task = (props) => {
    return (
        <li className="Task">
            <strong>{props.title}</strong>
            <WrappedLink
                to={'/tasks/' + props.id}
                buttonClasses={['btn', 'btn-info', 'ViewButton']}>View</WrappedLink>
        </li>
    );
}

export default task;
