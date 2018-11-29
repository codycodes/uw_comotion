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
Or use UW Group GUI. 

#### [Add member to Fabman](https://fabman.io/api/v1/documentation#!/members/postMembers)
`PUT (root)/members` 
```
{
id:1,
body:{
   "memberNumber": "NETID",
   "note":"member" 
  }
}

```
Basic member: `"note":"member" `
Laser Cutter: `"note":"member, lasercutter"`
WoodShop: `"note":"member,woodshop"`

### Getting Members
#### [Get UW Group]
`GET (root)/group/{group_id}/effective-member/`
Return all members (netids) in the group

`GET (root)/group/{group_id}/effective-member/NETID`
Return True of False whether the member in the group

#### [Get Fabman Group]
`GET /members/`
We can use Get /members/ with search queries to look for a user with certain access.

### Getting Administrators
#### [Get UW Groups Administrators](https://wiki.cac.washington.edu/display/infra/Groups+WebService+Get+Group)
#### [Get Fabman Administrators]
Use `Get /member/{id}/previlidges` to get whether they are member or admin.

## Transforms
### Get Members from UW Group and put them into Fabman

```
{
  "memberNumber": "string", UW NETID
  "note":"member" 
}
```
First, add all members from `uw_comotion_makerspace`,
Then update the users in `uw_comotion_makerspace_lasercutter`, update the note filed. 
The last would update the note filed of the members in `uw_comotion_makerspace_woodshop`
### Get Administrators from UW Groups and put them into Fabman
All Staff and Mentors should have the admin. We dont need to transfer.
