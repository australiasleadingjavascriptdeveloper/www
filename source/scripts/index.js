var cpjax = require('cpjax'),
    crel = require('crel');

var membersUrl = 'https://api.github.com/orgs/australiasleadingjavascriptdeveloper/public_members';

function renderMembers(members){
    var membersElement = document.querySelector('.members');

    crel(membersElement,
        crel('p', 'Made by this developer'),
        members.map(function(member){
            return crel('a', {href: member.html_url, class:'member'},
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

            renderMembers(members);
        }
    );
});