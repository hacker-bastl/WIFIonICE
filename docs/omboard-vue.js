// https://vuejs.org/v2/guide/mixins.html
const omboardVue = Vue.extend({
  created: function() {
    this.load(this.url);
  },
  methods: {
    load: function(url) {
      var instance = this;
      var random_name = 'callback_' + String(Math.random()).slice(-8);
      window[random_name] = function(data) {
        for (var key in data) instance[key] = data[key];
        delete(window[random_name]);
      };
      var script = document.createElement('script');
      script.setAttribute('src', url + '?callback=' + random_name);
      script.setAttribute('type', 'text/javascript');
      document.head.appendChild(script);
    },
  },
});
