## UW Groups API -> Fabman Resource Mappings

This is a document which contains a mapping of API calls we're using to transform resources between UW Groups API and Fabman's API.

UW Groups API Endpoint:  
https://iam-ws.u.washington.edu:7443/group_sws/v1/  
Fabman API Endpoint:  
https://fabman.io/api/v1/

## Resources
### Adding members
#### [Add member to UW Group](https://wiki.cac.washington.edu/display/infra/Groups+WebService+Add+Member)
`PUT| (root)/group/{group_id}/member/{member_id}`
#### [Add member to Fabman](https://fabman.io/api/v1/documentation#!/members/postMembers)
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
### Getting Groups
#### [Get UW Group]
`GET| (root)/group/{group_id}
The group_id can be a group name (cn) or a regid.`
  **Subgroups?**
  **descriptions?**
#### [Get Fabman Group]
`GET /members`
```
[
{
  "space": 0,
  "memberNumber": "string",
  "firstName": "string",
  "lastName": "string",
  "gender": "female",
  "dateOfBirth": "2018-12-01",
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
  "taxExempt": true,
  "hasBillingAddress": true,
  "requireUpfrontPayment": true,
  "upfrontMinimumBalance": 0,
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
  "id": 0,
  "account": 0,
  "state": "active",
  "stripeCustomer": "string",
  "allowLogin": false,
  "lockVersion": 0,
  "createdAt": "2018-12-01",
  "updatedAt": "2018-12-01",
  "updatedBy": 0,
  "lastActivity": {
    "id": 0,
    "at": "2018-12-01",
    "resource": {
      "id": 0,
      "name": "string",
      "state": "active"
    }
  },
  "_embedded": "string"
}
]
```

### Getting Administrators
#### [Get UW Groups Administrators]
#### [Get Fabman Administrators]
  **How are admins handled**
  * Administrator
    * Can edit members, equipment and packages.
    * Can configure your space: rename it, change opening hours and add holidays.
    * Can use any equipment without a package or training.
    * Can turn on equipiment while it's not connected to the internet.
    * Can add and remove other administrators.
  * Account owner
    * Has full control over your account.
    * Can add and remove other account owners.

## Transforms
### Get Members from UW Group and put them into Fabman
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
### Get UW Groups' Groups and put them into Fabman

### Get Administrators from UW Groups and put them into Fabman
