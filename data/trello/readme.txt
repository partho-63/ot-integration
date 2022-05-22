==================================================
 ---------------- OT_INTEGRATION ----------------
==================================================

--------------------------------------------------
=== Authorize a User ===
--------------------------------------------------

<script src="https://code.jquery.com/jquery-3.3.1.min.js" crossorigin="anonymous"></script>
<script src="https://api.trello.com/1/client.js?key=${trelloApiKey}"></script>

<script>
  let trelloToken;
  const loggedInUserEmail = `<%= loggedInUser.email %>`;

  window.Trello.authorize({
      // type: 'popup',
      name: 'Name of the Application',
      scope: {
          read: 'true',
          write: 'true'
      },
      expiration: 'never',
      success: function() {

          trelloToken = Trello.token();

          let response = window.Trello.rest('GET', `tokens/${trelloToken}/member`, {}, membershipIdSuccess, membershipIdError);

      },
      error: function() {
          fetch("/trello/authorize", {
              method: "POST",
              body: {
                  error: true
              }
          });
      }
  });

  let membershipIdSuccess = function(data) {

      const memberId = data.id;

      const trelloData = JSON.stringify({
          trelloToken: trelloToken,
          userEmail: loggedInUserEmail,
          memberId: memberId,
          error: false
      });

      fetch("/trello/authorize", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: trelloData
      });
  };

  let membershipIdError = function(err) {
      console.log(err);
  };
</script>



--------------------------------------------------
=== Import Trello Token of a User ===
--------------------------------------------------
Request:
    url: /trello/authorize
    method: 'POST'
    body: {
        trelloToken: token got after authorizing the user,
        userEmail: email of the user,
        memberId: Trello Member Id of the User,
        error: true if authentication call was successful else false
    }

Response:
    -> Checks if any user is logged in
    -> Saves Trello Token, Member ID against a user
    -> Returns to Trello Home Page



--------------------------------------------------
=== Import Trello Data of a User ===
--------------------------------------------------
Request:
    url: /trello/import
    method: 'GET'

Response:
    -> Checks if any user is logged in
    -> Checks if Trello token is saved against the user.
    -> Imports Trello Data of a User and saves them.
        -> Imports Workspaces for the Member
        -> Imports Boards for each Workspace
        -> Imports Lists for each Board
        -> Imports Tasks for each List
    -> Returns to Trello Home Page





==================================================
 -------------------- TRELLO --------------------
==================================================

--------------------------------------------------
=== Get Workspaces of a Member ===
--------------------------------------------------
Request:
    url: https://api.trello.com/1/members/${trelloMemberId}/organizations?key=${trelloApiKey}&token=${trelloToken}
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }

Response:
[
    {
      "id": "621c9b0a6de71663f077d395",
      "name": "testone116",
      "credits": [],
      "creationMethod": null,
      "displayName": "Test One",
      "desc": "",
      "descData": {
        "emoji": {}
      },
      "domain": null,
      "idBoards": [
        "621c9b7e2ff7f8738d95dd7f",
        "621f48e20c70e41d333ebada",
        "621f4a8dd187e077513ddd39"
      ],
      "idEnterprise": null,
      "idMemberCreator": "5923c455de8422c03b298da5",
      "invited": false,
      "invitations": [],
      "limits": {
        "orgs": {
          "totalMembersPerOrg": {
            "status": "ok",
            "disableAt": 4000,
            "warnAt": 3200
          },
          "freeBoardsPerOrg": {
            "status": "warn",
            "disableAt": 10,
            "warnAt": 3,
            "count": 3
          }
        }
      },
      "memberships": [
        {
          "idMember": "5923c455de8422c03b298da5",
          "memberType": "admin",
          "unconfirmed": false,
          "deactivated": false,
          "id": "621c9b0a6de71663f077d397"
        }
      ],
      "prefs": {
        "permissionLevel": "private",
        "orgInviteRestrict": [],
        "boardInviteRestrict": "any",
        "externalMembersDisabled": false,
        "associatedDomain": null,
        "googleAppsVersion": 1,
        "boardVisibilityRestrict": {
          "private": "org",
          "org": "org",
          "enterprise": "org",
          "public": "org"
        },
        "boardDeleteRestrict": {
          "private": "org",
          "org": "org",
          "enterprise": "org",
          "public": "org"
        },
        "attachmentRestrictions": null
      },
      "powerUps": [],
      "products": [],
      "pendingProduct": null,
      "billableMemberCount": 1,
      "activeBillableMemberCount": 1,
      "billableCollaboratorCount": 0,
      "url": "https://trello.com/testone116",
      "website": null,
      "logoHash": null,
      "logoUrl": null,
      "premiumFeatures": [
        "additionalBoardBackgrounds",
        "additionalStickers",
        "customBoardBackgrounds",
        "customEmoji",
        "customStickers",
        "plugins"
      ],
      "promotions": [],
      "enterpriseJoinRequest": {},
      "standardVariation": null,
      "availableLicenseCount": null,
      "maximumLicenseCount": null,
      "ixUpdate": "6",
      "teamType": "engineering-it"
    }
]



--------------------------------------------------
=== Get Boards of an Workspace ===
--------------------------------------------------
Request:
    url: https://api.trello.com/1/organizations/${trelloWorkspaceId}/boards?key=${trelloApiKey}&token=${trelloToken}
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }

Response:
[
    {
      "id": "621f48e20c70e41d333ebada",
      "name": "AZIM_ERP",
      "desc": "",
      "descData": null,
      "closed": false,
      "dateClosed": null,
      "idOrganization": "621c9b0a6de71663f077d395",
      "idEnterprise": null,
      "limits": null,
      "pinned": false,
      "starred": false,
      "url": "https://trello.com/b/SJMLp7lv/azimerp",
      "prefs": {
        "permissionLevel": "org",
        "hideVotes": false,
        "voting": "disabled",
        "comments": "members",
        "invitations": "members",
        "selfJoin": true,
        "cardCovers": true,
        "isTemplate": false,
        "cardAging": "regular",
        "calendarFeedEnabled": false,
        "hiddenPluginBoardButtons": [],
        "background": "blue",
        "backgroundColor": "#0079BF",
        "backgroundImage": null,
        "backgroundImageScaled": null,
        "backgroundTile": false,
        "backgroundBrightness": "dark",
        "backgroundBottomColor": "#0079BF",
        "backgroundTopColor": "#0079BF",
        "canBePublic": true,
        "canBeEnterprise": true,
        "canBeOrg": true,
        "canBePrivate": true,
        "canInvite": true
      },
      "shortLink": "SJMLp7lv",
      "subscribed": false,
      "labelNames": {
        "green": "",
        "yellow": "",
        "orange": "",
        "red": "",
        "purple": "",
        "blue": "",
        "sky": "",
        "lime": "",
        "pink": "",
        "black": ""
      },
      "powerUps": [],
      "dateLastActivity": "2022-03-06T06:13:12.266Z",
      "dateLastView": "2022-04-02T11:32:54.652Z",
      "shortUrl": "https://trello.com/b/SJMLp7lv",
      "idTags": [],
      "datePluginDisable": null,
      "creationMethod": null,
      "ixUpdate": null,
      "templateGallery": null,
      "enterpriseOwned": false,
      "idBoardSource": null,
      "premiumFeatures": [
        "additionalBoardBackgrounds",
        "additionalStickers",
        "customBoardBackgrounds",
        "customEmoji",
        "customStickers",
        "plugins"
      ],
      "idMemberCreator": "5923c455de8422c03b298da5",
      "memberships": [
        {
          "idMember": "5923c455de8422c03b298da5",
          "memberType": "admin",
          "unconfirmed": false,
          "deactivated": false,
          "id": "621f48e20c70e41d333ebadc"
        },
        {
          "idMember": "5590d9af0fbd86334d5c8623",
          "memberType": "normal",
          "unconfirmed": false,
          "deactivated": false,
          "id": "62244ecb6558b98fea0e9b81"
        }
      ]
    }
]



--------------------------------------------------
=== Get Lists of an Board ===
--------------------------------------------------
Request:
    url: https://api.trello.com/1/boards/${trelloBoardId}/lists?key=${trelloApiKey}&token=${trelloToken}
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }

Response:
[
    {
      "id": "62244f16207cdc7edaf0d533",
      "name": "Accounts",
      "closed": false,
      "idBoard": "621f48e20c70e41d333ebada",
      "pos": 65535,
      "subscribed": false,
      "softLimit": null
    }
]



--------------------------------------------------
=== Get Tasks of an List ===
--------------------------------------------------
Request:
    url: https://api.trello.com/1/boards/${trelloBoardId}/lists?key=${trelloApiKey}&token=${trelloToken}
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }

Response:
[
    {
      "id": "62244f2eaab26247a0a045c8",
      "badges": {
        "attachmentsByType": {
          "trello": {
            "board": 0,
            "card": 0
          }
        },
        "location": false,
        "votes": 0,
        "viewingMemberVoted": false,
        "subscribed": false,
        "fogbugz": "",
        "checkItems": 0,
        "checkItemsChecked": 0,
        "checkItemsEarliestDue": null,
        "comments": 0,
        "attachments": 0,
        "description": false,
        "due": null,
        "dueComplete": false,
        "start": null
      },
      "checkItemStates": null,
      "closed": false,
      "dueComplete": false,
      "dateLastActivity": "2022-03-06T06:05:34.768Z",
      "desc": "",
      "descData": {
        "emoji": {}
      },
      "due": null,
      "dueReminder": null,
      "email": null,
      "idBoard": "621f48e20c70e41d333ebada",
      "idChecklists": [],
      "idList": "62244f16207cdc7edaf0d533",
      "idMembers": [],
      "idMembersVoted": [],
      "idShort": 1,
      "idAttachmentCover": null,
      "labels": [],
      "idLabels": [],
      "manualCoverAttachment": false,
      "name": "Dual Currency",
      "pos": 65535,
      "shortLink": "MP1GDWCt",
      "shortUrl": "https://trello.com/c/MP1GDWCt",
      "start": null,
      "subscribed": false,
      "url": "https://trello.com/c/MP1GDWCt/1-dual-currency",
      "cover": {
        "idAttachment": null,
        "color": null,
        "idUploadedBackground": null,
        "size": "normal",
        "brightness": "dark",
        "idPlugin": null
      },
      "isTemplate": false,
      "cardRole": null
    }
]