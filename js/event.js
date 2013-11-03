/**
 * Created by krishnas on 11/2/13.
 */
(function(global, $, auTix){
    "use strict";

    var submitEventId = "#submitEventButton",
        eventNameId = "#eventName",
        locationId = "#location",
        discountId = "#discount",
        countId = "#count",
        detailsId = "#details",
        addLocationDetailsButtonId = "#addLocationDetailsButton",
        locationDetailsTableId = "#locationDetailsTable",
        parse = auTix.Parse,
        resetLocation = function(){
            $(locationId).val("");
            $(discountId).val("");
            $(countId).val("")
        },
        resetControls = function(){
            $(eventNameId).val("");
            $(detailsId).val("");
            $("table#locationDetailsTable >tbody").html("");
            resetLocation();
        };


    $(submitEventId).click(function(){
        var rows = $("table#locationDetailsTable >tbody >tr"),
            eventName = $(eventNameId).val(),
            details = $(detailsId).val(),
            eventDetails = [];

        $.each(rows, function(index, row){
            var location = row.children[0].innerText,
                discount =  row.children[1].innerText,
                count =  row.children[2].innerText;

            eventDetails.push({
                eventName : eventName,
                location : location,
                discount : discount,
                count : count,
                details : details
            })
        });

        parse.saveEvents({
            eventDetails: eventDetails
        });

        resetControls();
    });

    $(addLocationDetailsButtonId).click(function () {
        var location = $(locationId).val(),
            discount = $(discountId).val(),
            count = $(countId).val(),
            newRows = "<tr>" +
            "<td>"+ location + "</td>" +
            "<td>"+ discount +"</td>" +
            "<td>"+ count +"</td>" +
            "</tr>";

        if(location && discount && count){
            $("table#locationDetailsTable tbody")
                // Append the new rows to the body
                .append(newRows)
                // Call the refresh method
                .closest( "table#locationDetailsTable")
                .table("refresh")
                // Trigger if the new injected markup contain links or buttons that need to be enhanced
                .trigger("create");

            resetLocation();
        }
    });

})(window, window.jQuery, window.AuTix);
