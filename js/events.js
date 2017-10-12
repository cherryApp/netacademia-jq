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
    // eventElement.attr("href", "tickets.html?event=" + event.id);
    eventElement.find("h4").text(event.title);
    eventElement.data("event", event);
    eventElement
      .find(".card-body p")
      .eq(0)
      .text(event.description);
    eventElement.find(".card-body .event-time small").text(event.time);
    eventElement.find("img").attr("src", event.image);
    eventElement.on("click", function() {
      sessionStorage.eventId = $(this).data("event").id;
    });
    parentElement.append(eventElement);
  });
}

function openNewEventModal() {
  $("#newEventModal").modal("show");
}

// File előnézet készítése.
$("input#image").on("change", function() {
  if (this.files[0].type.indexOf("image") < 0) {
    return false;
  }

  var reader = new FileReader();
  reader.addEventListener("load", function () {
    $(".preview-holder img")[0].src = reader.result;
  }, false);

  if (this.files[0]) {
    reader.readAsDataURL(this.files[0]);
  }
});

$(".preview-holder img").on("click", function() {
  var div = $(this).parent().clone();
  div.addClass("big-image").on("click", function() {
    $(this).remove();
  });
  $(document.body).append(div);
});

startEventsPage();
