// https://vuejs.org/v2/guide/mixins.html
const omboardVue = Vue.extend({
  created: function() {
    this.load();
  },
  methods: {
    load: function() {
      var request = new XMLHttpRequest();
      request.addEventListener('load', function() {
        console.log(request.responseText);
      });
      request.open('GET', this.url);
      request.send(null);
    },

  }
});
