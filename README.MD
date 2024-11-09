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