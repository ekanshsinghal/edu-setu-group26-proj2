from utils import *
import bcrypt
import datetime
import student_apis
import smtplib
from email.message import EmailMessage
import os

def add_posting(data):
    
    '''
    ```
    Request:
    {
        title: string,
        professor: number (user id of professor),
        description: string,
        location: string,
        prerequisites: string
    }
    Response:
    {
        status: boolean
        data: message (Success / Error message as per status)
        // CREATED_AT and UPDATED_AT timestamps to be appropriately set by the API
    }
    ```
    '''
    
    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        professor = data["professor"]
        title = data["title"]
        description = data["description"]
        location = data["location"]
        prerequisites = data["prerequisites"]
        # created_at = 
        # updated_at = 
        # Insert application into database
        cur = con.cursor()
        query = "INSERT INTO POSTINGS ( TITLE, PROFESSOR, DESCRIPTION, LOCATION, PREREQUISITES, CREATED_AT, UPDATED_AT ) VALUES (:1,:2,:3,:4,:5,SYSTIMESTAMP,SYSTIMESTAMP)"
        params = [title, professor, description, location, prerequisites]
        cur.execute(query, params)
        con.commit()
        return prepare_response(
            True, f"Posting Added Successfully."
        )
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)
        
        
def get_all_postings():
    '''
    ```
    /get_all_postings [GET]
Request: N/A
Response:
{
	status: boolean,

	if status is True:
		data:
		[
			{
				posting_id: number,
				title: string,
				description: string,
				professor_email: string,
				professor_department: string,
				professor_designation: string
				professor_display_name: string,
				location: string,
				prerequisites: string,
				created_at: string,
				updated_at: string
			}
		]
	else:
	data: string (error message)
}
```
    '''   
    
    
    con = connect()
    if not con:
        return prepare_response(False,  "Unable to connect to database.")
    try:
        curs = con.cursor()
    except Exception as e:
        print(e)
        return prepare_response(False,  "Unable to connect to database.")
    try:
        query = '''select POSTING_ID, TITLE, DESCRIPTION, USERS.EMAIL, PROFESSORS.DEPARTMENT, PROFESSORs.DESIGNATION, USERS.DISPLAY_NAME, LOCATION, PREREQUISITES, CREATED_AT, UPDATED_AT from USERS JOIN PROFESSORS ON USERS.USER_ID = PROFESSORS.USER_ID JOIN POSTINGS ON PROFESSORS.USER_ID = POSTINGS.PROFESSOR'''
        curs.execute(query)
        curs.rowfactory = makeDictFactory(curs)
        response = curs.fetchall()
        try:
            con.close()
        except:
            pass
        return prepare_response(True, response)
    except Exception as e:
        print(e)
        return {"status": False, "data": str(e)}
    finally:
        try:
            con.close()
        except:
            pass
   

def get_all_postings_by_professor(data):
    
    '''
    ```
    Request:
    {

        student: number (user id of student),

    }
    Response:
    {
        status: boolean
        data:
        {
            posting_id: number,
            title: string,
            professor: number (user id of professor)
            description: string,
            location: string,
            prerequisites: string,
            created_at: string,
            updated_at: string
        }
        
    }
    ```
    '''
    
    con = connect()
    if not con:
        return prepare_response(False,  "Unable to connect to database.")
    try:
        curs = con.cursor()
    except Exception as e:
        print(e)
        return prepare_response(False,  "Unable to connect to database.")
    try:
        professor = data["professor"]
        query = '''SELECT * FROM POSTINGS WHERE PROFESSOR = :1'''
        params = [professor]
        curs.execute(query, params)
        curs.rowfactory = makeDictFactory(curs)
        response = curs.fetchall()
        try:
            con.close()
        except:
            pass
        return prepare_response(True, response)
    except Exception as e:
        print(e)
        return {"status": False, "data": str(e)}
    finally:
        try:
            con.close()
        except:
            pass



def update_posting(data):
    
    '''
    ```
    /update_posting [POST]
    Request:
    {
        posting_id: number,
        title: string,
        description: string,
        location: string,
        prerequisites: string,
    }
    Response:
    {
        status: boolean
        data: (Success / Error message as per status)
        // UPDATED_AT timestamp should be auto updated by the API
    }
    ```
    '''
    
    
    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        posting_id = data["posting_id"]
        title = data["title"]
        description = data["description"]
        location = data["location"]
        prerequisites = data["prerequisites"]
        # created_at = 
        # updated_at = 
        # Insert application into database
        cur = con.cursor()
        query = "UPDATE POSTINGS SET TITLE = :1, posting_id = :2, DESCRIPTION = :3, LOCATION = :4, PREREQUISITES = :5, UPDATED_AT = SYSTIMESTAMP WHERE posting_id = :2" 
        params = [title, posting_id, description, location, prerequisites]
        cur.execute(query, params)
        con.commit()
        return prepare_response(
            True, f"Posting Updated Successfully."
        )
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)
        

def get_applications_for_professor(data):
    
    '''
    ```
    /get_applications_for_professor [POST]
Request:
{
	professor: number
}
Response:
{
	status: boolean
	data:
	[
		{
			professor: number
			position_id: number,
			title: string,
			description: string,
			prerequisites: string,
			applications: // A list of all the applications for this position_id
			[
				{
					application_id: number
					student_user_id: number,
					student_display_name: string,
					student_email: string,
					student_phone: string,
					student_gpa: float,
					student_major: string,
					student_minor: string,
					student_year: string,
					status: string // This is the status of the application and NOT the response.
					remarks: string

				}
			]
		}
	]
}
    ```
    '''
    
    
    con = connect()
    if not con:
        return prepare_response(False,  "Unable to connect to database.")
    try:
        curs = con.cursor()
    except Exception as e:
        print(e)
        return prepare_response(False,  "Unable to connect to database.")
    try:
        professor = data["professor"]
        query = '''SELECT postings.posting_id,
       postings.professor as professor_user_id,
       title,
       description,
       prerequisites,
       applications.application_id,
	   student.user_id AS student_user_id,
       users.display_name AS student_display_name,
	   users.email AS student_email,
 	   users.phone AS student_phone,
	   student.gpa AS student_gpa,
	   student.major AS student_major,
	   student.minor AS student_minor,
	   student.year AS	student_year,
       applications.status
       
					
FROM   postings 
FULL OUTER JOIN applications on APPLICATIONS.posting_id = postings.POSTING_ID
FULL OUTER JOIN student on applications.student = student.USER_ID
left OUTER JOIN USERS on users.user_id = student.user_id
where postings.PROFESSOR= :1 and application_id is not NULL
order by postings.POSTING_ID'''
        params = [professor]
        curs.execute(query, params)
        curs.rowfactory = makeDictFactory(curs)
        response = curs.fetchall()
        res = {}
        pos_id = []
        for row in response:
            if row["posting_id"] in pos_id and row["status"] != "Withdrawn":
                dcit1 = {}
                dcit1["application_id"] = row["application_id"]
                dcit1["student_user_id"] = row["student_user_id"]
                dcit1["student_display_name"] = row["student_display_name"]
                dcit1["student_email"] = row["student_email"]
                dcit1["student_phone"] = row["student_phone"]
                dcit1["student_gpa"] = row["student_gpa"]
                dcit1["student_major"] = row["student_major"]
                dcit1["student_minor"] = row["student_minor"]
                dcit1["student_year"] = row["student_year"]
                dcit1["status"] = row["status"]
                res[row["posting_id"]]["Applications"].append(dcit1)
        
    
            else:
                if row["status"] != "Withdrawn":
                    pos_id.append(row["posting_id"])
                    temp = {}
                    temp["professor_user_id"] = row["professor_user_id"]
                    temp["posting_id"] = row["posting_id"]
                    temp["title"] = row["title"]
                    temp["description"] = row["description"]
                    temp["prerequisites"] = row["prerequisites"]
                    res[row["posting_id"]] = temp
                    dcit1 = {}
                    dcit1["application_id"] = row["application_id"]
                    dcit1["student_user_id"] = row["student_user_id"]
                    dcit1["student_display_name"] = row["student_display_name"]
                    dcit1["student_email"] = row["student_email"]
                    dcit1["student_phone"] = row["student_phone"]
                    dcit1["student_gpa"] = row["student_gpa"]
                    dcit1["student_major"] = row["student_major"]
                    dcit1["student_minor"] = row["student_minor"]
                    dcit1["student_year"] = row["student_year"]
                    dcit1["status"] = row["status"]
                    res[row["posting_id"]]["Applications"] = []
                    res[row["posting_id"]]["Applications"].append(dcit1)
        
        response = list(res.values())

        try:
            con.close()
        except:
            pass
        # print(response)
        return prepare_response(True, response)
    except Exception as e:
        print(e)
        return {"status": False, "data": str(e)}
    finally:
        try:
            con.close()
        except:
            pass


def delete_posting(data):
    
    '''
    ```
    /delete_posting [POST]
    Request:
    {
        posting_id : number ,
    }
    Response:
    {
        status: boolean,
        data: message (Success / Error message as per status)
    }
    ```
    
    '''
    
    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        posting_id = data["posting_id"]
        cur = con.cursor()
        query = "DELETE FROM POSTINGS WHERE posting_id = :1" 
        params = [posting_id]
        cur.execute(query, params)
        con.commit()
        return prepare_response(
            True, f"Posting Deleted."
        )
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)

# Assumes that the applications being sent to this function are only for a specific posting id
def update_all_applications(data):
    
    '''
    ```
    /update_all_applications [POST]
    Request:
    {
        posting_id: number,
        application_id: number,
        remarks: string,
        applications: // A list of all the applications for this position_id
			[
				{
					application_id: number
					student_user_id: number,
					student_display_name: string,
					student_email: string,
					student_phone: string,
					student_gpa: float,
					student_major: string,
					student_minor: string,
					student_year: string,
					status: string // This is the status of the application and NOT the response.
					remarks: string
				}
			]
    }
    Response:
    {
        status: boolean
        data: (Success / Error message as per status)
        // UPDATED_AT timestamp should be auto updated by the API
    }
    ```
    '''
    
    
    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        posting_id = data["posting_id"]
        remarks = data["remarks"] if "remarks" in  data.keys() else None
        applications = data["applications"]
        # Update the applications with rejected status
        cur = con.cursor()
        for i in applications:
            if i["status"] in ["selected", "rejected"]:
                continue
            else:
                query = "UPDATE APPLICATIONS SET STATUS = :1, REMARKS = :2 , UPDATED_AT = SYSTIMESTAMP WHERE APPLICATION_ID = :3"
                params = ["rejected",remarks,i["application_id"]]
                cur.execute(query, params)
                con.commit()
        return prepare_response(
            True, f"Application Updated Successfully."
        )
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)

def send_email(data):
    
    '''
    ```
    Request:
    {
        application_id: number,
        professor_email: string (professor email),
        remarks: null,
        status: string,
        student_email: string (student email address)

    }
    Response:
    {
        status: boolean
        data: message (Success / Error message as per status)
    }
    ```
    '''
    
    try:
        # Get the data from JSON Payload
        to = data["student_email"]
        application_id = data["application_id"]
        if "professor_email" in data:
            professor_email = data["professor_email"]
        else:
            professor_email = "Professor"
        subject = "Your application status has been updated"
        if "status" in data:
            message = "From " + professor_email + "\n\n" + data["status"] + "\nPosting ID: " + str(application_id)
        else:
            message = "Unfortunately, you have not been selected for " + str(application_id) + ". Thank you!"

        email_address = "2017it0638@svce.ac.in"
        email_password = "8778109200"

        # create email
        msg = EmailMessage()
        msg['Subject'] = subject
        msg['From'] = email_address
        msg['To'] = to
        msg.set_content(message)

        # send email
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(email_address, email_password)
            smtp.send_message(msg)
        # return True


        return prepare_response(
            True, f"Email sent successfully."
        )
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
