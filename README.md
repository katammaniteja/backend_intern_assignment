# backend_intern_assignment
### Problem Statement
Write a backend code to get an appointment with the healthcare experts

### Approach
- First implement the registration process. There are two ways of registration ie. Doctor and Patient.
- Used jwt token to implement authentication. You can login as patient or doctor.
- Now when a doctor is logged in we need to show him the appointments booked by the patient.
- The patient can book a session with doctor based on the specilization he wants. The backend will return the list of all doctors of that specialization of particular day the patient choosed.
- Im assumed that per one day only one patient can book appointment for a particular Doctor. When the patient booked an appointemt the detials of the patient will be stored in database so that the doctor can call him and also the details of the doctor will be shared to patient.
- In many ways we can implement. So based on the requirements the functionality may change. 

### Schema
#### Doctor
- {
  name, 
  email,
  password,
  specialization,
  contact,
  filled_slots:[
    {
      date,
      phone_number,
      email,
      name,
    }
  ]
  tokens:[
    {
      token,
    }
  ]
}

- Here we are storing the name,email,contact and specilization of the doctor. We are also storing the slots booked by a patient. In filled slot schema the date at which patient want appointment to doctor will be stored along with phone_number, email, name of the patient is also stored.

#### Patient
- {
 name,
 email,
 password,
 token:[
  {
    token,
  }
 ]
}

- Here we are just storing the details of the patient.

### API End Points
##### /register-doctor
- Method: POST
- {name,email,password,contact,specialization }

