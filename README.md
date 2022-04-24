# Free Time
This app will look for calendars which are free(doesn't have any events on their calendar) between given time frame.

## Getting Started
Create a .env file with these fields:
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CLIENT_REDIRECT_URL=https://{YOUR_DOMAIN}/api/auth/callback/google
REDIRECT_URL=
NEXTAUTH_SECRET=
```
`GOOGLE_CLIENT_REDIRECT_URL` must always have the path `/api/auth/callback/google`, see why at https://next-auth.js.org/providers/google#configuration

For `NEXTAUTH_SECRET`, see https://next-auth.js.org/configuration/options#secret

And run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

