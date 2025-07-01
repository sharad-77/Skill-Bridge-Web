import express from "express";
import { allMentorsController, AllMentorshipRequest, mentorDetails, requestForMentorship, updateMentorshipRequest } from '../controllers/mentorController.js';
const findMentorRoute = express.Router();

findMentorRoute.get('/', allMentorsController);
findMentorRoute.get('/All-Mentorship-Requests', AllMentorshipRequest);
findMentorRoute.put('/Update-Mentorship-Request', updateMentorshipRequest);
findMentorRoute.post('/:id/Request-Mentorship', requestForMentorship);
findMentorRoute.get('/:id', mentorDetails);
findMentorRoute.get('/:id/Mentor-Request', mentorDetails);


export default findMentorRoute;
