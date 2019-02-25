$(document).ready(function () {
    LoadIndexStatus();
    LoadHiddenNotification();
    $('#table').DataTable({
        "ajax": LoadIndexStatus()
    })
    ClearScreen();
})

function LoadIndexStatus() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:11609/api/Statuses/',
        async: false,
        datatype: "JSON",
        success: function (data) {
            var html = '';
            var i = 1;
            $.each(data, function (index, val) {
                html += '<tr>';
                //menampilkan nomer
                html += '<td>' + i + '</td>';
                html += '<td>' + val.Name + '</td>';
                html += '<td> <a href="#" class="fa fa-pencil" onclick="return GetById(' + val.Id + ')">Edit</a>';
                html += ' | <a href="#" class="fa fa-trash" onclick="return Delete(' + val.Id + ')">Delete</a></td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}

function Save() {
    var status = new Object();
    status.name = $('#Name').val();
    $.ajax({
        url: 'http://localhost:11609/api/Statuses/',
        type: 'POST',
        dataType: 'json',
        data: status,
        success: function (response) {
            swal({
                title: "Saved!",
                text: "That data has been saved!",
                type: "success"
            },
            function () {
                //window.location.href = '/Statuses/Index/';
                LoadIndexStatus();
                $('#myModal').modal('hide');
            });
        },
        error: function (response) {
            swal("Oops", "We couldn't connect to the server!", "error");
        }
    });
}

function Edit() {
    var status = new Object();
    status.Id = $('#Id').val();
    status.Name = $('#Name').val();
    $.ajax({
        url: 'http://localhost:11609/api/Statuses/' + status.Id,
        type: 'PUT',
        data: status,
        dataType: 'json',
        success: function (response) {
            swal({
                title: "Updated!",
                text: "your data has been updated!",
                type: "success"
            },
            function () {
                //window.location.href = '/Statuses/Index/';
                LoadIndexStatus();
                $('#myModal').modal('hide');
                $('#Id').val('');
                $('#Name').val('');
            });
        },
        error: function (response) {
            swal("Oops", "We couldn't connect to the server!", "error");
        }
    });
}

function GetById(Id) {
    $.ajax({
        url: 'http://localhost:11609/api/Statuses/' + Id,
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);

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
            url: "http://localhost:11609/api/Statuses/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                },
                function () {
                    window.location.href = '/Statuses/Index/';
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
    if ($('#Name').val() == "" || ($('#Name').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Name').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Name').siblings('span.error').css('visibility', 'hidden');
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
    if ($('#Name').val() == "" || ($('#Name').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Name').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Name').siblings('span.error').css('visibility', 'hidden');
    }

    //kalau semua fild terisi
    if (isAllValid) {
        Edit();
    }
}

//untuk menghide notifikasi validasi agar tidak muncul saat pertamakali di load
function LoadHiddenNotification() {
    $('#Name').siblings('span.error').css('visibility', 'hidden');
}
