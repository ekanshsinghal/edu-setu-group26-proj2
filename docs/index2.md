# Edu Setu Application


## Intro

Like any web application, this project consists of 3 major components. Frontend, Backend and Database.
We have already deployed the backend on Oracle Cloud Infrastructure. So, that includes the _complicated_ Database configuration setup. All you need to do to start using this project is to setup the User Interface. Unfortunately, we couldn't deploy the frontend on the server because of memory limitations on the free-tier account. So, we have the next-best thing in place! Yes, using DOCKER, which means you don't even have to clone the git repo!

## What?

### Development Stack

![Screen Shot 2022-12-05 at 6 27 23 PM](https://user-images.githubusercontent.com/30636208/205766015-6279b9ef-239b-4aa0-b7d4-15500d17c361.png)

### Deployment Stack

![Screen Shot 2022-12-05 at 6 28 15 PM](https://user-images.githubusercontent.com/30636208/205766386-35aaa0d0-25b2-4e7a-b55c-043ae10c40d4.png)

### CI/CD Pipeline

![Screen Shot 2022-12-05 at 6 17 51 PM](https://user-images.githubusercontent.com/30636208/205818343-13e63b04-b35e-4f2b-a78f-6fd073fa0192.png)



### Architecture

![Screen Shot 2022-12-05 at 6 37 05 PM](https://user-images.githubusercontent.com/30636208/205768119-c0776614-4319-4a15-9e98-10182211fab4.png)

### Scalability

![Screen Shot 2022-12-05 at 6 37 21 PM](https://user-images.githubusercontent.com/30636208/205768148-64120acc-3541-47ce-8f8d-eb24ae646867.png)


## Demo Video 

A video explaining the newly added features can be found in this [link](https://drive.google.com/file/d/1SAOqbMNJrZS7wzJ1X1OPpqAk_wSBRjD7/view?usp=sharing)

[![Demo Video](http://img.youtube.com/vi/-n5OHN_Oc7I/0.jpg)](http://www.youtube.com/watch?v=-n5OHN_Oc7I "Video Title")


## Why?

"Setu" literally translates to "Bridge" in Hindi.

Our project, Edu-Setu, as the name suggests, is a portal that bridges opportunities and can be immensely helpful in the education domain. We all know how cumbersome it can be to manage emails, segregate the important ones and keeping track of the _Loooooooonnngggggg_ mail chains. Opportunities get buried under these tons and tons of emails.

You might be wondering "what" opportunities exactly? Well, the one that every studnet desires to have and every professor usually need to offer! Yes, Edu-Setu facilitates professors to post opportunities for students which may include, but not liimited to:

-   Research Opportunities
-   Part time roles (On Campus)
-   Project Opportunities
-   Volunteering Opportunities

And, as you might have guessed, students can come in to apply and connect with the professors via this portal. Edu-Setu keeps the track of all the postings and applications, removing the hassle of "emailing" the professor and waiting for the opportunities to get buried.


## Documentation

The portal is developed with the above mentioned tech-stack. Detailed documentation for each component can be found as below:

1. [Backend](https://github.com/ekanshsinghal/edu-setu-group26-proj2/tree/main/docs/backend)
2. [Frontend](https://github.com/ekanshsinghal/edu-setu-group26-proj2/tree/main/docs/backend)


### How?

#### Student Portal
- Register as a student by providing the required information. Or login if you already created a student profile.
- Once you login you can see the list of all the open job positions posted by various professors.
- You can check on the posting and read the description and prerequisites.
- You can choose to apply for a job or save it for later.
- You also have the option to share the job posting using the sharable URL.
- You can sort by any of the columns just by clicking on the arrow symbols next to the column name.
- You can also apply filters by clicking the filter icon near the column name.
- In the Saved Jobs tab, you can view a list of all the jobs that you have saved for later.
- In the Applications tab, you can see a list of the jobs that you have applied previously along with the status of the application. The status will be updated by the professor after reviewing your application.
- You can also choose to withdraw an application if you no longer wish to be considered for the position.
- In the Profile tab, you can see and update your personal information such as Name, Degree, GPA, Mobile number, etc. 
- You can also set your profile picture. 
- You can upload your resume which will be attached to your job applications and helps the professors to review your profile. Resume can be updated any time.
- Once you are done editing your profile, you can click submit to save the changes.

#### Professor Portal
- Register as a professor by providing the required information. Or login if you already created a professor profile.
- Once you login you can see all the previous job postings that you have posted. 
- You can choose to edit a posting by clicking the edit icon and save it.
- You can delete a posting if it has been filled or not required anymore.
- You have option to search from the list of your previous postings using any keyword.
- You can also add new job postings by clicking the Add Posting button and filling the required details of the new position. Click submit to save. This will be visible to all the students.
- You can see all the applications who have applied for each job posting grouped by the position name. 
- You can also see the number of applicants for each position.
- If you would like to review applications for a specific position, click on the position name to view all applications.
- You will see a list of all the applications along with the student details.
- You can download the student's resume by clicking the Download Resume button.
- If you would like to update the status of a student's application, click the edit icon. Here you can change the Status to Pending, In-progress, Shortlisted, Selected or Rejected. Click submit when done.
- If you select a student for a position, other students will automatically be rejected.
- If you shortlist a student, their application will be moved to the the Shortlisted tab where you can see all your shortlisted applications.
- The students will be notified in real-time via email whenever you update the application for a student.
- You can also view and update your profile under the Profile tab. 
