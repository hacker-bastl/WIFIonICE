// https://vuejs.org/v2/guide/mixins.html
const omboardVue = Vue.extend({
  created: function() {
    this.load();
    setInterval(this.load, 1E4);
  },
  methods: {
    load: function() {
      var instance = this;

      var request = new XMLHttpRequest();
      request.addEventListener('load', function() {
        var searchKey = instance.url.split('/').pop();
        var dataNodes = request.responseXML || new DOMParser()
          .parseFromString(request.responseText, 'text/xml')
          .querySelector(searchKey).childNodes;
        // TODO: deep recursion for connectivity data
        Array.prototype.slice.call(dataNodes).forEach(function(node) {
          if (node.nodeType == 1) instance[node.nodeName] = node.textContent;
        });
        console.log(instance);
      });
      request.open('GET', '//www.ombord.info' + instance.url);
      request.send(null);
    },
  },
});
