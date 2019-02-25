$(document).ready(function () {
    LoadIndexDistrict();
    LoadRegencyCombo();
    LoadHiddenNotification();
    $('#table').DataTable({
        "ajax": LoadIndexDistrict()
    })
    ClearScreen();
})

function LoadIndexDistrict() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:11609/api/Districts/',
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
                html += '<td>' + val.Regencies.Name + '</td>';
                html += '<td> <a href="#" onclick="return GetById(' + val.Id + ')">Edit</a>';
                html += ' | <a href="#" onclick="return Delete(' + val.Id + ')">Delete</a> </td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}

function LoadRegencyCombo() {
    //debugger;
    $.ajax({
        url: 'http://localhost:11609/api/Regencies/',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            var regency = $('#Regencies');
            regency.empty();
            regency.append($('<option/>').val('0').text('Select Regency'));
            $.each(result, function (i, Regency) {
                $("<option></option>").val(Regency.Id).text(Regency.Name).appendTo(regency);
            });
        }
    });
}

function Save() {
    var district = new Object();
    district.name = $('#Name').val();
    district.regencies = $('#Regencies').val();
    $.ajax({
        url: 'http://localhost:11609/api/Districts/',
        type: 'POST',
        dataType: 'json',
        data: district,
        success: function (response) {
            swal({
                title: "Saved!",
                text: "That data has been saved!",
                type: "success"
            },
            function () {
                //$('#Save').hide();
                LoadIndexDistrict();
                $('#myModal').modal('hide');                
                //window.location.href = '/Districts/Index/';
            });
        },
        error: function (response) {
            swal("Oops", "We couldn't connect to the server!", "error");
        }
    });
};

function Edit() {
    var district = new Object();
    district.Id = $('#Id').val();
    district.Name = $('#Name').val();
    district.Regencies = $('#Regencies').val();
    $.ajax({
        url: 'http://localhost:11609/api/Districts/' + district.Id,
        type: 'PUT',
        data: district,
        dataType: 'json',
        success: function (response) {
            swal({
                title: "Updated!",
                text: "your data has been updated!",
                type: "success"
            },
            function () {
                //window.location.href = '/Districts/Index/';
                LoadIndexDistrict();
                $('#myModal').modal('hide');
                $('#Id').val('');
                $('#Name').val('');
                $('#Regencies').val('0');
            });
        },
        error: function (response) {
            swal("Oops", "We couldn't connect to the server!", "error");
        }
    });
};

function GetById(Id) {
    $.ajax({
        url: "http://localhost:11609/api/Districts/" + Id,
        type: "GET",
        datatype: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
            $('#Regencies').val(result.Regencies.Id);

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
            url: "http://localhost:11609/api/Districts/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                }, function () {
                    LoadIndexDistrict();
                    //window.location.href = '/Districts/Index/';

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
        $('#Name').val('');
        $('#Regencies').val('0');
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
    if ($('#Regencies').val() == "0" || $('#Regencies').val() == 0) {
        isAllValid = false;
        $('#Regencies').siblings('span.error').css('visibility', 'visible');
    }
    else {
        $('#Regencies').siblings('span.error').css('visibility', 'hidden');
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
    if ($('#Regencies').val() == "0" || $('#Regencies').val() == 0) {
        isAllValid = false;
        $('#Regencies').siblings('span.error').css('visibility', 'visible');
    }
    else {
        $('#Regencies').siblings('span.error').css('visibility', 'hidden');
    }

    //kalau semua fild terisi
    if (isAllValid) {
        Edit();
    }
}

function LoadHiddenNotification() {
    $('#Name').siblings('span.error').css('visibility', 'hidden');
    $('#Regencies').siblings('span.error').css('visibility', 'hidden')
}