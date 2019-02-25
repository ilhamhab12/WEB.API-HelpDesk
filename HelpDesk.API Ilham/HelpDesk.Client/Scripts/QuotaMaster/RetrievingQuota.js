$(document).ready(function () {
    LoadIndexQuota();
    LoadStaffCombo();
    LoadHiddenNotification();
    $('#table').DataTable({
        "ajax": LoadIndexQuota()
    })
    ClearScreen();
})

function LoadIndexQuota() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:11609/api/Quotas/',
        async: false,
        datatype: "JSON",
        success: function (data) {
            var html = '';
            var i = 1;
            $.each(data, function (index, val) {
                html += '<tr>';
                // untuk menampilkan no
                html += '<td>' + i + '</td>';
                html += '<td>' + val.Staffs.FirstName + '</td>';
                html += '<td>' + val.Total + '</td>';
                html += '<td> <a href="#" onclick="return GetById(' + val.Id + ')">Edit</a>';
                html += ' | <a href="#" onclick="return Delete(' + val.Id + ')">Delete</a> </td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}

function LoadStaffCombo() {
    //debugger;
    $.ajax({
        url: 'http://localhost:11609/api/Staffs/',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            var staff = $('#Staffs');
            staff.empty();
            staff.append($('<option/>').val('0').text('Select Staff'));
            $.each(result, function (i, Staff) {
                $("<option></option>").val(Staff.Id).text(Staff.FirstName).appendTo(staff);
            });
        }
    });
}

function Save() {
    debugger;
    var quota = new Object();
    quota.Staffs = $('#Staffs').val();
    quota.Total = $('#Total').val();
    $.ajax({
        url: 'http://localhost:11609/api/Quotas/',
        type: 'POST',
        dataType: 'json',
        data: quota,
        success: function (response) {
            swal({
                title: "Saved!",
                text: "That data has been saved!",
                type: "success"
            },
            function () {
                LoadIndexQuota();
                $('#myModal').modal('hide');                
                //window.location.href = '/Quotas/Index/';
            });
        },
        error: function (response) {
            swal("Oops", "We couldn't connect to the server!", "error");
        }
    });
};

function Edit() {
    var quota = new Object();
    quota.Id = $('#Id').val();
    quota.Total = $('#Total').val();
    quota.Staffs = $('#Staffs').val();
    $.ajax({
        url: 'http://localhost:11609/api/Quotas/' + quota.Id,
        type: 'PUT',
        data: quota,
        dataType: 'json',
        success: function (response) {
            swal({
                title: "Updated!",
                text: "your data has been updated!",
                type: "success"
            },
            function () {
                //window.location.href = '/Quotas/Index/';
                LoadIndexQuota();
                $('#myModal').modal('hide');
                $('#Id').val('');
                $('#Total').val('');
                $('#Staffs').val('0');
            });
        },
        error: function (response) {
            swal("Oops", "We couldn't connect to the server!", "error");
        }
    });
};

function GetById(Id) {
    $.ajax({
        url: "http://localhost:11609/api/Quotas/" + Id,
        type: "GET",
        datatype: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Total').val(result.Total);
            $('#Staffs').val(result.Staffs.Id);

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
            url: "http://localhost:11609/api/Quotas/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                }, function () {
                    LoadIndexQuota();
                    //window.location.href = '/Quotas/Index/';

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
        $('#Id').val('');
        $('#Total').val('');
        $('#Staffs').val('0');
        $('#Update').hide();
        $('#Save').show();
    });
};

function ValidationSave() {
    // asumsi semua text box valid
    var isAllValid = true

    //cek textbox total
    if ($('#Total').val() == "" || ($('#Total').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Total').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Total').siblings('span.error').css('visibility', 'hidden');
    }
    if ($('#Staffs').val() == "0" || $('#Staffs').val() == 0) {
        isAllValid = false;
        $('#Staffs').siblings('span.error').css('visibility', 'visible');
    }
    else {
        $('#Staffs').siblings('span.error').css('visibility', 'hidden');
    }

    //kalau semua fild terisi
    if (isAllValid) {
        Save();
    }
}

function ValidationEdit() {
    // asumsi semua text box valid
    var isAllValid = true

    //cek textbox total
    if ($('#Total').val() == "" || ($('#Total').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Total').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Total').siblings('span.error').css('visibility', 'hidden');
    }
    if ($('#Staffs').val() == "0" || $('#Staffs').val() == 0) {
        isAllValid = false;
        $('#Staffs').siblings('span.error').css('visibility', 'visible');
    }
    else {
        $('#Staffs').siblings('span.error').css('visibility', 'hidden');
    }

    //kalau semua fild terisi
    if (isAllValid) {
        Edit();
    }
}

function LoadHiddenNotification() {
    $('#Total').siblings('span.error').css('visibility', 'hidden');
    $('#Staffs').siblings('span.error').css('visibility', 'hidden')
}