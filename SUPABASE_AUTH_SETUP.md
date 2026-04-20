# Supabase Authentication Setup Guide

## Critical: Configure Redirect URLs in Supabase Dashboard

The magic link authentication requires proper redirect URL configuration in your Supabase project.

### Steps to Configure:

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `yijukldnxvgayzvjhdxe`

2. **Navigate to Authentication Settings**
   - Click on "Authentication" in the left sidebar
   - Click on "URL Configuration"

3. **Add Redirect URLs**
   Add these URLs to the "Redirect URLs" section:

   ```
   http://localhost:3000/auth/callback
   http://localhost:3000/**
   ```

   For production, also add:

   ```
   https://your-domain.com/auth/callback
   https://your-domain.com/**
   ```

4. **Configure Site URL**
   Set the "Site URL" to:

   ```
   http://localhost:3000
   ```

5. **Save Changes**
   Click "Save" at the bottom of the page

## Testing the Auth Flow

### Step 1: Request Magic Link

1. Go to: http://localhost:3000/login
2. Enter your admin email: `ugwuemmanuelking@gmail.com`
3. Click "Send Magic Link"
4. Wait for the email (check spam folder)

### Step 2: Click Magic Link

1. Open the email from Supabase
2. Click the magic link
3. You should be redirected to: http://localhost:3000/auth/callback
4. Then automatically redirected to: http://localhost:3000/admin

### Step 3: Debug if Issues Occur

If you're still being redirected to login, visit:

```
http://localhost:3000/auth/debug
```

This page will show:

- ✅ Whether you have an active session
- Your user email and ID
- Session expiration time
- All cookies present

## Common Issues & Solutions

### Issue 1: "Invalid authentication link"

**Cause:** Redirect URL not whitelisted in Supabase
**Solution:** Add `http://localhost:3000/auth/callback` to Supabase redirect URLs

### Issue 2: Redirected back to login

**Cause:** Session cookies not being set
**Solution:**

- Check browser console for errors
- Visit `/auth/debug` to see session status
- Ensure cookies are enabled in browser

### Issue 3: "Authentication link expired"

**Cause:** Magic link was used before or expired (links expire after 1 hour)
**Solution:** Request a new magic link

### Issue 4: Rate Limiting

**Cause:** Supabase has rate limits on auth requests
**Solution:**

- Wait a few minutes between requests
- In Supabase Dashboard → Authentication → Rate Limits, you can adjust limits
- Default: 30 requests per hour per IP

## Rate Limiting Configuration (Optional)

To remove or increase rate limits:

1. Go to Supabase Dashboard → Authentication → Rate Limits
2. Adjust these settings:
   - **Email Sign-In Rate Limit**: Increase from 30/hour to 100/hour
   - **OTP Rate Limit**: Increase from 30/hour to 100/hour
3. Save changes

**Note:** For development, you can temporarily disable rate limiting, but keep it enabled for production.

## Verify Configuration

Run this checklist:

- [ ] Redirect URLs added to Supabase (including `/auth/callback`)
- [ ] Site URL set to `http://localhost:3000`
- [ ] Admin email in `NEXT_PUBLIC_ADMIN_EMAILS` env variable
- [ ] Supabase URL and keys in `.env` file
- [ ] Development server running (`npm run dev`)
- [ ] Browser cookies enabled
- [ ] Email provider configured in Supabase (check Authentication → Providers → Email)

## Testing Commands

```bash
# Start development server
npm run dev

# Test the auth flow
# 1. Visit http://localhost:3000/login
# 2. Enter admin email
# 3. Check email for magic link
# 4. Click link
# 5. Should redirect to /admin

# Debug session
# Visit http://localhost:3000/auth/debug
```

## Email Configuration (If emails not sending)

1. Go to Supabase Dashboard → Authentication → Email Templates
2. Check "Enable Custom SMTP" if you want to use your own email service
3. Or use Supabase's default email service (works for development)

**Note:** Supabase's default email service may have delays. For production, configure custom SMTP.
