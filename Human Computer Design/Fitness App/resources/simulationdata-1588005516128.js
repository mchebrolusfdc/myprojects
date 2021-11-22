function initData() {
  jimData.variables["home"] = "";
  jimData.datamasters["home"] = [
    {
      "id": 1,
      "datamaster": "home",
      "userdata": {
        "Photo": "./images/cf109c95-28b6-4e05-ab37-0ff012605b96.png",
        "Input": "Diet"
      }
    },
    {
      "id": 2,
      "datamaster": "home",
      "userdata": {
        "Photo": "./images/e0f90704-827e-4589-989e-9bbdd6e03523.PNG",
        "Input": "Exercise"
      }
    },
    {
      "id": 3,
      "datamaster": "home",
      "userdata": {
        "Photo": "./images/727d7fc3-e65e-4bdf-a3d5-6937e19b51c0.PNG",
        "Input": "Sleep"
      }
    },
    {
      "id": 4,
      "datamaster": "home",
      "userdata": {
        "Photo": "./images/748efc93-d7ee-475c-9a39-a9c9c5800190.png",
        "Input": "Recipes"
      }
    },
    {
      "id": 5,
      "datamaster": "home",
      "userdata": {
        "Photo": "./images/ac7cdf67-1272-4d13-aa37-6808c6258731.PNG",
        "Input": "Reviews"
      }
    },
    {
      "id": 6,
      "datamaster": "home",
      "userdata": {
        "Photo": "./images/9d5c346a-0c23-4430-a94b-733574d5d519.PNG",
        "Input": "Create Groups"
      }
    }
  ];

  jimData.datamasters["users"] = [
    {
      "id": 1,
      "datamaster": "users",
      "userdata": {
        "User name": "user1",
        "Password": "1234"
      }
    },
    {
      "id": 2,
      "datamaster": "users",
      "userdata": {
        "User name": "user2",
        "Password": "password"
      }
    }
  ];

  jimData.isInitialized = true;
}