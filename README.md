## Step:01 | Starting Template: 
```
 npx express-generator --no-view --git ./
 ```
## Step:02 | Install Nodemon:
```
// This will be install as a dev dependancy.
npm install --save-dev nodemon
``` 
## Step:03 | Edit package.json:
- Edit the package.json file to support new syntax type
-> "type" : "module"
## Step:04 | Setup Eslint
```
npx eslint --init
```
## WorkFlow

**AuthRouter (Authentication & JWT)**

- `POST /auth/register` → Create a new user account (email, password, name).
- `POST /auth/login` → Login with email & password, return JWT token.
- `POST /auth/logout` → (Optional) Handle token blacklist/logout.
- `POST /auth/refresh` → (Optional) Get a new JWT if the old one is expired.

**UserRouter (User profile & management)**

- `GET /users/me` → Get current user’s profile (needs JWT).
- `PATCH /users/me` → Update profile info (name, email, password).
- `DELETE /users/me` → Delete own account.
- `GET /users` → (Admin only) List all users.
- `GET /users/:id` → (Admin only) Get a specific user by ID.

**SubscriptionRouter (Plans & Subscriptions)**

- __Plans (Admin)__
    - `POST /plans` → Create a new subscription plan (name, price, duration, features).
    - `GET /plans` → Get all available plans (public).
    - `PATCH /plans/:id` → Update a subscription plan.
    - `DELETE /plans/:id` → Delete a subscription plan.

- __Subscriptions (User)__
    - `POST /subscriptions` → Subscribe to a plan (user selects plan).
    - `GET /subscriptions/me` → Get the logged-in user’s subscription(s).
    - `PATCH /subscriptions/:id/cancel` → Cancel an active subscription.
    - `GET /subscriptions/status` → Check if the user has an active subscription.