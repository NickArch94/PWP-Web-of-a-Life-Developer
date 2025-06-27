import {z} from 'zod'

export function contactForm() {
    //Defined validation rules so that the form content can be validated.
    const schema = z.object({
        name: z.string({required_error: 'Name is required!'})
            .min(1, {mesage: 'Name must be at least 1 character long'})
            .max(64, {message: 'Name cannot exceed 64 characters'}),
        email: z.string({required_error: 'Email is a required field'})
            .email({message: 'Invalid email address'})
            .max(128, {message: 'Email cannot exceed 128 characters'})
        , subject: z.string()
            .max(64, {message: 'Subject cannot exceed 64 characters'})
            .optional(),
        Message: z.string({required_error: 'Message is required!'})
            .min(1, {message: 'Message must contain at least 1 character.'})
            .max(1024, {message: 'Message cannot exceed 1024 characters'})
    })
    //Grab the form and convert it to a form-data object and add an event listener for the submit event
    const form = document.getElementById('contact-form')

    //grab the required input fields so that a red border can be added/removed if an error occurs
    const nameInput = document.getElementById('name')
    const emailInput = document.getElementById('email')
    const messageInput = document.getElementById('message')
    const subjectInput = document.getElementById('subject')

    //Grab the error display elements to display our error messages
    const nameError = document.getElementById('nameError')
    const emailError = document.getElementById('emailError')
    const messageError = document.getElementById('messageError')
    const subjectError = document.getElementById('subjectError')

    //Grab element to show a success message or a backend error message
    const statusOutput = document.getElementById('status')

    //Define success and error classes to give the user a quick visual hint if the request succeeded/failed
    const successClasses = ['text-green-500', 'bg-green-50']
    const errorClasses = ['text-red-500', 'bg-red-50']

//Define what happens onSubmit
    form.addEventListener('submit', event => {
        //Prevent default HTML behaviour
        event.preventDefault()

        //Create an object from the form using the form data
        const formData = new FormData(form)

        //Hide error messages and remove styling from prior submissions
        const errorArray = [nameError, emailError, messageError, subjectError]
        errorArray.forEach(element => {
            element.classList.add('hidden')
        })
    })

    const inputArray = [nameInput, emailInput, messageInput, subjectInput]
    inputArray.forEach(input => {
        input.classList.remove('border-red-500')
    })

    //if email input is set, a bot most likely filled out the form, so provide a fake success message to trick the bot into thinking it succeeded.

    if (formData.get('website') !== '') {
        form.reset()
        statusOutput.innerHTML = 'message sent successfully!'
        statusOutput.classList.add(...successClasses)
        statusOutput.classList.remove('hidden')
        return
    }

    //convert formData into an object so that validation can be performed
    const values = Object.fromEntries(formData.entries())

    // subject is an empty string set it to undefined
    values.subject = values.subject === '' ? undefined : values.subject

    //check for zod errors related to validating input and provide feedback to users if errors occur.

    const result = schema.safeParse(values)

    if (result.success === false) {
        const errorsMap = {
            name: {inputError: nameInput, errorElement: nameError},
            email: {inputError: emailInput, errorElement: emailError},
            message: {inputError: messageInput, errorElement: messageError},
            subject: {inputError: subjectInput, errorElement: subjectError},
        }

        result.error.errors.forEach(error => {
            const {errorElement, inputError} = errorsMap[error.path[0]]
            errorElement.innerHTML = error.message
            errorElement.classList.remove('hidden')
            inputError.classList.add('border-red-500')
        })
        return
    }
    fetch('http://localhost:4200/apis', {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(values)
    })
        .then(response => response.json())
        .then(data => {
            statusOutput.innerHTML = data.message
            if (data.status === 200) {
                statusOutput.classList.add(...successClasses)
                from.reset()
            }
            statusOutput.classList.add(...errorClasses)
        })
}