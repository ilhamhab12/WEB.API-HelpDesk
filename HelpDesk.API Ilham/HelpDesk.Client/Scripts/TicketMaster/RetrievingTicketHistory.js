$(document).ready(function () {
    LoadIndexTicketProgress();
    LoadHiddenNotification();
    $('#table').DataTable({
        "ajax": LoadIndexTicketProgress()
    })
    ClearScreen();
})

function LoadIndexTicketProgress() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:11609/api/TicketProgresses/',
        async: false,
        datatype: "JSON",
        success: function (data) {
            var html = '';
            var i = 1;
            $.each(data, function (index, val) {
                html += '<tr>';
                //menampilkan nomer
                html += '<td>' + i + '</td>';
                html += '<td>' + val.Tickets.Problem + '</td>';
                html += '<td>' + val.Tickets.Solution + '</td>';
                html += '<td>' + val.Tickets.DueDate + '</td>';
                //html += '<td>' + val.Tickets.Priorities.Name + '</td>';
                //html += '<td>' + val.Tickets.Categories.Name + '</td>';
                //html += '<td>' + val.Tickets.Customers.FirstName + '</td>';
                html += '<td>' + val.ProgressDate + '</td>';
                //html += '<td>' + val.Staffs.FirstName + '</td>';
                html += '<td>' + val.Statuses.Name + '</td>';
                html += '<td> <a href="#" class="fa fa-pencil" onclick="return GetById(' + val.Id + ')">Edit</a>';
                //html += ' | <a href="#" class="fa fa-trash" onclick="return Delete(' + val.Id + ')">Delete</a></td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}


function Save() {
    debugger;
    var ticket = new Object();
    ticket.Problem = $('#Problem').val();
    $.ajax({
        url: 'http://localhost:11609/api/Tickets/',
        type: 'POST',
        dataType: 'json',
        data: ticket,
        success: function (response) {
            var ticketProgress = new Object();
            ticketProgress.Status = "1";
            ticketProgress.Tickets = $('#Id').val();
            $.ajax({
                url: 'http://localhost:11609/api/TicketProgresses/',
                type: 'POST',
                dataType: 'json',
                data: ticketProgress,
                success: function (response) {
                    swal({
                        title: "Saved!",
                        text: "That data has been saved!",
                        type: "success"
                    },
        function () {
            //window.location.href = '/Tickets/Index/';
            LoadIndexTicket();
            $('#myModal').modal('hide');
        });
                },
                error: function (response) {
                    swal("Oops", "We couldn't connect to the server!", "error");
                }
            });
        }
    });
}

function Edit() {
    var ticket = new Object();
    ticket.Id = $('#Id').val();
    ticket.Problem = $('#Problem').val();
    $.ajax({
        url: 'http://localhost:11609/api/Tickets/' + ticket.Id,
        type: 'PUT',
        data: ticket,
        dataType: 'json',
        success: function (response) {
            swal({
                title: "Updated!",
                text: "your data has been updated!",
                type: "success"
            },
            function () {
                //window.location.href = '/Tickets/Index/';
                LoadIndexTicket();
                $('#myModal').modal('hide');
                $('#Id').val('');
                $('#Problem').val('');
            });
        },
        error: function (response) {
            swal("Oops", "We couldn't connect to the server!", "error");
        }
    });
}

function GetById(Id) {
    $.ajax({
        url: 'http://localhost:11609/api/Tickets/' + Id,
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Problem').val(result.Problem);

            $('#myModal').modal('show');
            $('#Save').hide();
            $('#Update').show();
        }
    })
}

function Delete(Id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            url: "http://localhost:11609/api/Tickets/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                },
                function () {
                    window.location.href = '/Tickets/Index/';
                });
            },
            error: function (response) {
                swal("Oops", "We couldn't connect to the server!", "error");
            }
        });
    });
}

function ClearScreen() {
    $('#myModal').on('hidden.bs.modal', function () {
        $(this).find("input,textarea,select").val('').end();
        $('#Update').hide();
        $('#Save').show();
    });
};

function ValidationSave() {
    // asumsi semua text box valid
    var isAllValid = true

    //cek textbox name
    if ($('#Problem').val() == "" || ($('#Problem').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Problem').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Problem').siblings('span.error').css('visibility', 'hidden');
    }

    //kalau semua fild terisi
    if (isAllValid) {
        Save();
    }
}

function ValidationEdit() {

    // asumsi semua text box valid
    var isAllValid = true

    //cek textbox name
    if ($('#Problem').val() == "" || ($('#Problem').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Problem').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Problem').siblings('span.error').css('visibility', 'hidden');
    }


    //kalau semua fild terisi
    if (isAllValid) {
        Edit();
    }
}

//untuk menghide notifikasi validasi agar tidak muncul saat pertamakali di load
function LoadHiddenNotification() {
    $('#Problem').siblings('span.error').css('visibility', 'hidden');
}
