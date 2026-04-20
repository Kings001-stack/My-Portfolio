# ✅ Email/Password Authentication Setup

## 🎯 Quick Setup (5 Minutes)

### Step 1: Add Users in Supabase Dashboard

1. **Go to Supabase Users Page:**

   ```
   https://supabase.com/dashboard/project/yijukldnxvgayzvjhdxe/auth/users
   ```

2. **Click "Add User" button** (green button, top right)

3. **Add First Admin User:**
   - Email: `ugwuemmanuelking@gmail.com`
   - Password: Choose a secure password (e.g., `Admin123!@#`)
   - ✅ **IMPORTANT:** Check "Auto Confirm User"
   - Click "Create User"

4. **Add Second Admin User:**
   - Email: `e93521365@gmail.com`
   - Password: Choose a secure password (e.g., `Admin123!@#`)
   - ✅ **IMPORTANT:** Check "Auto Confirm User"
   - Click "Create User"

### Step 2: Enable Email/Password Provider

1. **Go to Authentication Providers:**

   ```
   https://supabase.com/dashboard/project/yijukldnxvgayzvjhdxe/auth/providers
   ```

2. **Find "Email" provider** and make sure:
   - ✅ Enable email provider
   - ✅ Enable email confirmations (can disable for development)

3. **Click Save**

### Step 3: Test Login

1. **Start your dev server:**

   ```bash
   npm run dev
   ```

2. **Go to login page:**

   ```
   http://localhost:3000/login
   ```

3. **Enter credentials:**
   - Email: `ugwuemmanuelking@gmail.com`
   - Password: (the password you set in Step 1)

4. **Click "Sign In"**
   - Should redirect to `/admin` dashboard
   - You'll see a logout button (red icon) in the top right

---

## 🎨 What Changed

### Login Page (`/login`)

- ❌ Removed: Magic link (OTP) authentication
- ✅ Added: Email + Password fields
- ✅ Added: Better error messages
- ✅ Added: Direct redirect to admin on success

### Admin Page (`/admin`)

- ✅ Added: Logout button (red icon in header)
- ✅ Added: Automatic redirect to login on logout

### Middleware (`/middleware.ts`)

- ✅ Already configured to check session
- ✅ Protects `/admin` routes
- ✅ Redirects to `/login` if not authenticated

---

## 🔐 Security Notes

### Password Requirements

When creating users in Supabase, use strong passwords:

- Minimum 8 characters
- Mix of uppercase, lowercase, numbers, symbols
- Example: `MySecure123!@#`

### Admin Email Verification

The middleware checks if the logged-in email is in `NEXT_PUBLIC_ADMIN_EMAILS`:

```env
NEXT_PUBLIC_ADMIN_EMAILS=ugwuemmanuelking@gmail.com,e93521365@gmail.com
```

Only these emails can access `/admin` routes.

---

## 🧪 Testing Checklist

- [ ] Users created in Supabase with "Auto Confirm" checked
- [ ] Email provider enabled in Supabase
- [ ] Dev server running (`npm run dev`)
- [ ] Can login at `/login` with credentials
- [ ] Redirected to `/admin` after login
- [ ] Can see admin dashboard
- [ ] Logout button works (red icon)
- [ ] After logout, redirected to `/login`
- [ ] Cannot access `/admin` without logging in

---

## 🐛 Troubleshooting

### "Invalid email or password"

- **Check:** Email is exactly as entered in Supabase
- **Check:** Password is correct (case-sensitive)
- **Check:** User has "Auto Confirm" enabled in Supabase

### "Unauthorized" or redirected to login

- **Check:** Email is in `NEXT_PUBLIC_ADMIN_EMAILS` in `.env`
- **Check:** Session is active (visit `/auth/debug` to check)
- **Check:** Cookies are enabled in browser

### Can't see logout button

- **Solution:** Clear browser cache and refresh
- **Check:** You're on the `/admin` page

### Session expires quickly

- **Check:** Supabase session settings in Dashboard → Authentication → Settings
- **Default:** Sessions last 1 hour, refresh tokens last 30 days

---

## 📝 User Management

### To Add More Admin Users:

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User"
3. Enter email and password
4. ✅ Check "Auto Confirm User"
5. Add email to `NEXT_PUBLIC_ADMIN_EMAILS` in `.env`
6. Restart dev server

### To Change Password:

1. Go to Supabase Dashboard → Authentication → Users
2. Find the user
3. Click "..." menu → "Reset Password"
4. Enter new password
5. Click "Update User"

### To Delete User:

1. Go to Supabase Dashboard → Authentication → Users
2. Find the user
3. Click "..." menu → "Delete User"
4. Confirm deletion

---

## ✨ Features

- ✅ Simple email/password login
- ✅ No email verification needed (auto-confirm)
- ✅ Session persistence across page refreshes
- ✅ Logout functionality
- ✅ Protected admin routes
- ✅ Clean error messages
- ✅ No rate limiting issues
- ✅ Works immediately after setup

---

## 🚀 Ready to Go!

Once you've completed Steps 1-3 above, your authentication is fully working!

**Login URL:** http://localhost:3000/login
**Admin URL:** http://localhost:3000/admin
**Debug URL:** http://localhost:3000/auth/debug (to check session status)
