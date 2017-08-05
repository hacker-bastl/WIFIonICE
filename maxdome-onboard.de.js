window.addEventListener('load', function() {
  var request = new XMLHttpRequest();
  request.addEventListener('load', function() {
    var response = JSON.parse(request.responseText);
    var output = document.createElement('pre');
    document.body.appendChild(output);
    output.textContent = JSON.stringify(response, null, 4);
  });
  request.open('GET', '//skidbladnir.maxdome-onboard.de/api/v1/info/trainenvironmentdata');
  request.send(null);
});
