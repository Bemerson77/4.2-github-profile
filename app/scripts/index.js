var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');
var baseUrl = 'https://api.github.com';
var moment = require('moment');
var gitHubToken = require('./github-token.js').token;

if(typeof(gitHubToken) !== "undefined"){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + gitHubToken
    }
  });
}
// populates sidebar data
var source = $("#sidebar-template").html();
var template = handlebars.compile(source);
// populates repo tab


function fetchData(data){
  var userUrl = baseUrl + '/users/Bemerson77';
  var repoUrl = userUrl + '/repos';

  $.ajax(userUrl).done(function(data){

    var sortedData = {
      avatar: data.avatar_url,
      name: data.name,
      login: data.login,
      location: data.location,
      email: data.email.substring(0, 20) + "...",
      blog: data.blog.substring(0, 22) + "...",
      joined: data.created_at,
      followers: data.followers,
      following: data.following,
      starred: data.public_gists,
      html: data.html_url
    };
    console.log(sortedData);
    $('.js-sidebar-data').append(template(sortedData));
  });

  $.ajax(repoUrl).done(function(data){
    data.forEach(function(repoObjects){
      var repoData = {
        name: repoObjects.name,
        forks_count: repoObjects.forks_count,
        stargazers_count: repoObjects.stargazers_count,
        language: repoObjects.language,
        updated: repoObjects.updated_at
      };
      console.log(repoData);
    });

  });
}

fetchData();
