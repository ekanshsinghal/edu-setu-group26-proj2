## What: point descriptions of each class/function
This document briefly explains the functionality of main methods and classes.

The project is divided into 2 main parts, the UI and backend. 
The following are the main classes in UI:
1.	Login:
This module is used to login the users. There are two kinds of users: Student and Professor. Both users enter username and email to login to the system.
Register: If the user has not registered, he can click the register option present at the bottom. 
Depending on the type selected appropriate options are displayed. 
Methods: render(): This method is used to render the login page. It contains HTML code for Login as well as register. 
onRegister: This method is used to call the register API to save the details in the DB
onLogin(): This method is used to verify the user and log the user into the application. The method also saves user information like email, Name, user id, type so it can be used by other classes.

2.	Professor Dashboard: This contains several functionalities specific to professor 
<ul>
 <li>AddNewPosting.js: This is used to create a new job posting. Once the user logs in as professor, he can create a new job posting to which the students can apply. This class is used to render the UI for creating a new job posting</li>
<li>Applications.js: This class contains the methods to view, update candidate applications.</li>
 <ul>
 <li>fetchApplications() – Used to get all the applications by user id</li>
 <li>submitUpdateApplication()- called on clicking the submit button. Used to update the application</li>
 <li>	populateUpdateData() Display the updated information in the form.</li>
<li>Render() – Method containing the HTML code to render the page.</li>
 </ul>
<li>Postings.js: This class contains all the job posting posted by a particular user(professor).</li>
 <ul>
<li>fetchPostings() – This method is used to fetch job posting by user_id</li>
<li>submitUpdatePosting() – This is used to update the job posting </li>
<li>onDeletePosting() – this is used to delete a job posting</li>
<li>render() - Method containing the HTML code to render the page.</li>
<li>onSearch() – used to search for a specific job posting</li>
 </ul>
<li>Profile.js: This class is used to display and edit the user profile. </li>
<li>Shortlisted.js: This class is similar to applications class. It is used to display the candidates who have been shortlisted by the professor for all the open postings.</li>
</ul>
3.	SavedJobs: Students can save job posting that they are interested in applying and can review and apply for the jobs later. This functionality is implemented using the SavedJobs.jsx class. They can also sort the jobs based on based on Professor, Department, Location etc. The students have an option to apply for these jobs from the saved jobs tab. They can also filter the jobs based on professor, department, location etc.
•	Apply() – this method is used to apply for jobs.
•	getAllPostings() – This method is used to get all saved jobs
•	filterByTitle() – this method is used to filter the jobs
4.	Student Dashboard: This is displayed once the user logs into the application as the student. Here students can view all the job postings and apply for the jobs they are interested in, they can save the job and apply at a later time, they can filter the job posting by professor, department etc.
•	getAllPostings()- get all the open requisitions
•	apply()- apply to a particular job
•	saveJob – save the job for review 
•	filterByTitle – filter the jobs by various header like professor, department, location 

5.	 Student Profile: This contains all the information related to the student profile. Here the student can view/update their information
•	getUserProfile  - fetch all user profile data from the DB
•	updateProfile() – update user profile data.
6.	TrackApplication: Here the Students can track the status of their application. They can view the jobs that they have applied to and withdraw an application. 
•	getAllApplications – Get all the applications of the logged in user
•	withdrawApplication – Withdraw an application.
