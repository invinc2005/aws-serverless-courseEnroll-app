# AWS Serverless Course Enrollment App

[Watch Demo Video](https://drive.google.com/file/d/1_khXlyORMwk09jtFhSMipyh-T2nmKLDQ/view?usp=sharing)

## Overview

This is a full-stack serverless web application where users can:
- Sign up or log in
- View available courses
- Enroll in courses
- View their enrolled courses

Admins can:
- Log in separately
- View all courses
- See how many students are enrolled in each course

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Hosted on S3

### Backend (Serverless)
- AWS Lambda (for all backend logic)
- Amazon API Gateway (for routing)
- DynamoDB (to store users, courses, and enrollments)
- Amazon S3 (for static frontend hosting)

## Features

- Student and Admin login
- Student course enrollment
- Admin dashboard with student counts
- Serverless architecture (no traditional backend servers)

## Why These AWS Resources?

- **S3**: To host the React frontend as a static website.
- **API Gateway**: To create RESTful endpoints without managing servers.
- **Lambda**: For scalable backend logic with pay-per-use billing.
- **DynamoDB**: For fast and scalable NoSQL data storage.

