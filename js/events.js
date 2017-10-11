var RESTURL = "http://localhost:3000";
function startEventsPage() {
    $.getJSON(RESTURL + "/events").done(function(eventList) {
      showEventList(eventList);
    });
}

// Események megjelenítése.
function showEventList(eventList) {
  var template = $(".templates a.card");
  var parentElement = $(".events-card-deck");
  parentElement.html('');
  $.each(eventList, function(index, event) {
    var eventElement = template.clone();
    eventElement.attr("href", "tickets.html?event=" + event.id);
    eventElement.find("h4").text(event.title);
    eventElement
      .find(".card-body p")
      .eq(0)
      .text(event.description);
    eventElement.find(".card-body .event-time small").text(event.time);
    eventElement.find("img").attr("src", event.image);
    parentElement.append(eventElement);
  });
}

function openNewEventModal() {
  $("#newEventModal").modal("show");
}

startEventsPage();
