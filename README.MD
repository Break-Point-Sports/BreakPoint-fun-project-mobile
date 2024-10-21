## Amplify

To create new amplify backend use, create an access key in the AWS console and use

`amplify init`

To add authentication to the application use

`amplify add auth`

`Manual configuration`
    
```
 Select the authentication/authorization services that you want to use: User Sign-Up, Sign-In, connected with AWS IAM controls 
(Enables per-user Storage features for images or other content, Analytics, and more)
 
 Provide a friendly name for your resource that will be used to label this category in the project: BreakPointAmplifyBackend
 
 Enter a name for your identity pool. BreakPointIdentityPool

 Allow unauthenticated logins? (Provides scoped down permissions that you can control via AWS IAM) No
 
 Do you want to enable 3rd party authentication providers in your identity pool? No
 
 Provide a name for your user pool: BreakPointUserPool
 
 Warning: you will not be able to edit these selections. 
 How do you want users to be able to sign in? Phone Number
 
 Do you want to add User Pool Groups? Yes

? Provide a name for your user pool group: BreakPointAuthenticatedUserGroup

? Do you want to add another User Pool Group No

✔ Sort the user pool groups in order of preference · BreakPointAuthenticatedUserGroup

 Do you want to add an admin queries API? No

 Multifactor authentication (MFA) user login options: ON (Required for all logins, can not be enabled later)

 For user login, select the MFA types: SMS Text Message

 Specify an SMS authentication message: 'Your BreakPoint authentication code is {####}.'

 Email based user registration/forgot password: Disabled (Uses SMS/TOTP as an alternative)

Please specify an SMS verification message: 'Thanks for signing up for BreakPoint! Your verification code is {####}.'

 Do you want to override the default password policy for this User Pool? Yes
 
 Enter the minimum password length for this User Pool: 8
 Select the password character requirements for your userpool: min 8 characters
 
 Warning: you will not be able to edit these selections. 
 What attributes are required for signing up? Phone Number (This attribute is not supported by Facebook, Login With Amaz
on, Signinwithapple.)

 Specify the app's refresh token expiration period (in days): 30

 Do you want to specify the user attributes this app can read and write? No

 Do you want to enable any of the following capabilities? 

 Do you want to use an OAuth flow? No

? Do you want to configure Lambda Triggers for Cognito? No

 ```

 `amplify push`

