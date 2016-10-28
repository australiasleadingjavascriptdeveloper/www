var cpjax = require('cpjax'),
    crel = require('crel'),
    shuffle = require('shuffle-array'),
    mousetrail = require('./mousetrail'),
    australiasLeadingJavascriptDeveloperName = window.location.hash.slice(1).toLowerCase();

var membersUrl = 'https://api.github.com/orgs/australiasleadingjavascriptdeveloper/public_members';

function renderMembers(members){
    var membersElement = document.querySelector('.members');

    var randomizedMembers = shuffle(members, {copy: true});

    crel(membersElement,
        crel('p', 'Made by this developer'),
        randomizedMembers.map(function(member){
            var isAustraliasLeadingJavascriptDeveloper = member.login.toLowerCase() === australiasLeadingJavascriptDeveloperName;
            return crel('a', {href: member.html_url, class:'member' + (isAustraliasLeadingJavascriptDeveloper ? ' leading' : '')},
                crel('img', {src: member.avatar_url}),
                crel('h3', member.login)
            );
        })
    );
}

window.addEventListener('load', function(){
    cpjax(
        {
            url: membersUrl,
            dataType: 'json'
        },
        function(error, members){
            if(error){
                return; // ¯\_(ツ)_/¯
            }

            mousetrail.attach(members);
            renderMembers(members);
        }
    );
});
