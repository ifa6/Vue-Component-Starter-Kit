var Vue = require('vue');
var appOptions = require('./index.vue');
var app = new Vue(appOptions).$mount('#app');

var Router = require('director').Router;
var router = new Router();

router.on(':page', function (page) {
    window.scrollTo(0, 0);
    app.view = ""+page+"";
    console.log(app.view);
    //app.params.page = +page
});


router.configure({
    notfound: function () {
        router.setRoute('')
    }
});

router.init('');
//
//////Don't get in the way of page load
////window.addEventListener("load", setupMQL, false);
////
////function setupMQL() {
////    //Account for known vendor prefixes
////    if (window.msMatchMedia)
////        window.matchMedia = window.msMatchMedia;
////    //Do some feature detection
////    if (!window.matchMedia) {
////        //MQL isn't supported, do something
////        app.$broadcast('window-size', 'large')
////    } else {
////
////
////        //MQL is supported, let's see what size image we should download first
////        mobileMQL = window.matchMedia("(max-width:450px)");
////
////        //Populate the images with the right sources/alt-text for the current state of the media
////        setScreenSize(mobileMQL);
////        //Now that we've loaded the initial images, set up listeners to change to the other sizes if the media query changes evaluation
////        mobileMQL.addListener(setScreenSize);
////    }
////}
////
////function setScreenSize(mql) {
////    //Are we on a large sreen? If so, show big images. Otherwise, show small.
////    if (!mql.matches) {
////        app.$broadcast('window-size', 'large')
////        console.log("large")
////    } else {
////        app.$broadcast('window-size', 'small')
////        console.log("small")
////    }
////}
