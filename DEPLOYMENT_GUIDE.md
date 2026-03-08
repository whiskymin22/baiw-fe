# Vercel Deployment Guide for React + Vite Frontend

## Prerequisites

1. **GitHub Account** - Sign up at https://github.com if you don't have one
2. **Vercel Account** - Sign up at https://vercel.com (use GitHub login for easy integration)
3. **Git installed** - Download from https://git-scm.com
4. **Backend API deployed** - Your backend should be deployed and accessible

## Step 1: Prepare Your Environment Variables

Before deploying, ensure you have the following environment variables ready:

| Variable       | Description                | Example                                 |
| -------------- | -------------------------- | --------------------------------------- |
| `VITE_API_URL` | Backend API URL (required) | `https://fsds-backend-api.onrender.com` |

> **Note**: Vite requires environment variables to be prefixed with `VITE_` to be exposed to the client.

## Step 2: Push Your Code to GitHub

```bash
# Initialize git (skip if already done)
git init

# Add all files
git add .

# Commit
git commit -m "Add frontend application"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended for Beginners)

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Connect your GitHub account if not already connected
4. Select your repository (click **"Import"**)
5. Configure the project:
   - **Project Name**: `fsds-academy-frontend` (or your preferred name)
   - **Framework Preset**: `Vite` (auto-detected)
   - **Root Directory**: `frontend` (if frontend is in a subdirectory, click "Edit" to change)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
   - **Install Command**: `npm install` (default)
6. Add **Environment Variables**:
   - Click **"Environment Variables"**
   - Add `VITE_API_URL` = `https://your-backend-url.onrender.com`
7. Click **"Deploy"**
8. Wait for deployment to complete (~1-2 minutes)

### Option B: Via Vercel CLI

Install Vercel CLI globally:

```bash
npm install -g vercel
```

Deploy from your project directory:

```bash
# Navigate to frontend directory
cd frontend

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

### Option C: Via vercel.json (Already Configured)

The repository includes a `vercel.json` file for SPA routing:

```json
{
	"rewrites": [
		{
			"source": "/(.*)",
			"destination": "/index.html"
		}
	]
}
```

This configuration ensures client-side routing works correctly (React Router).

## Step 4: Verify Your Deployment

After deployment, Vercel will give you a URL like `https://fsds-academy-frontend.vercel.app`

1. Open the URL in your browser
2. Test navigation between pages
3. Verify API calls are working (check browser DevTools → Network tab)

## Project Structure for Vercel

```
frontend/
├── src/
│   ├── components/       # React components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── App.tsx           # Main App component
│   └── main.tsx          # Entry point
├── dist/                 # Build output (generated)
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── vercel.json           # Vercel configuration
└── .env.example          # Environment variables template
```

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your local settings:

```env
VITE_API_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173`

### 4. Build for Production (Optional)

```bash
npm run build
npm run preview
```

## Environment Variables in Vite

### How It Works

Vite exposes environment variables to your code via `import.meta.env`:

```typescript
// Access in your code
const apiUrl = import.meta.env.VITE_API_URL;
```

### Important Notes

- Only variables prefixed with `VITE_` are exposed to the browser
- Variables are embedded at **build time**, not runtime
- After changing environment variables in Vercel, you need to **redeploy**

## Connecting to Backend

Ensure your backend CORS configuration allows requests from your Vercel domain:

```typescript
// In backend, add your Vercel URL to CLIENT_URL
CLIENT_URL=https://fsds-academy-frontend.vercel.app
```

## Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Vercel will automatically provision an SSL certificate

## Troubleshooting

### Common Issues

1. **404 on page refresh (SPA routing)**
   - Ensure `vercel.json` has the rewrite rule for `index.html`
   - The provided config already handles this

2. **API calls failing (CORS)**
   - Verify `VITE_API_URL` is set correctly (no trailing slash)
   - Check backend `CLIENT_URL` includes your Vercel domain
   - Ensure backend is running and accessible

3. **Environment variables not working**
   - Confirm variables are prefixed with `VITE_`
   - Redeploy after adding/changing environment variables
   - Check browser console for the actual values

4. **Build fails**
   - Check Vercel build logs for errors
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript has no errors: `npm run build` locally

5. **Blank page after deploy**
   - Check browser DevTools → Console for errors
   - Verify `dist/index.html` references correct asset paths
   - Check if assets are loading (Network tab)

### View Build Logs

In Vercel dashboard:

1. Go to your project
2. Click on the latest deployment
3. Click **"Building"** or **"Logs"** tab
4. View real-time build output and errors

## Vercel Features

### Automatic Deployments

- **Production**: Every push to `main` branch triggers a production deploy
- **Preview**: Every push to other branches creates a preview deployment
- Each PR gets its own preview URL for testing

### Instant Rollbacks

1. Go to **"Deployments"** tab
2. Find a previous working deployment
3. Click **"..."** → **"Promote to Production"**

### Analytics (Optional)

Enable Vercel Analytics for performance insights:

1. Go to **"Analytics"** tab
2. Click **"Enable"**
3. Add to your code:

```bash
npm install @vercel/analytics
```

```tsx
// In main.tsx or App.tsx
import { Analytics } from '@vercel/analytics/react';

function App() {
	return (
		<>
			{/* Your app */}
			<Analytics />
		</>
	);
}
```

## Vercel Limits (Hobby/Free Tier)

- Unlimited deployments
- 100GB bandwidth/month
- Serverless function execution: 100GB-hours/month
- Build execution: 6,000 minutes/month
- No cold start for static assets (CDN)
