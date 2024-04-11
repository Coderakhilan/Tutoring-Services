import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const CourseDetails1 = ({ course }) => {
  const handleJoinMeeting = () => {
    if (course.link1) {
      window.open(course.link1, '_blank');
    } else {
      console.error('No link available for joining the meeting');
    }
  };

  return (
    <div className="course-details">
      <h4>{course.title}</h4>
      <p><strong>Cost: </strong>{course.cost}</p>
      <p><strong>Days: </strong>{course.days}</p>
      <p><strong>Link: </strong>{course.link1}</p>
      <p>{formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}</p>
      <button className="joinmeeting"onClick={handleJoinMeeting}>Join Meeting</button>
    </div>
  );
};

export default CourseDetails1;
