# Lesson Planner Application

## Overview
This project is a lesson planner application that allows users to generate structured lesson plans dynamically. The application features a login system and integrates with the Gemini API to fetch lesson plan content.

## Features
1. User authentication (demo login credentials)
2. Generate structured lesson plans using AI
3. Edit lesson plans manually
4. Download lesson plans as PDF

## Tech Stack

1. React.js (Frontend UI)
2. Tailwind CSS (Styling)
3. Google Gemini API (AI Content Generation)
4. jsPDF (PDF Generation)

## Prerequisites
Ensure you have the following installed:
1. Node.js
2. npm or yarn

## Getting Started
### 1. Clone the Repository
git clone https://github.com/ydheeraj2003/lesson-planner.git
cd lesson-planner

### 2. Install Dependencies
npm install
    or
yarn install

### 3. Set Up Environment Variables
Create a .env file in the root of the project and add the following:
REACT_APP_GEMINI_API_KEY=your_google_gemini_api_key

### 4. Start the Application
npm start
   or
yarn start

## Usage
### Login
Use the following demo credentials:
Email: demouser
Password: demopass

### Generate a Lesson Plan
1. Enter lesson details (Topic, Grade Level, Main Concept, etc.).
2. Click "Generate Lesson Plan" to fetch AI-generated content.
3. Edit content if needed and download as a PDF.

### API Integration (Google Gemini)
The application sends a request to the Gemini API with lesson details to generate structured content. Ensure you have an active API key.
