$(document).ready(function () {
    LoadIndexRole();
    LoadHiddenNotification();
    $('#table').DataTable({
        "ajax": LoadIndexRole()
    })
    ClearScreen();
})

function LoadIndexRole() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:11609/api/Roles/',
        async: false,
        datatype: "JSON",
        success: function (data) {
            var html = '';
            var i = 1;
            $.each(data, function (index, val) {
                html += '<tr>';
                // untuk menampilkan no
                html += '<td>' + i + '</td>';
                html += '<td>' + val.Name + '</td>';
                //nampilin foreign key
                //html += '<td>' + val.Regency.Name + '</td>';
                html += '<td> <a href="#" onclick="return GetById(' + val.Id + ')">Edit</a>';
                html += ' | <a href="#" onclick="return Delete(' + val.Id + ')">Delete</a> </td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}

function Save() {
    var item = new Object();
    item.name = $('#Name').val();
    $.ajax({
        url: 'http://localhost:11609/api/Roles/',
        type: 'POST',
        dataType: 'json',
        data: item,
        success: function (response) {
            swal({
                title: "Saved!",
                text: "That data has been saved!",
                type: "success"
            },
            function () {
                //$('#Save').hide();
                LoadIndexRole();
                $('#myModal').modal('hide');                
                //window.location.href = '/Roles/Index/';
            });
        },
        error: function (response) {
            swal("Oops", "We couldn't connect to the server!", "error");
        }
    });
};

function Edit() {
    var province = new Object();
    province.Id = $('#Id').val();
    province.Name = $('#Name').val();
    $.ajax({
        url: 'http://localhost:11609/api/Roles/' + province.Id,
        type: 'PUT',
        data: province,
        dataType: 'json',
        success: function (response) {
            swal({
                title: "Updated!",
                text: "your data has been updated!",
                type: "success"
            },
            function () {
                //window.location.href = '/Roles/Index/';
                LoadIndexRole();
                $('#myModal').modal('hide');
                $('#Id').val('');
                $('#Name').val('');
            });
        },
        error: function (response) {
            swal("Oops", "We couldn't connect to the server!", "error");
        }
    });
};

function GetById(Id) {
    $.ajax({
        url: "http://localhost:11609/api/Roles/" + Id,
        type: "GET",
        datatype: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);

            $('#myModal').modal('show');
            $('#Update').show();
            $('#Save').hide();
        }
    });
};

function Delete(Id) {
    swal({
        title: "Are You Sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        showCancelButtonColor: "#AD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            url: "http://localhost:11609/api/Roles/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                }, function () {
                    LoadIndexRole();
                    //window.location.href = '/Role/Index/';

                });
            },
            error: function (response) {
                swal("Oops", "We could't connect to the server", "error");
            }
        });
    });
};

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

function LoadHiddenNotification() {
    $('#Name').siblings('span.error').css('visibility', 'hidden');
}