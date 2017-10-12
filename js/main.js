"use strict";

// Callback függvény fade után.
function fadeDone() {
  console.log(this);
}

// Eseménykezelő beállítása.
$("p").click(function () {
  // $(this).hide();
  // $(this).fadeTo(5000, 1, fadeDone);
  // $(this).slideDown(3500).css("color", "blue");
});

// Esemény kiváltása.
// $("p").click();

// Kattintás megelőzése.
$("nav a.nav-link").click(function (ev) {
  ev.preventDefault();
  startPageChange(this, 1, false);
});
function startPageChange(elem, num, bool) {
  var link = $(elem);
  var prop = link.data("prop") || "opacity";
  var val = link.data("value") || "0";
  var speed = link.data("speed") || 1000;
  var settings = {};
  settings[prop] = val;

  $(document.body).animate(settings, speed, function () {
    document.location = link.attr("href");
  });
}

// Event oldal.
$(".events-search-row input").on("keyup", function (ev) {
  $.each($(".events-card-deck .card .card-title"), function (index, elem) {
    elem = $(elem);
    var search = ev.target.value.toLowerCase();
    var content = elem.html().toLowerCase();
    if (content.indexOf(search) == -1) {
      elem.parents(".card").hide();
    } else {
      elem.parents(".card").show();
    }
  });
});

// Regiszter oldal.
$(".cherry-custom-file").on("change", function (ev) {
  var name = ev.target.value.split("\\").pop();
  $(this)
    .find(".file-name")
    .html(name);
});

var alertBox = $(".alert.alert-primary");
function showInvalidMessage() {
  alertBox
    .removeClass("alert-primary")
    .addClass("alert-danger")
    .find(".alert-message")
    .text("Sikertelen belépés!");
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});


// jQuery plugin for send form data.
$.fn.sendForm = function() {
  var form = $(this);
  var action = form.attr("action");
  var method = form.attr("method") || "post";
  var callBack = form.attr("callBack");

  function checkFormItem(input) {
    input = $(input);
    if (input.attr("required") && input.val() == "") {
      input.parents(".form-group").addClass("invalid");
      return false;
    } else {
      input.parents(".form-group").removeClass("invalid");
    }

    return true;
  }

  form.on("submit", function(ev) {
    ev.preventDefault();
    var formData = {};
    var formIsValid = [];
    $(this).find("input, select, textarea").each( function(index, input) {
      formData[input.name] = input.value;
      formIsValid.push(checkFormItem(input));
    });

    if (formIsValid.indexOf(false) > -1) {
      return;
    }

    $.ajax({
      type: method.toUpperCase(),
      url: action,
      data: formData,
      dataType: 'json'
    }).done( function(resp) {
      console.log(resp);
      if (window[callBack]) {
        window[callBack]();
      }
    });
  });

  return this;
};

$("#newEventForm").sendForm();