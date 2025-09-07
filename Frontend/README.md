# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

## Onboarding Performance Issue Analysis

### The Problem: Long Loading Times During Profile Creation

A significant performance bottleneck has been identified in the student and mentor onboarding process. When a user fills out their profile details and uploads a profile picture, the submission process takes a long time to complete.

The root cause is the current implementation of the image upload feature. The flow is as follows:
1.  The frontend sends the entire form, including the image file, to the backend API (`/signup/Student` or `/signup/Mentor`).
2.  The backend server receives the request.
3.  A middleware (`uploadImage.js`) intercepts the request and uploads the image file to the Cloudinary service.
4.  The API route handler (`studentSignup` or `mentorSignup`) is blocked and does not execute until the Cloudinary upload is complete.
5.  Once the image is uploaded, the controller proceeds to save the user's data to the database.
6.  Finally, the backend sends a success response to the frontend.

This synchronous, server-side upload process means the user has to wait for a third-party network operation to finish, leading to a poor user experience.

### The Solution: Client-Side Uploads to Cloudinary

To resolve this, the image upload process should be offloaded from the backend to the client-side. This makes the backend's job much faster, as it only needs to handle text-based data and a URL.

The recommended implementation is:

1.  **Backend Modification:**
    *   Create a new, protected API endpoint (e.g., `/api/cloudinary-signature`).
    *   This endpoint's role is to generate and send a secure "signed upload signature" from Cloudinary to the authenticated frontend client. This signature temporarily grants the client permission to upload a file to your Cloudinary account without needing your API secret.

2.  **Frontend Modification:**
    *   In the onboarding form, when a user selects an image to upload, the frontend should **not** include it in the main form submission.
    *   Instead, the frontend should first make a request to the new `/api/cloudinary-signature` endpoint to get the upload signature.
    *   Using this signature, the frontend then uploads the image file **directly** to the Cloudinary API. This can be done asynchronously, allowing you to implement a progress bar for a better user experience.
    *   Cloudinary will respond to the frontend with the `url` and `publicId` of the successfully uploaded image.
    *   Finally, the frontend submits the onboarding form to the original backend endpoint (`/signup/Student` or `/signup/Mentor`). However, instead of sending the image file, it will now send the image `url` and `publicId` received from Cloudinary as string fields in the form data.

This asynchronous, client-led approach will make the profile creation process feel almost instantaneous to the user, as the final form submission to your backend will be a very quick operation.
