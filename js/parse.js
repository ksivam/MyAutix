/**
 * Created by krishnas on 11/2/13.
 */
(function(global, $, auTix, undefined){
    "use strict";

    var parse = global.Parse,
        saveEvents = function(options){
            var eventDetails = options.eventDetails,
                objects = [],
                TreasureDetails = parse.Object.extend("TreasureDetails");

            $.each(eventDetails, function(index, eventDetail){
                var treasureDetailsObject = new TreasureDetails();

                treasureDetailsObject.set("eventName", eventDetail.eventName);
                //treasureDetailsObject.set("location", new parse.GeoPoint({latitude: 40.0, longitude: -30.0}));
                treasureDetailsObject.set("address", eventDetail.location);
                treasureDetailsObject.set("discount", eventDetail.discount);
                treasureDetailsObject.set("discountAvailability", eventDetail.count);
                treasureDetailsObject.set("details", eventDetail.details);

                objects.push(treasureDetailsObject);
            });

            if(objects.length > 0){
                parse.Object.saveAll(objects, {
                    success: function (lists) {
                       console.log(lists);
                    },
                    error: function (model, error) {
                        console.log(error);
                    }
                });
            }
        };

    // initialize parse object (http://parse.com)
    parse.initialize("OEaSMolGTK2Fad1Ae15mMr0RGa2Y8OL8uehhyQqW", "hKiYLBcy2eyYqVe5ndjX3b4LWJqb2MdLCZKFhuEX");

    auTix.Parse = {
        saveEvents : saveEvents
    };
})(window, window.jQuery, window.AuTix);
