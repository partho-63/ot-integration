==================================================
 ---------------- OT_INTEGRATION ----------------
==================================================

--------------------------------------------------
=== Retrieve authorization code from the user ===
--------------------------------------------------
Request: 
  url: https://app.clickup.com/api?client_id=${client_id}&redirect_uri=${redirect_uri}

Response:
  Redirected to redirect_url with ${code} as a parameter



--------------------------------------------------
=== Import ClickUp accessToken of an User ===
--------------------------------------------------
Request:
    url: /clickUp/accessToken
    method: 'POST'
    body: {
        clientId: clientId,
        clientSecret: clientSecret,
        code: code
    }

Response:
    -> Checks if any user is logged in
    -> Get the user accessToken
    -> Saves clickUp accessToken against an user
    -> Returns to ClickUp Home Page



--------------------------------------------------
=== Get the user accessToken ===
--------------------------------------------------
Request:
  url: https://api.clickup.com/api/v2/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}
  method: 'POST'

Response: 
  {
    "access_token": "accessToken"
  }



--------------------------------------------------
=== Import ClickUp Data of an User ===
--------------------------------------------------
Request:
    url: /clickup/import
    method: 'GET'

Response:
    -> Checks if any user is logged in
    -> Checks if ClickUp accessToken is saved against the user.
    -> Imports Trello Data of a User and saves them.
        -> Imports Workspaces for the Member
        -> Imports Spaces for each Workspace
        -> Imports Folders for each Space
        -> Imports Lists for each Folder and Lists without Folder
        -> Imports Tasks for each List
        -> Imports SubTasks for each Task
    -> Returns to ClickUp Home Page





==================================================
 ------------------- ClickUp -------------------
==================================================

--------------------------------------------------
=== Get Workspaces of a Member ===
--------------------------------------------------
Request:
    url: https://api.clickup.com/api/v2/team
    method: 'GET',
    headers: {
        Authorization: ${accessToken}
    }

Response:
{
        "teams": [
            {
                "id": "333",
                "name": "Team Name",
                "color": "#000000",
                "avatar": null,
                "members": [
                    {
                        "user": {
                            "id": 812,
                            "username": "John Doe",
                            "email": "john@example.com",
                            "color": "#FFFFFF",
                            "profilePicture": "https://attachments-public.clickup.com/profilePictures/812_nx1.jpg",
                            "initials": "JD",
                            "role": 2,
                            "custom_role": null,
                            "last_active": "1627098661091",
                            "date_joined": "1625720320357",
                            "date_invited": "1625720289021"
                        },
                        "invited_by": {
                            "id": 123,
                            "username": "Sam"
                            "color": "#FFFFFF",
                            "email": "sam@example.com"
                            "initials": "S"
                            "profilePicture": null
                        }
                    },
                    {
                        "user": {
                            "id": 185,
                            "username": "Sam",
                            "email": "sam@example.com",
                            "color": "#FFFFFF",
                            "profilePicture": null,
                            "initials": "S",
                            "role": 1,
                            "custom_role": null,
                            "last_active": "1627098661091",
                            "date_joined": "1625720320357",
                            "date_invited": "1625720289021"
                        }
                    }
                ]
            }
        ]
    }



--------------------------------------------------
=== Get Spaces of a Workspace ===
--------------------------------------------------
Request:
    url: https://api.clickup.com/api/v2/team/${clickUpWorkspaceId}/space?archived=false
    method: 'GET',
    headers: {
        Authorization: ${accessToken}
    }

Response:
{
  "spaces": [
    {
      "id": "790",
      "name": "Updated Space Name",
      "private": false,
      "statuses": [
        {
          "status": "to do",
          "type": "open",
          "orderindex": 0,
          "color": "#d3d3d3"
        },
        {
          "status": "complete",
          "type": "closed",
          "orderindex": 1,
          "color": "#6bc950"
        }
      ],
      "multiple_assignees": false,
      "features": {
        "due_dates": {
          "enabled": false,
          "start_date": false,
          "remap_due_dates": false,
          "remap_closed_due_date": false
        },
        "time_tracking": {
          "enabled": false
        },
        "tags": {
          "enabled": false
        },
        "time_estimates": {
          "enabled": false
        },
        "checklists": {
          "enabled": true
        },
        "custom_fields": {
          "enabled": true
        },
        "remap_dependencies": {
          "enabled": false
        },
        "dependency_warning": {
          "enabled": false
        },
        "portfolios": {
          "enabled": false
        }
      }
    },
    {
      "id": "791",
      "name": "Second Space Name",
      "private": false,
      "statuses": [
        {
          "status": "Open",
          "type": "open",
          "orderindex": 0,
          "color": "#d3d3d3"
        },
        {
          "status": "Closed",
          "type": "closed",
          "orderindex": 1,
          "color": "#6bc950"
        }
      ],
      "multiple_assignees": true,
      "features": {
        "due_dates": {
          "enabled": true,
          "start_date": false,
          "remap_due_dates": false,
          "remap_closed_due_date": false
        },
        "time_tracking": {
          "enabled": true
        },
        "tags": {
          "enabled": true
        },
        "time_estimates": {
          "enabled": true
        },
        "checklists": {
          "enabled": true
        }
      }
    }
  ]
}



--------------------------------------------------
=== Get Folders of a Space ===
--------------------------------------------------
Request:
    url: https://api.clickup.com/api/v2/space/${clickUpSpaceId}/folder?archived=false
    method: 'GET',
    headers: {
        Authorization: ${accessToken}
    }

Response:
{
  "folders": [
    {
      "id": "457",
      "name": "Updated Folder Name",
      "orderindex": 0,
      "override_statuses": false,
      "hidden": false,
      "space": {
        "id": "789",
        "name": "Space Name",
        "access": true
      },
      "task_count": "0",
      "lists": []
    },
    {
      "id": "458",
      "name": "Second Folder Name",
      "orderindex": 1,
      "override_statuses": false,
      "hidden": false,
      "space": {
        "id": "789",
        "name": "Space Name",
        "access": true
      },
      "task_count": "0",
      "lists": []
    }
  ]
}



--------------------------------------------------
=== Get Lists of a Folder ===
--------------------------------------------------
Request:
    url: https://api.clickup.com/api/v2/folder/${clickUpFolderId}/list?archived=false
    method: 'GET',
    headers: {
        Authorization: ${accessToken}
    }

Response:
{
  "lists": [
    {
      "id": "124",
      "name": "Updated List Name",
      "orderindex": 1,
      "content": "Updated List Content",
      "status": {
        "status": "red",
        "color": "#e50000",
        "hide_label": true
      },
      "priority": {
        "priority": "high",
        "color": "#f50000"
      },
      "assignee": null,
      "task_count": null,
      "due_date": "1567780450202",
      "start_date": null,
      "folder": {
        "id": "456",
        "name": "Folder Name",
        "hidden": false,
        "access": true
      },
      "space": {
        "id": "789",
        "name": "Space Name",
        "access": true
      },
      "archived": false,
      "override_statuses": false,
      "permission_level": "create"
    },
    {
      "id": "125",
      "name": "Second List",
      "orderindex": 1,
      "content": "Second List Content",
      "status": null,
      "priority": null,
      "assignee": null,
      "task_count": null,
      "due_date": null,
      "start_date": null,
      "folder": {
        "id": "456",
        "name": "Folder Name",
        "hidden": false,
        "access": true
      },
      "space": {
        "id": "789",
        "name": "Space Name",
        "access": true
      },
      "archived": false,
      "override_statuses": false,
      "permission_level": "create"
    }
  ]
}



--------------------------------------------------
=== Get Lists of a Space (without Folder) ===
--------------------------------------------------
Request:
    url: https://api.clickup.com/api/v2/space/${clickUpSpaceId}/list?archived=false
    method: 'GET',
    headers: {
        Authorization: ${accessToken}
    }

Response:
{
  "lists": [
    {
      "id": "124",
      "name": "Updated List Name",
      "orderindex": 1,
      "content": "Updated List Content",
      "status": {
        "status": "red",
        "color": "#e50000",
        "hide_label": true
      },
      "priority": {
        "priority": "high",
        "color": "#f50000"
      },
      "assignee": null,
      "task_count": null,
      "due_date": "1567780450202",
      "start_date": null,
      "folder": {
        "id": "457",
        "name": "hidden",
        "hidden": true,
        "access": true
      },
      "space": {
        "id": "789",
        "name": "Space Name",
        "access": true
      },
      "archived": false,
      "override_statuses": false,
      "permission_level": "create"
    },
    {
      "id": "125",
      "name": "Second List",
      "orderindex": 1,
      "content": "Second List Content",
      "status": null,
      "priority": null,
      "assignee": null,
      "task_count": null,
      "due_date": null,
      "start_date": null,
      "folder": {
        "id": "457",
        "name": "hidden",
        "hidden": true,
        "access": true
      },
      "space": {
        "id": "789",
        "name": "Space Name",
        "access": true
      },
      "archived": false,
      "override_statuses": false,
      "permission_level": "create"
    }
  ]
}



--------------------------------------------------
=== Get Tasks of a List ===
--------------------------------------------------
Request:
    url: https://api.clickup.com/api/v2/list/${clickUpListId}/task?archived=false&include_closed=true
    method: 'GET',
    headers: {
        Authorization: ${accessToken}
    }

Response:
{
    "tasks": [
        {
            "id": "9hx",
            "custom_id":null,
            "name": "New Task Name",
            "text_content": "New Task Description",
            "description": "New Task Description",
            "status": {
                "status": "Open",
                "color": "#d3d3d3",
                "orderindex": 0,
                "type": "open"
            },
            "orderindex": "1.00000000000000000000000000000000",
            "date_created": "1567780450202",
            "date_updated": "1567780450202",
            "date_closed": null,
            "creator": {
                "id": 183,
                "username": "John Doe",
                "color": "#827718",
                "profilePicture": "https://attachments-public.clickup.com/profilePictures/183_abc.jpg"
            },
            "assignees": [],
            "checklists": [],
            "tags": [],
            "parent": null,
            "priority": null,
            "due_date": null,
            "start_date": null,
            "time_estimate": null,
            "time_spent": null,
            "custom_fields": [
                {
                "id": "0a52c486-5f05-403b-b4fd-c512ff05131c",
                "name": "My Number field",
                "type": "checkbox",
                "type_config": {},
                "date_created": "1622176979540",
                "hide_from_guests": false,
                "value": "23",
                "required": true
                },
                {
                "id": "03efda77-c7a0-42d3-8afd-fd546353c2f5",
                "name": "My Text field",
                "type": "short_text",
                "type_config": {},
                "date_created": "1622176979540",
                "hide_from_guests": false,
                "value": "Text field input",
                "required": false
                },
                {
                "id": "f4d2a20d-6759-4420-b853-222dbe2589d5",
                "name": "My People",
                "type": "users",
                "type_config": {
                    "single_user": true,
                    "include_groups": true,
                    "include_guests": true,
                    "include_team_members": true
                },
                "date_created": "1618440378816",
                "hide_from_guests": false,
                "value": {
                    "id": 183,
                    "username": "John Doe",
                    "email": "john@example.com",
                    "color": "#7b68ee",
                    "initials": "JD",
                    "profilePicture": null
                },
                "required": false
                }
            ]
            "list": {
                "id": "123"
            },
            "folder": {
                "id": "456"
            },
            "space": {
                "id": "789"
            },
            "url": "https://app.clickup.com/t/9hx"
        },
        {
            "id": "9hz",
            "name": "Second task",
            "text_content": "New Task Description",
            "description": "New Task Description",
            "status": {
                "status": "Open",
                "color": "#d3d3d3",
                "orderindex": 0,
                "type": "open"
            },
            "orderindex": "2.00000000000000000000000000000000",
            "date_created": "1567780450202",
            "date_updated": "1567780450202",
            "date_closed": null,
            "creator": {
                "id": 183,
                "username": "John Doe",
                "color": "#827718",
                "profilePicture": "https://attachments-public.clickup.com/profilePictures/183_abc.jpg"
            },
            "assignees": [],
            "checklists": [],
            "tags": [],
            "parent": null,
            "priority": null,
            "due_date": null,
            "start_date": null,
            "time_estimate": null,
            "time_spent": null,
            "custom_fields": [
                {
                "id": "0a52c486-5f05-403b-b4fd-c512ff05131c",
                "name": "My Number field",
                "type": "checkbox",
                "type_config": {},
                "date_created": "1622176979540",
                "hide_from_guests": false,
                "value": "23",
                "required": true
                },
                {
                "id": "03efda77-c7a0-42d3-8afd-fd546353c2f5",
                "name": "My Text field",
                "type": "short_text",
                "type_config": {},
                "date_created": "1622176979540",
                "hide_from_guests": false,
                "value": "Text field input",
                "required": false
                },
                {
                "id": "f4d2a20d-6759-4420-b853-222dbe2589d5",
                "name": "My People",
                "type": "users",
                "type_config": {
                    "single_user": true,
                    "include_groups": true,
                    "include_guests": true,
                    "include_team_members": true
                },
                "date_created": "1618440378816",
                "hide_from_guests": false,
                "value": {
                    "id": 183,
                    "username": "John Doe",
                    "email": "john@example.com",
                    "color": "#7b68ee",
                    "initials": "JD",
                    "profilePicture": null
                },
                "required": false
                }
            ],
            "list": {
                "id": "123"
            },
            "folder": {
                "id": "456"
            },
            "space": {
                "id": "789"
            },
            "url": "https://app.clickup.com/t/9hz"
        }
    ]
}



--------------------------------------------------
=== Get SubTasks of a Task ===
--------------------------------------------------
Request:
    url: https://api.clickup.com/api/v2/task/${clickUpTaskId}/?include_subtasks=true
    method: 'GET',
    headers: {
        Authorization: ${accessToken}
    }

Response:
{
  "id": "9hx",
  "custom_id": null,
  "name": "Updated Task Name",
  "text_content": "New Task Description",
  "description": "New Task Description",
  "status": {
    "status": "in progress",
    "color": "#d3d3d3",
    "orderindex": 1,
    "type": "custom"
  },
  "orderindex": "1.00000000000000000000000000000000",
  "date_created": "1567780450202",
  "date_updated": "1567780450202",
  "date_closed": null,
  "creator": {
    "id": 183,
    "username": "John Doe",
    "color": "#827718",
    "profilePicture": "https://attachments-public.clickup.com/profilePictures/183_abc.jpg"
  },
  "assignees": [],
  "checklists": [],
  "tags": [],
  "parent": null,
  "priority": null,
  "due_date": null,
  "start_date": null,
  "time_estimate": null,
  "time_spent": null,
  "custom_fields": [
    {
      "id": "0a52c486-5f05-403b-b4fd-c512ff05131c",
      "name": "My Number field",
      "type": "checkbox",
      "type_config": {},
      "date_created": "1622176979540",
      "hide_from_guests": false,
      "value": "23",
      "required": true
    },
    {
      "id": "03efda77-c7a0-42d3-8afd-fd546353c2f5",
      "name": "My Text field",
      "type": "short_text",
      "type_config": {},
      "date_created": "1622176979540",
      "hide_from_guests": false,
      "value": "Text field input",
      "required": false
    },
    {
      "id": "f4d2a20d-6759-4420-b853-222dbe2589d5",
      "name": "My People",
      "type": "users",
      "type_config": {
        "single_user": true,
        "include_groups": true,
        "include_guests": true,
        "include_team_members": true
      },
      "date_created": "1618440378816",
      "hide_from_guests": false,
      "value": {
        "id": 183,
        "username": "John Doe",
        "email": "john@example.com",
        "color": "#7b68ee",
        "initials": "JD",
        "profilePicture": null
      },
      "required": false
    }
  ],
  "list": {
    "id": "123"
  },
  "folder": {
    "id": "456"
  },
  "space": {
    "id": "789"
  },
  "url": "https://app.clickup.com/t/9hx",
  "subtasks": [

  ]
}