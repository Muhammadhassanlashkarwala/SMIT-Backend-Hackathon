import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://muhammadhassanacademy:LixcqEyJdKPpuLrF@cluster0.clc6a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('Connected to Database');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};