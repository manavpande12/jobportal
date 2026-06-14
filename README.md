# Job Portal

A modern full-stack Job Portal built with **Next.js**, **Spring Boot**, and **PostgreSQL**.

## Features

### Candidate

* Search and browse jobs
* View detailed job descriptions
* Apply for jobs
* Manage profile and account

### Recruiter

* Create and manage job postings
* Update job status (Active, Draft, Closed)
* View applicants
* Manage company information

### Authentication

* JWT-based authentication
* Refresh token support
* Forgot password via email OTP
* Role-based authorization

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Shadcn UI
* TanStack Query
* React Hook Form
* Zod

### Backend

* Spring Boot
* Spring Security
* Spring Data JPA
* PostgreSQL
* JWT Authentication
* Maven

## Project Structure

```text
JOBPORTAL/
├── app/
├── common/
├── config/
├── features/
├── public/
├── spring-backend/
│   ├── src/
│   ├── pom.xml
│   └── application.properties
├── .env.example
└── package.json
```

## Environment Variables

Create a `.env` file in the project root.

```env
SERVER_PORT=8080

DB_HOST=localhost
DB_PORT=5432
DB_NAME=jobportal
DB_USERNAME=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_jwt_secret

MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_gmail_app_password

NEXT_PUBLIC_API_URL=http://localhost:8080/api

CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## Getting Started

### Clone Repository

```bash
git clone <repository-url>
cd jobportal
```

### Install Frontend Dependencies

```bash
npm install
```

### Create Environment File

```bash
copy .env.example .env
```

Update the values according to your environment.

### Start Development Server

```bash
npm run dev
```

This command starts:

* Next.js Frontend
* Spring Boot Backend

### Run Separately

Frontend:

```bash
npm run dev:next
```

Backend:

```bash
npm run dev:spring
```

## API Documentation

Swagger can be enabled through Spring Boot configuration when required.

## License

This project is for educational and portfolio purposes.
