# CarCar

Team:

- Kevin Almonte - Sales
- Henry Kim - Service

## Design

## Service microservice

Django was used for the backend of the service microservice.
Code was added to the following three files to provide backend functionality.
1 - urls.py
A total of six paths were created.
1 - technicians/ links the GET technician list and new technician POST functionality.
2 - technicians/pk/ links the DELETE request for a specific technician.
3 - automobiles/ is set up for the GET request to retrieve data from the AutomobileVO.
4 - appointments/ links the GET appointments but excludes appoints with a status of "Canceled" or "Finished" and creates the functionality for POSTing new appointments.
5 - appointments/pk/ makes it possible to PUT or update an appointment, specifically for the status and to delete it with the appropriate API request. However, the project requirements specify that an appointment should not be deleted so it will always show in the "Service History" list.
6 - service-history/ has a GET request to show ALL of the appointments, regardless of status.
2 - models.py
A total of three models were crated for this microservice
1 - Appointment includes all the required fields as well as the technician Foreign Key.
2 - Technician includes the first name, last name, and a unique employee_id. The on_delete property was given a PROTECT value so if a technician is deleted, it will prevent the appointments serviced by that technician from being removed from the service history list.
3 - AutomobileVO contains information polled from the Inventory microservice with the vin number and sold status.
3 - views.py
A total of six functions were created to correlate with each of the aforementioned paths.
1 - api_list_technicians handles POST and GET requests.
2 - api_show technicians handles DELETE requests.
3 - api_list_automobiles handles the GET requests from the AutomobileVO.
4 - api_list_appointments handles the GET appointments requests but excludes those with a status of "Canceled" or "Finished" and POSTing new appointments.
5 - api_show_appointments handles the PUT requests (used specifically in this project to change the status) and DELETE requests (that would not be used to prevent deleting appointments from the service history).
6 - api_service_history contains the GET appointments request without the status filter.
Additionally, on the backend there is the encoders.py that contains the encoders for the three models( Appointment, Technician, and AutomobileVO) as well as the poller.py file that handles the get request of the Automobile data from the Inventory microservice.

React was used on the frontend of the service microservice.
A total of five files were created to address the functionality on the backend.
1 - TechniciansList.js is a straightforward table showing the three technicians fields - first name, last name, and employee id.
2 - TechnicianForm.js contains one state to handle formData and three components to handle changing the formData, submit, and an extra success notification when the form has been successfully submitted.
3 - AppointmentsList.js is an involved table that includes a column for each field from the Appointments model with a couple additions and modifications. There are two states involved with this list: the first to set and change the appointment list based on status and the second to compare the VIN of the service vehicle with those sold from inventory. The "Is VIP?" column checks to see if the VIN number of the car matches a sold vehicle from the business' inventory using the AutomobileVO data using a component called "vipStatus" that simply checks to see if the form VIN matches the sold VIN. The date and time data is extracted from a single date_time field in the Appointment model and formatted for easy viewing. This is done using the getDate and getTime components. Finally, there are two buttons that can be clicked to change the status to either "Canceled" or "Finished". Finally, there is a link to create a new appointment. This is accomplished with PUT requests being sent with body containing the status key and its correlating value.
4 - AppointmentForm.js allows the creation of a new appointment instance. There are two states for this component, the first is to fetch the technician data to fill the dropdown options with current technicians and another to handle changes in the formData. The separate date and time fields are combined when sent out as a POST request when the Create button has been clicked.
5 - ServiceHistory.js is identical to the AppointmentsList.js table with two exceptions. The first is that there are no appointments excluded and the second is the absence of the cancel/finish buttons. Additionally, there is the functionality to search for a specific VIN number in part or whole. There are four states to pull appointment data, check VIP status, handle changes to the search field, and to create a modified appointments list based on search results.
In addition to the service microservice, the frontend portion of the Inventory microservice were split with my partner. My partner handled the manufacturer and model lists/forms while I handled the automobiles list/form as well as the Routes in App.js and NavLinks in Nav.js.
1 - AutomobilesList.js included one state to handle the data found in the automobiles model. In addition to the correlating fetchAutomobileData component is a way to display whether or not the automobile is available or if it has been sold.
2 - AutomobileForm.js has two states to handle the list of technicians and formData changes. There are four components to handle the two states and to provide a success notification when the create/submit button is clicked in the form.
3 - Nav.js contains a dropdown menu of the three microservices as departments - Inventory, Sales Department, and Service Department.
4 - App.js contains the React Routes to handle linking the pages together.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
