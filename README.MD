# README


Notes about using amplify:
    -Currently the aws account is still in the SMS sandbox.
    -We need to register our brand in order to get a phone number 🙄 




## AWS AppSync Notes
Generate codegen
You can use the Amplify toolchain to autogenerate strongly-typed client SDKs for your GraphQL API with its “codegen” feature. Learn more. 
To generate code files that you can use in your application, follow the steps below.

Go to your frontend app's root directory and run the following command in the Terminal:

`$ npx @aws-amplify/cli codegen add --apiId fck7q2wbrjcmtmlhm6zf54i4hi --region us-east-1`


This will download your API's schema and by default generate client helper code into the src/graphql folder. After every API deployment, you can rerun the following command to generate updated GraphQL statement and types:

`$ npx @aws-amplify/cli codegen`


## Steps necessary after a full backend redeploy.
### Update constants file with correct urls (in prod this should probably happen via API call -> getting the urls that is)

### [InvalidIdentityPoolConfigurationException: Invalid identity pool configuration. Check assigned IAM roles for this pool.]

This is likely caused by a full redploy of the backend. You wil need either need to create a new AuthenticatedRole in the BPIdentityPool or attach the existing role and update "cognito-identity.amazonaws.com:aud". There are some additional tips here to get started:
https://stackoverflow.com/questions/44043289/aws-invalid-identity-pool-configuration-check-assigned-iam-roles-for-this-poo