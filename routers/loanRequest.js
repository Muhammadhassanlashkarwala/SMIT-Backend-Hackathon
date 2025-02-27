import express from "express";
import sendResponse from "../Helpers/sendResponse.js";
import LoanRequest from "../models/LoanRequest.js";
import Users from "../models/Users.js";
import Appointment from "../models/Appointment.js";
import nodemailer from "nodemailer";
import Password from "../models/Password.js";

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: "muhammadhassanacademy@gmail.com",
        pass: "hassan@123"
    }
});

// Send email function
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: `<muhammadhassanacademy@gmail.com>`,
        to,
        subject,
        text,

    };
    await transporter.sendMail(mailOptions);
};
// Get loan requests
router.get("/getLoanRequest", async (req, res) => {
    const { city, country } = req.query;
    let loanRequest = null;
    if (city && country) {
        loanRequest = await LoanRequest.find({ city, country });
    } else {
        loanRequest = await LoanRequest.find();
    }
    if (!loanRequest) return sendResponse(res, 400, null, true, "Loan Request Failed");
    sendResponse(res, 200, loanRequest, false, "Loan Request Successfully");
});

// Get loan request by ID
router.get("/getLoanRequestById/:id", async (req, res) => {
    const { id } = req.params;
    const loan = await LoanRequest.findById(id);
    if (!loan) return sendResponse(res, 400, null, true, "Loan Request Not Found");
    sendResponse(res, 200, loan, false, "Loan Request Successfully");
});

// Get loan request by CNIC
router.get("/getLoanRequest/:cnic", async (req, res) => {
    const loanRequest = await LoanRequest.find({ cnic: req.params.cnic });
    if (!loanRequest) return sendResponse(res, 400, null, true, "Loan Request Failed");
    sendResponse(res, 200, loanRequest, false, "Loan Request Successfully");
});

// Add a new loan request
router.post("/addLoanRequest", async (req, res) => {
    const { email, name, subcategories, maximumloan, loanperiod } = req.body;
    const newLoanRequest = new LoanRequest({ name, email, subcategories, maximumloan, loanperiod });
    let user = await Users.findOne({ email });
    if (!user) {
        user = new Users({ email, name });
        await user.save();
    }
    await newLoanRequest.save();
    if (!newLoanRequest) return sendResponse(res, 400, true, null, "Loan Request Failed");
    let genPassword = 123456
    // save email and new password to new schema
    let newUser = new Password({ email: email, genPassword })
    await newUser.save()
    // Send confirmation email
    await sendEmail(email, "Loan Request Confirmation", `Your loan request has been successfully submitted, your new password is ${genPassword}.`);
    sendResponse(res, 201, false, newLoanRequest, "Loan Request Successfully");
});
router.post("/verifyPassword", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userPassword = await Password.findOne({ email });
        if (!userPassword) {
            return sendResponse(res, 404, null, true, "User not found");
        }
        if (userPassword.genPassword !== password) {
            return sendResponse(res, 401, null, true, "Invalid password");
        }
        sendResponse(res, 200, null, false, "Password verified successfully");
    } catch (error) {
        sendResponse(res, 500, null, true, "An error occurred while verifying the password");
    }
});

// Get appointments
router.get("/getAppointment", async (req, res) => {
    const { city, country } = req.query;
    let appointmentRequest = null;
    if (city && country) {
        appointmentRequest = await Appointment.find({ city, country });
    } else {
        appointmentRequest = await Appointment.find();
    }
    if (!appointmentRequest) return sendResponse(res, 400, null, true, "Appointment Request Failed");
    sendResponse(res, 200, appointmentRequest, false, "Appointment Request Successfully");
});

// Add an appointment (example)
router.post("/addAppointment", async (req, res) => {
    const { userId, applicationId, appointmentDate, appointmentTime, location } = req.body;
    const newAppointment = new Appointment({ userId, applicationId, appointmentDate, appointmentTime, location });
    await newAppointment.save();
    if (!newAppointment) return sendResponse(res, 400, true, null, "Appointment Request Failed");

    // Send appointment confirmation email
    const user = await Users.findById(userId);
    if (user) {
        await sendEmail(user.email, "Appointment Confirmation", `Your appointment has been scheduled on ${appointmentDate} at ${appointmentTime}.`);
    }
    sendResponse(res, 201, false, newAppointment, "Appointment Request Successfully");
});

export default router;