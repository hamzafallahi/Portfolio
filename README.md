# Portfolio Admin Interface

This is a comprehensive portfolio website with an admin interface for content management.

## Features

- **Public Portfolio**: Dynamic website displaying person info, projects, experiences, and contact form
- **Admin Dashboard**: Protected interface for managing all portfolio content
- **Oracle Database**: Object-relational database with nested tables for complex data structures
- **JWT Authentication**: Secure admin login with token-based authentication
- **Real-time Updates**: Changes in admin interface reflect immediately on the public site

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Oracle Database 19c
- **Authentication**: JWT with bcrypt password hashing
- **Database Driver**: oracledb for Node.js
- **Email**: Nodemailer with Google Sheets integration

## Setup Instructions

### 1. Database Setup

1. Install Oracle Database 19c or later
2. Run the SQL script to create the schema and seed data:

```sql
-- Execute sql_scripts.sql in your Oracle database
-- This creates all tables, types, and sample data
```

3. Update your database connection details in `lib/oracle.ts`

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database Configuration
DB_USER=portfolio
DB_PASSWORD=portfolio123
DB_CONNECT_STRING=localhost:1521/XEPDB1

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
GOOGLE_SHEETS_ID=your-google-sheets-id
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Admin Access

- **URL**: `http://localhost:3000/admin`
- **Username**: `admin`
- **Password**: `admin123`

## API Endpoints

### Public APIs
- `GET /api/person` - Get person information
- `GET /api/projects` - Get all projects
- `GET /api/experience` - Get all experiences
- `POST /api/registration` - Handle contact form submissions

### Admin APIs
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token
- `PUT /api/person` - Update person information
- `POST /api/projects` - Create new project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project
- `POST /api/experience` - Create new experience
- `PUT /api/experience/[id]` - Update experience
- `DELETE /api/experience/[id]` - Delete experience

## Database Schema

### Tables
- `person_tab` - Person information with nested technology tags and social links
- `project_tab` - Projects with nested tags and reference to person
- `experience_tab` - Work experiences with nested technologies and achievements
- `contact_message_tab` - Contact form submissions
- `admin_user` - Admin user credentials

### Object Types
- `person_t` - Person object type
- `project_t` - Project object type
- `experience_t` - Experience object type
- `contact_message_t` - Contact message object type
- `technology_t` - Technology tag object
- `achievement_t` - Achievement object
- `social_links_t` - Social media links object

## Development

### Project Structure
```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard page
│   ├── login/             # Admin login page
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── admin/            # Admin interface components
│   └── ui/               # UI components (shadcn/ui)
├── lib/                  # Utility libraries
├── hooks/                # Custom React hooks
└── sql_scripts.sql       # Database schema and data
```

### Key Components

#### Admin Components
- `PersonTab` - Manage person information and social links
- `ProjectsTab` - CRUD operations for projects
- `ExperiencesTab` - CRUD operations for work experiences
- `MessagesTab` - View contact form submissions

#### Public Components
- `AboutMe` - Dynamic person information display
- `Projects` - Dynamic projects showcase
- `Experience` - Dynamic work experience timeline
- `Contact` - Contact form with email integration

## Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Set up Oracle database (consider using Oracle Cloud or AWS RDS)
4. Deploy

### Environment Variables for Production
```env
DB_USER=your-prod-db-user
DB_PASSWORD=your-prod-db-password
DB_CONNECT_STRING=your-prod-connection-string
JWT_SECRET=your-production-jwt-secret
EMAIL_USER=your-production-email
EMAIL_PASS=your-production-app-password
```

## Security Notes

- JWT tokens expire in 2 hours
- Passwords are hashed with bcrypt (10 rounds)
- Admin routes are protected with middleware
- Database connection uses connection pooling
- CORS is configured for API routes

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify Oracle database is running
   - Check connection string and credentials
   - Ensure user has proper permissions

2. **Admin Login Issues**
   - Verify admin user exists in database
   - Check JWT_SECRET environment variable
   - Clear browser localStorage if token is corrupted

3. **Build Errors**
   - Run `npm run build` to check for TypeScript errors
   - Ensure all dependencies are installed
   - Check Node.js version compatibility

### Logs
- Check browser console for client-side errors
- Check server logs in terminal for API errors
- Database errors will be logged in the API route handlers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.