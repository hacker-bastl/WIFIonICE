// https://vuejs.org/v2/guide/mixins.html
const omboardVue = Vue.extend({
  created: function() {
    setInterval(this.getOmboardData.bind(this), 1E4);
    this.getOmboardData();
  },
  methods: {
    getOmboardData: function() {
      var instance = this; // TODO: smells!
      var request = new XMLHttpRequest();

      // TODO: "deep" recursion for connectivity data?
      request.addEventListener('load', function() {
        var searchKey = instance.apiUrl.split('/').pop();
        var dataNodes = request.responseXML.querySelector(searchKey).childNodes;
        Array.prototype.slice.call(dataNodes).forEach(function(node) {
          if (node.nodeType == 1) instance.apiData[node.nodeName] = node.textContent;
        });
      });

      // https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/readyState
      request.addEventListener('readystatechange', function() {
        instance.apiStatus = {
          0: 'started',
          1: 'opened',
          2: 'receiving',
          3: 'loading',
          4: request.statusText || 'error',
        }[request.readyState];
      });

      // https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/timeout
      request.addEventListener('timeout', function() {
        window.alert('connection timeout'); // TODO?
      });
      request.open('GET', instance.apiUrl);
      request.timeout = 3E4;
      request.send(null);
    },
  },
});
