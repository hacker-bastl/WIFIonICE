// https://vuejs.org/v2/guide/mixins.html
const omboardVue = Vue.extend({
  created: function() {
    this.load();
  },
  methods: {
    load: function() {
      var random_name = String(Math.random()).slice(-8);
      var url = this.url + '?callback=' + random_name;
      var callback = window[random_name] = function(data) {
        console.log(data);
        delete(window[random_name]);
      };
      var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', url);
      document.head.appendChild(script);
    },
  }
});
