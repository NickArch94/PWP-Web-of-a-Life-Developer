import express from 'express'
import morgan from 'morgan'
import {z} from "zod";
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import 'dotenv/config'

const mailgun = new Mailgun(formData)
const mailgunClient = mailgun.client({username:'api', key: process.env.MAILGUN_API_KEY})

// get access to the express object to initialize express
const app = express()

// register morgan as a middleware with Express
// middleware allows for modifying incoming requests and customizes our responses
app.use(morgan('dev'))

//setup express to use json responses and parse those requests
app.use(express.json())

//create a router so that we can have custom paths for different resources in our application
const indexRoute = express.Router()

//create a simple get handler to help with CORS later on
const getRouteHandler = (request, response) => {
    return response.json('this thing still work?')
}

const postRouteHandler = async (request, response) => {
    response.header('Access-Control-Allow-Origin', '*')
    const schema = z.object({
        name: z.string({required_error: 'Name is required!'})
            .min(1, {message: 'Name must be at least 1 character long'})
            .max(64, {message: 'Name cannot exceed 64 characters'})
            .trim()
            .transform(value => value.replace(/(\r\n|\n|\r)/gm, '')),
        email: z.string({required_error: 'Email is a required field'})
            .email({message: 'Invalid email address'})
            .max(128, {message: 'Email cannot exceed 128 characters'})
            .trim()
            .transform(value => value.replace(/(\r\n|\n|\r)/gm, ''))
        , subject: z.string()
            .max(64, {message: 'Subject cannot exceed 64 characters'})
            .trim()
            .transform(value => value.replace(/(\r\n|\n|\r)/gm, ''))
            .optional(),
        message: z.string({required_error: 'Message is required!'})
            .min(1, {message: 'Message must contain at least 1 character.'})
            .max(1024, {message: 'Message cannot exceed 1024 characters'})
            .trim()
            .transform(value => value.replace(/(\r\n|\n|\r)/gm, ''))
    })
    const result = schema.safeParse(request.body)
    {
        if (result.error) {
            return response.json({status: 418, message: result.error.issues[0].message})
        }

        //if honeypot was touched, send fake 'success' msg
        if (request.body.website !== "") {
            return response.json({status: 201, message: 'email sent successfully'})
        }

        try {
            const subject = result.data.subject ?? undefined
            const mailgunMessage = {
                from: `${result.data.name} <postmaster@${process.env.MAILGUN_DOMAIN}>`,
                subject,
                text: `
                from ${result.data.email} 
      
                ${result.data.message}
      
                 `,
                to: process.env.MAILGUN_RECIPIENT
            }

            await mailgunClient.messages.create(process.env.MAILGUN_DOMAIN, mailgunMessage)
            return response.json({status: 200, message:"email sent successfully"})


        } catch (error) {
            console.error(error)
            return response.json({status: 500, message: 'Internal server error. Please try again later'})
        }
    }
}

indexRoute.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler)

app.use('/api', indexRoute)

app.listen(4200, () => {
    console.log('server is running')
})