# luncher-backend

luncher project backend server

#### Register

```
const newUser = {
    username: "", //(Unique) required
    password: "" // required
    name: "" // required

};

axios
    .post("https://luncher-1.herokuapp.com/api/auth/register", newUser)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    });
```

Successful Return

```
{
  "id": 4,
  "name": "school",
  "username": "school",
  "password": "$2a$10$282B/vpKtYZkWMGaKQliper.pE2V86tRHEVO8ASXD7JcoCbEX5Ruq"
}
```

#### Login

```
const creds = {
    username: "USERNAME",
    password: "PASSWORD",
}

axios
    .post("https://luncher-1.herokuapp.com/api/auth/login", creds)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    });
```

Successful Return

```
{
  "message": "Welcome username!",
  "token": "TOKEN"
}
```

#### get profile by id

```

axios
    .post("https://luncher-1.herokuapp.com/api/schools/profile/{id}")
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    });
```

Successful Return

```
{
    "id": 1,
    "name": "Lambda School",
    "address": "505 makebelieve Dr San Jose, CA 94345",
    "funding": 1,
    "balance": 10,
    "uid": "f467StrA0ZZ8MAPoe2zcDQk53hO1",
    "school_id": 1
}
```

#### make profile page

```
const creds = {
	name: "", // required
	address: '', // required
	funding: boolean, //required
	balance: 0,// set to zero by database
	uid: '', //required use uuid
	school_id: // used signed in info
}

axios
    .post("https://luncher-1.herokuapp.com/api/schools/profile", creds)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    });
```

Successful Return

```
{
  "id": 3,
  "name": "school 1",
  "address": "a address",
  "funding": 1,
  "balance": null,
  "uid": "shgksngsng",
  "school_id": 1
}
```

#### delete profile page

```


axios
    .delete(`https://luncher-1.herokuapp.com/api/schools/profile/${id}`)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    });
```

Successful Return

```
{
  1
}
```

#### update profile page

```
const creds = {
	name: "", // required
	address: '', // required
	funding: boolean, //required
	balance: 0,// set to zero by database
	uid: '', //required use uuid
	school_id: // used signed in info
}

axios
    .post(`https://luncher-1.herokuapp.com/api/schools/profile/${id}`, creds)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    });
```

Successful Return

```
{
  "id": 3,
  "name": "school 1",
  "address": "a address",
  "funding": 1,
  "balance": null,
  "uid": "shgksngsng",
  "school_id": 1
}
```
