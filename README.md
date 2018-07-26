Diadust
=======

### History
Remove history redirect design for now, since using `this.$router.go(-1)` always causes page refresh, some part of the page like navigator also disappear for a while. This behavior makes application like a web page rather than an native app. Though there are several methods to prevent this, it's also another reason. State management is now done in `Vuex`, and after some action, there are state & router two need to be updated correspondingly, it's a bit tricky to handle. 