// https://vuejs.org/v2/guide/mixins.html
const omboardVue = Vue.extend({
  created: function() {
    this.load();
    setInterval(this.load.bind(this), 1E4);
  },
  methods: {
    load: function() {
      var instance = this;

      var request = new XMLHttpRequest();
      request.addEventListener('load', function() {
        var searchKey = instance.url.split('/').pop().split('.').shift();
        var responseXML = request.responseXML || new DOMParser()
          .parseFromString(request.responseText, 'text/xml');
        var dataNodes = responseXML.querySelector(searchKey).childNodes;
        // TODO: deep recursion for connectivity data?
        Array.prototype.slice.call(dataNodes).forEach(function(node) {
          if (node.nodeType == 1) instance[node.nodeName] = node.textContent;
        });
      });
      request.open('GET', '//www.ombord.info' + instance.url);
      // request.open('GET', '/omboard/mock' + instance.url.slice(8) + '.xml');
      request.send(null);
    },
  },
});
