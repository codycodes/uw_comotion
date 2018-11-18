## UW Groups API -> Fabman Resource Mappings

This is a document which contains a mapping of API calls we're using to transform resources between UW Groups API and Fabman's API.

UW Groups API Endpoint:  
https://iam-ws.u.washington.edu:7443/group_sws/v1/  
Fabman API Endpoint:  
https://fabman.io/api/v1/

## Adding members
### [Add member to UW Group](https://wiki.cac.washington.edu/display/infra/Groups+WebService+Add+Member)
`PUT| (root)/group/{group_id}/member/{member_id}`
### [Add member to Fabman](https://fabman.io/api/v1/documentation#!/members/postMembers)
`PUT (root)/members`
```
{
  "space": 0,
  "memberNumber": "string",
  "firstName": "string",
  "lastName": "string",
  "gender": "female",
  "dateOfBirth": "2018-11-18",
  "emailAddress": "string",
  "company": "string",
  "phone": "string",
  "address": "string",
  "address2": "string",
  "city": "string",
  "zip": "string",
  "countryCode": "string",
  "region": "string",
  "notes": "string",
  "billingFirstName": "string",
  "billingLastName": "string",
  "billingCompany": "string",
  "billingAddress": "string",
  "billingAddress2": "string",
  "billingCity": "string",
  "billingZip": "string",
  "billingCountryCode": "string",
  "billingRegion": "string",
  "billingInvoiceText": "string",
  "metadata": {},
  "createdAt": "2018-11-18",
  "account": 0,
  "state": "active",
  "taxExempt": false,
  "hasBillingAddress": false,
  "requireUpfrontPayment": false,
  "upfrontMinimumBalance": "0.00"
}
```
## Transforms

### Get Members from UW Group and Post to Fabman
TODO: Figure out the data that we currently have access to fill in (and anything else we'd need access to fill in) and create the JSON file as above; see the example below

```
{
  "space": 0,
  "memberNumber": "UW NetID",
  "firstName": "First Name from UW Groups API",
  "notes": "Added on Groups API on 10-31-18 (example from Groups API)",
  "account": 0
}
```
