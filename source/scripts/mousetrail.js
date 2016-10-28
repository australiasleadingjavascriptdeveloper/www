var crel = require('crel');

var Face = function(member) {
  this.x = 0;
  this.y = 0;
  this.node = crel('img', {src: member.avatar_url, class:'trail'});
  document.body.appendChild(this.node);
};

Face.prototype.draw = function() {
  this.node.style.left = this.x + "px";
  this.node.style.top = this.y + "px";
};

function draw(mouse, faces) {
  var x = mouse.x,
      y = mouse.y;

  faces.forEach(function(face, index, faces) {
    var nextFace = faces[index + 1] || faces[0];

    face.x = x;
    face.y = y;
    face.draw();
    x += (nextFace.x - face.x) * .6;
    y += (nextFace.y - face.y) * .6;
  });
}

function attach(members) {
  var mouse = {
    x: 0,
    y: 0
  };

  var faces = members.map(function(member) {
    return new Face(member);
  });

  addEventListener("mousemove", function(event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
  });

  function animate() {
    draw(mouse, faces);
    requestAnimationFrame(animate);
  }

  animate();
}

module.exports = {
  attach: attach
};
