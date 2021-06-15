# Casino1024

TFC DAW

Project made by 3 students as a final degree project 

The concept of the project consists on emulating a Casino game. 

In this case, very similar to what we know as Bingo, but with different features to give it a bit of personality. 

## Requeriments

To install Angular on your local system, you need [Nodejs](https://nodejs.org/en/about/releases/) & [npm](https://docs.npmjs.com/about-npm)

Then, install the Angular CLI

```
$ npm install -g @angular/cli
```

## Angular project installation 

Inside the Angular folder

```
$ npm i @angular-devkit/build-angular
$ ng update @angular/cli @angular/core 
```

Dependencies needed
```
$ npm i --save @ng-bootstrap/ng-bootstrap
$ npm i --save axios && ngx-cookie-service
$ npm i --save @angular/material @angular/cdk
$ npm i --save crypto-js
```
Just in case the project asks for jquery
```
$ npm i @types/jquery --save
$ npm i jquery --save
```
## Strapi installation

Inside the strapiCasino folder

```
$ npm install
```
Copy .tmp folder from Documentacion to strapiCasino folder, this one includes a db 

## Run Casino 1024

To run the casino is simple:

Angular folder
```
ng serve 
```
strapiCasino folder
```
npm run develop
```
**keep in mind these commands are only intended for the development of the application 

## Notes

Default ports are :4200 for Angular and :1337 for Strapi.

You can modify them in their respective configuration files.

#### strapi

strapiCasino/config/server.js/
```
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
```

#### angular 

casino1024/Angular/angular.json/
```
"serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
   "port" here
   "host": here
   "options": {
   "browserTarget": "Angular:build"
```

**remember that if you change strapi's default port you will need to change the url var inside the project
