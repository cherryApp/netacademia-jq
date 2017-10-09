$(document).ready(function () {
    var RESTURL = "http://localhost:3000";
    var searchString = '';
    var sortKey = '';
    var sortDirection = '';

    // tabla kitoltese javascript object-bol
    function fillTicketsTable(currentTickets) {
        var tbody = $("#ticket-list tbody");
        tbody.html('');

        $.each(currentTickets, function (index, ticket) {
            var row = $(".templates .ticket-row").clone();
            row.find("td").eq(0).html(index + 1);
            row.find("td").eq(1).html(ticket.event);
            row.find("td").eq(2).html(ticket.time);
            row.find("td").eq(3).html(ticket.seller);
            row.find("td").eq(4).html(ticket.pcs);
            row.find("td").eq(5).html(ticket.link);
            tbody.append(row);
        });
    }

    // lista ujratoltese ajax-val (meghivja a fillTicketsTable-t is!)
    function refreshTicketList() {
        var urlParams = [];
        var url = RESTURL + "/tickets";

        if (searchString.length > 0) {
            urlParams.push('q=' + searchString);
        }

        if (urlParams.length > 0) {
            url = url + "?" + urlParams.join('&');
        }

        $.getJSON(url).done(
            function (ticketList) {
                fillTicketsTable(ticketList);
            }
        );
    }

    $(".tickets-search-row input").on("keyup",
        function () {
            searchString = $(this).val();
            refreshTicketList();
        });

    // Innen indul az alkalmazas
    refreshTicketList();
});