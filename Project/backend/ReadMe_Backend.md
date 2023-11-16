# Charity Wallet Website Backend

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Configuration](#configuration)
5. [Folder Structure](#folder-structure)
6. [API Endpoints](#api-endpoints)
7. [Database Schema](#database-schema)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Packages](#package)

## Introduction

The Charity Wallet Website Backend serves as the foundational infrastructure supporting the functionality and features of the Charity Wallet platform. Its primary purpose is to facilitate seamless interaction between users, NGOs (Non-Governmental Organizations), fundraisers, and organizers through a secure and efficient backend system.

## Features

### 2.1 Authentication

#### 2.1.1 NGO Authentication

- **Description:** Utility function for authenticating NGOs and sending an HTTP cookie containing a JWT token.

#### 2.1.2 Organizer Authentication

- **Description:** Similar to NGO authentication but tailored for organizers.

### 2.2 OTP Verification

#### 2.2.1 Generate OTP
-**Description:** Utility function for generating an OTP, saving it to the database, and sending it to the user's email.

#### 2.2.2 Verify OTP
-**Description:** Utility function for verifying the provided OTP against the stored OTP in the database.

#### 2.3 Donation Management 

#### 2.4 Campaign Management 

#### 2.5 Fundraiser Management 

## Prerequisites

Before setting up the backend, ensure you have the following prerequisites installed:

-**Programming Language**: JavaScript (Node.js)
-**Database**: MongoDB, using Mongoose as the ODM (Object Data Modeling) library
-**Web Framework**: Express.js for building the RESTful API
-**Authentication**: JWT (JSON Web Tokens) for secure user authentication
-**Middleware**: Utilizes custom middleware functions for user authentication and error handling
-**File Upload**: Implements file upload functionality using Multer for handling multipart/form-data
-**Image Processing**: Utilizes Sharp for image processing and resizing
-**External Services/APIs**: Integrates with Google Drive API for efficient file storage and retrieval
-**Email Handling**: Nodemailer for sending emails, such as OTPs (One-Time Passwords) during user registration
-**Google Drive**: Integrated for secure and scalable file storage, supporting the upload, update, retrieval, and deletion of logos and images.

## Getting Started

### Installation

Clone the repository

```bash
git clone https://github.com/ayushhirdani13/CharityWallet/tree/ayush_139/Project/backend 

```

Navigate to the project directory in the backend folder 

### Install dependencies
npm install

Install the required dependencies:

npm install bcrypt cookie-parser cors dotenv express jsonwebtoken lodash mongoose multer nodemailer otp-generator redis sharp


### Configuration
Configure the backend by setting up environment variables, connecting to databases, etc. Make sure to create a .env file in the root directory and add the necessary environment variables.

*Example for a .env file*
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/charity-wallet
JWT_SECRET=your_jwt_secret_key
REDIS_URL=your_redis_url
# Add other necessary environment variables
```

## Folder Structure

```bash

/src
  /controllers
  /data
  /middlewares
  /models
  /routes
  /utils 

```
## API Endpoints

### Routing Information

#### NGO Routes

- **Get All NGOs:**
  - Endpoint: `GET /ngos`
  - Controller: `getNgos`

- **Register NGO:**
  - Endpoint: `POST /ngos/register`
  - Controller: `registerNgo`

- **Complete NGO Registration:**
  - Endpoint: `POST /ngos/confirm-registration`
  - Controller: `completeNgoRegistration`

- **Login NGO:**
  - Endpoint: `POST /ngos/login`
  - Controller: `loginNgo`

- **Get NGO Dashboard:**
  - Endpoint: `GET /ngos/dashboard`
  - Controller: `getNgoByAlias`

- **Donate to NGO:**
  - Endpoint: `POST /ngos/donate`
  - Controller: `donateToNgo`

- **Get Campaigns by NGO:**
  - Endpoint: `GET /ngos/campaigns`
  - Controller: `getCampaigns`

- **Manage NGO Account:**
  - Endpoint: `GET /ngos/myNgo`
  - Controller: `getMyNgo` (Authenticated)
  - Endpoint: `PUT /ngos/myNgo`
  - Controller: `updateNgoProfile` (Authenticated)
  - Endpoint: `DELETE /ngos/myNgo`
  - Controller: `deleteNgo` (Authenticated)

- **Manage NGO Campaigns:**
  - Endpoint: `POST /ngos/myNgo/addCampaign`
  - Controller: `addCampaign` (Authenticated)
  - Endpoint: `PUT /ngos/myNgo/updateCampaign`
  - Controller: `updateMyCampaign` (Authenticated)
  - Endpoint: `DELETE /ngos/myNgo/deleteCampaign`
  - Controller: `deleteMyCampaign` (Authenticated)

- **Change Password and Logo:**
  - Endpoint: `POST /ngos/myNgo/changePassword`
  - Controller: `changePassword` (Authenticated)
  - Endpoint: `POST /ngos/myNgo/uploadLogo`
  - Controller: `uploadLogo` (Authenticated)
  - Endpoint: `DELETE /ngos/myNgo/logo`
  - Controller: `deleteLogo` (Authenticated)

- **Manage NGO Gallery:**
  - Endpoint: `POST /ngos/myNgo/gallery`
  - Controller: `uploadGallery` (Authenticated)

#### Campaign Routes

- **Get All Campaigns:**
  - Endpoint: `GET /campaigns`
  - Controller: `getCampaigns`

- **Get Campaign by Alias:**
  - Endpoint: `GET /campaigns/:alias`
  - Controller: `getCampaignByAlias`

- **Donate to Campaign:**
  - Endpoint: `GET /campaigns/donate`
  - Controller: `donateToCampaign`

#### Fundraiser Routes

- **Get All Fundraisers:**
  - Endpoint: `GET /fundraisers`
  - Controller: `getFundRaiser`

- **Get Fundraiser by Alias:**
  - Endpoint: `GET /fundraisers/:alias`
  - Controller: `getFundRaiserById`

- **Donate to Fundraiser:**
  - Endpoint: `GET /fundraisers/donate`
  - Controller: `donate`

#### Organizer Routes

- **Register Organizer:**
  - Endpoint: `POST /organizers/register`
  - Controller: `registerOrganizer`

- **Complete Organizer Registration:**
  - Endpoint: `POST /organizers/confirm-registration`
  - Controller: `completeOrganizerRegistration`

- **Login Organizer:**
  - Endpoint: `POST /organizers/login`
  - Controller: `loginOrganizer`

- **Manage Organizer Profile:**
  - Endpoint: `GET /organizers/myProfile`
  - Controller: `getMyProfile` (Authenticated)
  - Endpoint: `PUT /organizers/myProfile`
  - Controller: `updateOrganizerProfile` (Authenticated)
  - Endpoint: `DELETE /organizers/myProfile`
  - Controller: `deleteOrganizer` (Authenticated)

- **Manage Organizer Campaigns:**
  - Endpoint: `POST /organizers/addCampaign`
  - Controller: `addCampaign` (Authenticated)
  - Endpoint: `PUT /organizers/updateCampaign`
  - Controller: `updateMyCampaign` (Authenticated)
  - Endpoint: `DELETE /organizers/deleteCampaign`
  - Controller: `deleteMyCampaign` (Authenticated)

- **Change Password:**
  - Endpoint: `POST /organizers/changePassword`
  - Controller: `changePassword`

- **Confirm Password Change:**
  - Endpoint: `POST /organizers/changePasswordConfirm`
  - Controller: `changePasswordConfirmation`

### Authentication

#### NGO Authentication

##### Middleware: `isNgoLoggedIn`

- **Description:** Middleware to authenticate NGO requests using JWT tokens.
- **Usage:**
  ```javascript
  import { isNgoLoggedIn } from "./middlewares/auth.js";
  
  app.get("/api/some-ngo-protected-endpoint", isNgoLoggedIn, (req, res) => {
    // Route logic for authenticated NGOs
  });
  ```
#### Organizer Authentication

##### Middleware: isOrganizerLoggedIn
Description: Middleware to authenticate organizer requests using JWT tokens.
Usage:
```javascript
import { isOrganizerLoggedIn } from "./middlewares/auth.js";

app.get("/api/some-organizer-protected-endpoint", isOrganizerLoggedIn, (req, res) => {
  // Route logic for authenticated organizers
});
```
#### Error Handling

##### Middleware: errorMiddleware
Description: Middleware to handle errors and send appropriate responses.
Usage:
```javascript
import { errorMiddleware } from "./middlewares/error.js";

// Add this middleware at the end of your middleware chain
app.use(errorMiddleware);
```

#### File Upload

##### Middleware: File Upload
###### upload
Description: Middleware for handling file uploads.
Usage:
```javascript
import { upload } from "./middlewares/auth.js";

app.post("/api/upload", upload.single("file"), (req, res) => {
  // Route logic for handling file uploads
});
```
#### Google Drive Integration

##### uploadLogoGdrive
Description: Upload a logo to Google Drive.
Usage:
```javascript
import { uploadLogoGdrive } from "./middlewares/auth.js";
const fileId = await uploadLogoGdrive(file, next);
```
##### updateLogoGdrive
Description: Update a logo on Google Drive.
Usage:
```javascript
import { updateLogoGdrive } from "./middlewares/auth.js";
const fileId = await updateLogoGdrive(fileId, file, next);
```

##### getLogoGdrive
Description: Get a logo from Google Drive.
Usage:
```javascript
import { getLogoGdrive } from "./middlewares/auth.js";
const filePath = await getLogoGdrive(imgId);
```

##### deleteLogoGdrive
Description: Delete a logo from Google Drive.
Usage:
```javascript
import { deleteLogoGdrive } from "./middlewares/auth.js";
const response = await deleteLogoGdrive(imgId, next);
```
##### uploadMultipleImagesGdrive
Description: Upload multiple images to Google Drive.
Usage:
```javascript
import { uploadMultipleImagesGdrive } from "./middlewares/auth.js";
const uploadedImageIds = await uploadMultipleImagesGdrive(files, next);
```

## Database Schema

### Campaign
```javascript
- title: String (required)
- vision: String (required)
- organizerType: String, Enum ["NGO", "Organizer"] (required)
- organizerId: ObjectId, Ref [NGO, Organizer] (required)
- alias: String, Unique
- images: Array of Strings (required)
- donationsTillNow: Number, Default 0
- verified: Boolean, Default false
- createdAt: Date, Default current date
```

### Donation 

```javascript

- donorName: String (required)
- donorEmail: String (required)
- donorPhoneNo: String (required)
- donationAmount: Number (required)
- message: String
- receiverType: String, Enum ["NGO", "FundRaiser", "Campaign"] (required)
- receiverId: ObjectId, Ref [NGO, FundRaiser, Campaign] (required)
- donationTime: Date, Default current date

```

### FundRaiser

```javascript

- name: String (required)
- email: String (required)
- phoneNo: String (required)
- password: String, Select false (required)
- title: String (required)
- issue: String, Enum ["Medical", "Animal"] (required)
- donationReq: Number (required)
- donationTillNow: Number, Default 0
- alias: String, Unique
- address: Object { city, state, pincode } (required)
- verified: Boolean, Default false
- createdAt: Date, Default current date

```

### NGO

```javascript

- name: String (required)
- email: String, Unique (required)
- password: String, Select false (required)
- contactNo: String (required)
- description: String
- alias: String, Unique
- licenseNo: String (required)
- dateOfReg: Date (required)
- verified: Boolean, Default false
- logo: String, Default null
- gallery: Array of Strings
- address: Object { city, state, pincode } (required)
- campaigns: Array of ObjectId, Ref Campaign
- donationsTillNow: Number, Default 0
- createdAt: Date, Default current date

```

### Organizer

```javascript

- organizerName: String (required)
- organizerEmail: String (required)
- organizerPhoneNo: String (required)
- organizerPassword: String, Select false (required)
- campaigns: Array of ObjectId, Ref Campaign
- createdAt: Date, Default current date

```
### OTP

```javascript

- email: String, Unique (required)
- otp: String (required)
- createdAt: Date, Default current date, Expires after 5 minutes

```

## Deployment

## Testing 

## Packages
The project is distributed under the following packages :

{
  "name": "charity-wallet-api",
  "version": "1.0.0",
  "description": "Backend for the Charity Wallet Website Project",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "lodash": "^4.17.21",
    "mongoose": "^7.6.4",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.7",
    "otp-generator": "^4.0.1",
    "redis": "^4.6.10",
    "sharp": "^0.32.6"
  }
}
 

