import express from "express";
import { allMentorsController, AllMentorshipRequest, mentorDetails, requestForMentorship, updateMentorshipRequest } from '../controllers/mentorController.js';

// Create a new router object
const findMentorRoute = express.Router();

// Route to get all mentors
findMentorRoute.get('/', allMentorsController);

// Route to get all mentorship requests for the logged-in user
findMentorRoute.get('/All-Mentorship-Requests', AllMentorshipRequest);

// Route to update a mentorship request (for mentors)
findMentorRoute.put('/Update-Mentorship-Request', updateMentorshipRequest);

// Route to request mentorship from a specific mentor
findMentorRoute.post('/:id/Request-Mentorship', requestForMentorship);

// Route to get details of a specific mentor
findMentorRoute.get('/:id', mentorDetails);

// Redundant route, likely can be removed as it points to the same controller
findMentorRoute.get('/:id/Mentor-Request', mentorDetails);

// Export the router
export default findMentorRoute;
