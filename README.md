# Volunteering-platform
Volunteering platform

## Project Description:
The volunteering platform is a web-based application designed to facilitate connections between individuals offering services and those in need

## Team Members:
        Name           Role            Email
    1- Assma Hamad   FrontEnd    assma.hm89@gmail.com

    2- Akram adam    FrontEnd     akramadam050@gmail.com

    3- Ali Hassan    BackEnd      ali012wkout@gmail.com

    4- Mahmoud Adam  BackEnd      mahmoudadam5555@gmail.com

## Introduction
Welcome to the "Linking Volunteers to Those in Need" platform! This project is designed to bridge the gap between volunteers offering services and individuals seeking support, fostering a sense of community and empowerment. This README provides an overview of the project, its architecture, functionality, and essential usage guidelines.

# Key Features
        1.Volunteer Opportunities:
                Volunteers can post, manage, and track opportunities.
                Requesters can browse and request services seamlessly.
        2.Dynamic Role Management:
                Users can switch between "Volunteer" and "Requester" roles without creating multiple accounts.
        3.Streamlined Collaboration:
                Role-based dashboards for efficient service exchange.
                Notification system for real-time updates.
        4.Authentication and Security:
                Secure login using JSON Web Tokens (JWT) and bcrypt for password hashing.
                Role-specific access control.

# Architecture Overview

        Frontend Architecture:

                Built using Vue 3 for an intuitive and responsive user interface.
                Styled with Tailwind CSS for modern, clean designs.
                Managed with Vite for efficient builds and faster development cycles.

# Backend Architecture:

                Powered by Node.js and Express.js for robust server-side logic.
                nosql Database for data storage and management.
                RESTful APIs to handle communication between frontend and backend.

        Security:

                Authentication is secured using JWT.
                Passwords are hashed with bcrypt.
                Role-based access ensures data integrity.

## Architecture :
        1.	Frontend:
                o	Technology: Vue 3 (JavaScript Framework)
                o	Build Tool: Vite
                o	Styling: Tailwind CSS
        2.	Backend:
                o	Technology: Node.js with Express.js
                o	Database: Redis
        3.	API Integration:
                o	Communication between the frontend and backend is achieved using RESTful APIs.
        4.	Authentication and Security:
                o	JWT (JSON Web Tokens)
        5.	Third-Party Services:
                o	SweetAlert2: For user-friendly alerts and notifications on the frontend.
                o	Cloud Hosting: Digital Ocean

## Roles and Functionalities
        Volunteer:
                Post opportunities with details like title, description, category, location, availability, and participant         limits.
                Manage posts: edit, update, or delete opportunities.
                Approve or decline requests from requesters.

        Requester:
                Browse opportunities by category, location, or availability.
                Submit requests for services.
                Track request status: pending, approved, or declined.

        Dynamic Role Assignment:
                Users can switch between roles from their dashboard.
                Manage requests and opportunities within a single account.
## Challenges Faced
                
## How it works:
        1- Clone Github Repository: https://github.com/Akram-Adam/Volunteering-platform.git
        2- npm install
        3- install redis server for database

# Thank You
We appreciate your interest in "Linking Volunteers to Those in Need". Together, we can create meaningful community connections and make a difference!
