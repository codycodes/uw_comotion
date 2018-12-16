## UW Groups API -> Fabman Resource Mappings

This is a document which contains a mapping of API calls we're using to transform resources between UW Groups API and Fabman's API.

## General Information
### Root URLS
UW Groups API Endpoint:  
https://iam-ws.u.washington.edu/group_sws/v3
https://iam-ws.u.washington.edu/group_sws/v3 

Fabman API Endpoint:  
https://fabman.io/api/v1/ 

### API Docs:
[UW Groups API v3](https://iam-tools.u.washington.edu/apis/gws/) 
[Fabman API v1](https://fabman.io/api/v1/documentation#/)

### API Docs:
[UW Groups API v3](https://iam-tools.u.washington.edu/apis/gws/)
[Fabman API v1](https://fabman.io/api/v1/documentation#/)

### Accessing API
TODO: adapt this to the language that we're going to use
`curl -u 'token:password' https://fabman.io/api/v1/members`
need to get api token by calling members to get memberId

## Resources


### Getting API token
Have to create it first by POSTing the target member ID to:

POST `/api-keys`

```
{
  "label": "azure-function-12-16-18",
  "member": memberId
}
```

GET `/api-keys/{id}/token` - response back is the token for Fabman
{id} will be given after POSTing

NOTE: API keys don’t expire automatically. If you ever need to invalidate an API key, you can simply delete it.

### Adding members
#### [Add member to UW Group](https://iam-tools.u.washington.edu/apis/gws/#/Membership/putMember)
PUT `/group/{groupid}/member/{memberid}` - Used to put one or multiple members into the UW Group
#### [Add member to Fabman](https://fabman.io/api/v1/documentation#!/members/postMembers)
POST `/members` - Overall JSON data looks like the following. See [Get Members from UW Group and put them into Fabman](#Get-Members-from-UW-Group-and-put-them-into-Fabman) for the actual data we'll be passing in
```
{
=======
### Adding members
#### [Add member to UW Group](https://iam-tools.u.washington.edu/apis/gws/#/Membership/putMember)
PUT `/group/{groupid}/member/{memberid}` - Used to put one or multiple members into the UW Group
#### [Add member to Fabman](https://fabman.io/api/v1/documentation#!/members/postMembers)
POST `/members` - Overall JSON data looks like the following. See [Get Members from UW Group and put them into Fabman](#Get-Members-from-UW-Group-and-put-them-into-Fabman) for the actual data we'll be passing in
```
{
  "space": 0,
  "memberNumber": "string",
  "firstName": "string",
  "lastName": "string",
  "gender": "female",
  "dateOfBirth": "2018-12-06",
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
  "createdAt": "2018-12-06",
  "updatedAt": "2018-12-06",
  "updatedBy": 0
}
```

### Getting Groups
#### [Get UW Group](https://iam-tools.u.washington.edu/apis/gws/#/Groups/getGroup)
GET `/group/{groupid}` - Gives a lot of information including direct/indirect members and group admins
```
{
  "schemas": [
    "urn:mace:washington.edu:schemas:groups:1.0"
  ],
  "meta": {
    "resourceType": "group",
    "version": "v3.0",
    "regid": "string",
    "id": "string",
    "selfRef": "https://iam-ws.u.washington.edu/group_sws/v3/group/a1681c3fcba3f54f759e6c9432004381",
    "memberRef": "https://iam-ws.u.washington.edu/group_sws/v3/group/a1681c3fcba3f54f759e6c9432004381/member/",
    "timestamp": 1214343146201
  },
  "data": {
    "regid": "a1681c3fcba3f54f759e6c9432004381",
    "name": "u_fox_browser6",
    "displayName": "Fox's test group",
    "description": "This is a general purpose group for testing various Group Service functionality.",
    "created": 1214343146000,
    "lastModified": 1277499258870,
    "lastMemberModified": 1455304388228,
    "contact": "fox",
    "authnfactor": 0,
    "classification": "u",
    "dependsOn": "uw_employee",
    "gid": 12001,
    "affiliates": [
      {
        "name": "google",
        "status": "active"
      }
    ],
    "course": {
      "quarter": "win",
      "year": 2017,
      "curriculum": "phys",
      "number": 121,
      "section": "a",
      "sln": 19029,
      "instructors": [
        {
          "type": "uwnetid",
          "name": "Joe Average",
          "id": "joeuser"
        }
      ]
    },
    "admins": [
      {
        "type": "group",
        "name": "Admins of the zyzz school",
        "id": "x_zyzz_admins"
      }
    ],
    "updaters": [
      {
        "type": "eppn",
        "name": "Ray G. Biv",
        "id": "raybiv@somestate.edu"
      }
    ],
    "creators": [
      {
        "type": "uwnetid",
        "name": "Roy G. Biv",
        "id": "rgbiv99"
      },
      {
        "type": "uwnetid",
        "name": "J. Average",
        "id": "joeuser"
      }
    ],
    "readers": [
      {
        "type": "uwnetid",
        "id": "string",
        "name": "string"
      }
    ],
    "optins": [
      {
        "type": "uwnetid",
        "id": "string",
        "name": "string"
      }
    ],
    "optouts": [
      {
        "type": "uwnetid",
        "id": "string",
        "name": "string"
      }
    ]
  }
}
```
#### [Get Fabman Group](https://fabman.io/api/v1/documentation#!/members/getMembers)
GET `/members` - See the list inside of the `uw_groups` key in the metadata; we might need to change or just filter this to see the correct members
```
{
  "id": 14590,
  "memberNumber": "cody.codes",
  "firstName": "Cody",
  "lastName": "Gagnon",
  "dateOfBirth": null,
  "emailAddress": "me@domain.com",
  "company": null,
  "phone": null,
  "address": null,
  "notes": "",
  "state": "active",
  "lockVersion": 7,
  "createdAt": "2018-12-05T16:12:23.627Z",
  "updatedAt": "2018-12-07T00:59:38.397Z",
  "updatedBy": 14590,
  "address2": null,
  "city": null,
  "zip": null,
  "countryCode": null,
  "region": null,
  "account": 288,
  "space": 288,
  "taxExempt": false,
  "hasBillingAddress": false,
  "billingFirstName": null,
  "billingLastName": null,
  "billingCompany": null,
  "billingAddress": null,
  "billingAddress2": null,
  "billingCity": null,
  "billingZip": null,
  "billingCountryCode": null,
  "billingRegion": null,
  "billingInvoiceText": null,
  "gender": null,
  "stripeCustomer": null,
  "requireUpfrontPayment": false,
  "upfrontMinimumBalance": "0.00",
  "metadata": {
    "uw_groups": {
      "uw_comotion_makerspace": true,
      "uw_comotion_lasercutter": true
    }
  },
  "allowLogin": true
}
```

### Getting Administrators
#### [Get UW Groups Administrators](https://iam-tools.u.washington.edu/apis/gws/#/Groups/getGroup)
GET `/group/{groupid}` - See (Get UW Group)[#get-UW-Group]; we just need to filter the json response for everything under the list with the key `"admins"`
#### [Get Fabman Administrators](https://fabman.io/api/v1/documentation#!/members/getMembers)
GET `members?privileges=admin` - See (Get Fabman Group)[#Get-Fabman-Group] for examples; just returns the admins inside of Fabman

## Transforms
### Get Members from UW Group and put them into Fabman

TODO: Figure out the data that we currently have access to fill in (and anything else we'd need access to fill in) and create the JSON file as above; see the example below

#### Uses [Adding members](#adding-members) resources

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
