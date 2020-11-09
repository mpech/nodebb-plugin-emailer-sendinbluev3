# NodeBB emailer via sendinblue v3 api

This repo implements the basic sendmail for sendinblue.

requirements:

It supposes you've setup your sendinblue account properly

## Installation

Install the plugin

    npm install https://github.com/mpech/nodebb-plugin-emailer-sendinbluev3

## Configuration

In the admin panel

Manage > Email

- Fill the fields: Email address / From name which you have configured on sendinblue beforehand
- Username is ignored
- Fill the api key as the password field
- **Save the changes**
- Only then test the sending mail (otherwise the test occurs with old saved settings)