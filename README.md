# AUTHENTICATE
>## Introduction
**AUTHENTICATE** is a modern authentication system to setup on a ___Node JS___ restful __API__.  
and this module support many authentication modes like :

- **Token authentication**
- **OAuth stands for Open Authorization**
    - ***Google Auth***
    - ***Facebook Auth*** 
    - ***Apple Auth***
    - 
>## Installing the itential packages :
First of all you need to install all the required dependencies to the latest versions ! so to do that you need to make a choice between using one of the two famous package managers ***yarn*** or ***npm*** :
__________________________________________________________
>#### Using **npm**
1. **Installing** the package __npm-check-updates__ globaly :

    ```
    $ npm i -g npm-check-updates
    ```
2. **usage**: in your project directory run:
   
    ```
    $ ncu -u
    $ npm install
    ```
And then you gonna have everythings installed upgraded to the latest versions.

>#### Using **yarn**

You can try this npm package **yarn-upgrade-all**. This package will remove every package in **package.json** and add it again which will update it to latest version.

1. **Installing** the package __yarn-upgrade-all__ globaly :

    ```
    $ npm install -g yarn-upgrade-all
    ```
2. **usage**: in your project directory run:
   
    ```
    $ yarn yarn-upgrade-all
    ```
And then you gonna have everythings installed upgraded to the latest versions.

_____________________________________________________________________________________

>## Setup environment variables :
In the root project directory create a new file **.env**.

```
$ touch .env
```
The environment variables required for the module to work properly are :
1. **PORT** : the port on which your server gonna run on.
2. **ENVIRONMENT** : in which enviroment your support only [**development** or  **production** ]
3. **DB_URI** : the database user connection URI
4. **CLIENT_DOMAIN** : the domain name of your frontEnd client 
5. **JWT_SECRET_ACOUNT_VAVALIDATION** : a secret key of your choice for the encryption of the token

for an exemple the **.env** file need to be like 
```
PORT= 
ENVIRONMENT= 
DB_URI= 
CLIENT_DOMAIN= 
JWT_SECRET_ACOUNT_VAVALIDATION=
```
