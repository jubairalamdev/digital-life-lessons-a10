import React from 'react';

const LessonDetailsPage = ({params}) => {
    const { id } = params;

    return (
        <div>
            This is the lesson details page for lesson with ID: {id}.
        </div>
    );
};

export default LessonDetailsPage;