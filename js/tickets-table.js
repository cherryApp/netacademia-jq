$(document).ready(function () {
    var RESTURL = "http://localhost:3000";
    var searchString = '';
    var sortKey = '';
    var sortDirection = '';
    var ticketListTable = $("#ticket-list");
    // lapozas globalis valtozoi
    var pageLimit = 3; // hany egyed jelenjen meg egy lapon
    var currentPage = 1;
    var maxPage = 0;
    var totalCount = 0;

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

        urlParams.push('_limit=' + pageLimit);
        urlParams.push('_page=' + currentPage);
        // sima szoveges kereses lekezelese
        if (searchString.length > 0) {
            urlParams.push('q=' + searchString);
        }

        // rendezes kezelese
        if (sortKey.length > 0) {
            urlParams.push('_sort=' + sortKey);
            urlParams.push('_order=' + sortDirection);
        }

        // ha van url parameter akkor osszefozzuk az url valtozoba
        if (urlParams.length > 0) {
            url = url + "?" + urlParams.join('&');
        }

        $.getJSON(url).done(
            function (ticketList, textStatus, request) {
                var oldMaxPage = maxPage;
                totalCount = request.getResponseHeader('X-Total-Count');
                maxPage = totalCount / pageLimit;
                if (maxPage % 1 !== 0) {
                    maxPage = parseInt(maxPage) + 1;
                }
                if (oldMaxPage != maxPage) {
                    renderTicketTabletPaginator();
                }

                refreshPaginate();
                fillTicketsTable(ticketList);
            }
        );
    }

    function refreshPaginate() {
        var paginatorElem = $('#ticket-list-paginator');

        // bal oldali nyilacska elem referencia
        var firstElem = paginatorElem.find('ul > li:first-child');
        // jobb oldali nyilacska elem referencia
        var lastElem = paginatorElem.find('ul > li:last-child');

        if (currentPage == 1) {
            // bal oldali nyilacska tiltasa
            firstElem.addClass('disabled');

            // ha tiltva van a jobb oldali nyilacska akkor levesszuk a tiltast
            lastElem.removeClass('disabled');
            // ha tiltva van a jobb oldali utolso szam akkor levesszuk a tiltast
            lastElem.prev().removeClass('disabled');
        } else {
            firstElem.removeClass('disabled');
            firstElem.next().removeClass('disabled');

            lastElem.addClass('disabled');
        }


        paginatorElem.find('ul > li').eq(currentPage).addClass('active');
    }

    function renderTicketTabletPaginator() {
        var paginatorULElem = $('#ticket-list-paginator > ul');

        paginatorULElem.html('');

        var html = [];
        // balra nyilacska html (nem valtoztatjuk)
        html.push('<li class="page-item"><a class="page-link" href="#" aria-label="Previous" data-paginate-size="prev"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>');

        for (var i = 1; i <= maxPage; i++) {
            // a belso elemek toltese (szam elemek)
            html.push('<li class="page-item"><a class="page-link" href="#" data-paginate-size="' + i + '">' + i + '</a></li>');
        }

        // jobbra nyilacska html (nem valtoztatjuk)
        html.push('<li class="page-item"><a class="page-link" href="#" aria-label="Next" data-paginate-size="next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>');

        paginatorULElem.html(html.join(''));
    }

    $(".tickets-search-row input").on("keyup",
        function () {
            searchString = $(this).val();
            refreshTicketList();
        });

    ticketListTable.find("thead th[data-key]").on("click",
        function () {
            var th = $(this);
            $.each(ticketListTable.find('thead th[data-key]'), function (index, elem) {
                var currentTh = $(elem);
                if (th.data("key") != currentTh.data("key")) {
                    currentTh.removeClass("asc").removeClass("desc");
                }
            });
            sortKey = th.data("key");

            if (th.hasClass("asc")) {
                sortDirection = 'desc';
                th.removeClass("asc").addClass("desc");
            } else {
                sortDirection = 'asc';
                th.removeClass("desc").addClass("asc");
            }

            refreshTicketList();
        });

    // Innen indul az alkalmazas
    refreshTicketList();
});