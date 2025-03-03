# Tennis Court Booking App - Demo Instructions

This document provides instructions on how to run and use the Tennis Court Booking application in demo mode. The demo mode allows you to explore the application's features without needing to set up external dependencies like a database, authentication, or payment services.

## Getting Started

Follow these steps to run the application in demo mode:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open the application**:
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Demo Features

In demo mode, you can explore the following features:

### 1. Browse Open Sessions
- View a list of available tennis court sessions
- See details like date, time, cost, and number of participants
- Filter sessions by status (open, full, etc.)

### 2. View Session Details
- Click on any session to view its details
- See the court information, organizer, time, and cost
- View the list of participants and their payment status

### 3. Join Sessions
- Join any open session that has available spots
- You're automatically signed in with a demo user account
- No real authentication required

### 4. Create Sessions
- Create new tennis court sessions
- Select courts, set times, and specify player limits
- All created sessions will be available for others to join

### 5. Mock Payment Flow
- Experience the payment flow when joining a session
- No real payment processing - just a simulation
- See how payment status affects session participation

## Technical Details

### Mock Data
The demo uses in-memory mock data for:
- Tennis courts
- Users
- Open sessions
- Participants

### Mock Authentication
- You're automatically signed in as a demo user
- No need to register or log in
- Authentication state is simulated through the mock auth provider

### API Routes
The application includes mock API routes for:
- Fetching open sessions
- Getting session details
- Joining sessions
- Processing payments
- Fetching court information

### Demo Limitations
- **No Persistence**: Data is stored in memory and will reset when the server restarts
- **No Real Authentication**: Authentication is simulated
- **No Real Payments**: Payment processing is simulated
- **No Email Notifications**: Email notifications are not implemented

## Next Steps for a Real Deployment

To deploy a fully functional version of this application, you would need to:

1. **Set up a database**:
   - Configure a database like PostgreSQL or MongoDB
   - Create the necessary tables/collections for courts, users, sessions, etc.
   - Update the API routes to use the database instead of mock data

2. **Configure authentication**:
   - Set up NextAuth.js or a similar authentication provider
   - Replace the mock auth provider with real authentication
   - Implement user registration and login flows

3. **Integrate payment processing**:
   - Set up Stripe or another payment processor
   - Implement real payment flows
   - Handle payment webhooks and confirmations

4. **Add email notifications**:
   - Set up an email service provider
   - Implement email notifications for session creation, joining, etc.
   - Create email templates for different notification types

5. **Deploy the application**:
   - Deploy to Vercel, Netlify, or another hosting provider
   - Configure environment variables for production
   - Set up monitoring and logging

## Feedback and Questions

If you have any feedback or questions about the demo, please feel free to reach out to the development team. 