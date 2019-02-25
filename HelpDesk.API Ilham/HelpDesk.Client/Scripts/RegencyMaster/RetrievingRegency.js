$(document).ready(function () {
    LoadIndexRegency();
    LoadProvinceCombo();
    LoadHiddenNotification();
    $('#table').DataTable({
        "ajax": LoadIndexRegency()
    })
    ClearScreen();
})

function LoadIndexRegency() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:11609/api/Regencies/',
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
                html += '<td>' + val.Provinces.Name + '</td>';
                html += '<td> <a href="#" onclick="return GetById(' + val.Id + ')">Edit</a>';
                html += ' | <a href="#" onclick="return Delete(' + val.Id + ')">Delete</a> </td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}

function LoadProvinceCombo() {
    //debugger;
    $.ajax({
        url: 'http://localhost:11609/api/Provinces/',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            var province = $('#Provinces');
            province.empty();
            province.append($('<option/>').val('0').text('Select Province'));
            $.each(result, function (i, Province) {
                $("<option></option>").val(Province.Id).text(Province.Name).appendTo(province);
            });
        }
    });
}

function Save() {
    var regency = new Object();
    regency.name = $('#Name').val();
    regency.provinces = $('#Provinces').val();
    $.ajax({
        url: 'http://localhost:11609/api/Regencies/',
        type: 'POST',
        dataType: 'json',
        data: regency,
        success: function (response) {
            swal({
                title: "Saved!",
                text: "That data has been saved!",
                type: "success"
            },
            function () {
                //$('#Save').hide();
                LoadIndexRegency();
                $('#myModal').modal('hide');                
                //window.location.href = '/Regencies/Index/';
            });
        },
        error: function (response) {
            swal("Oops", "We couldn't connect to the server!", "error");
        }
    });
};

function Edit() {
    var regency = new Object();
    regency.Id = $('#Id').val();
    regency.Name = $('#Name').val();
    regency.Provinces = $('#Provinces').val();
    $.ajax({
        url: 'http://localhost:11609/api/Regencies/' + regency.Id,
        type: 'PUT',
        data: regency,
        dataType: 'json',
        success: function (response) {
            swal({
                title: "Updated!",
                text: "your data has been updated!",
                type: "success"
            },
            function () {
                //window.location.href = '/Regencies/Index/';
                LoadIndexRegency();
                $('#myModal').modal('hide');
                $('#Id').val('');
                $('#Name').val('');
                $('#Provinces').val('0');
            });
        },
        error: function (response) {
            swal("Oops", "We couldn't connect to the server!", "error");
        }
    });
};

function GetById(Id) {
    $.ajax({
        url: "http://localhost:11609/api/Regencies/" + Id,
        type: "GET",
        datatype: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
            $('#Provinces').val(result.Provinces.Id);

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
            url: "http://localhost:11609/api/Regencies/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                }, function () {
                    LoadIndexRegency();
                    //window.location.href = '/Regency/Index/';

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
        $('#Provinces').val('0');
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
    if ($('#Provinces').val() == "0" || $('#Provinces').val() == 0) {
        isAllValid = false;
        $('#Provinces').siblings('span.error').css('visibility', 'visible');
    }
    else {
        $('#Provinces').siblings('span.error').css('visibility', 'hidden');
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
    if ($('#Provinces').val() == "0" || $('#Provinces').val() == 0) {
        isAllValid = false;
        $('#Provinces').siblings('span.error').css('visibility', 'visible');
    }
    else {
        $('#Provinces').siblings('span.error').css('visibility', 'hidden');
    }

    //kalau semua fild terisi
    if (isAllValid) {
        Edit();
    }
}

function LoadHiddenNotification() {
    $('#Name').siblings('span.error').css('visibility', 'hidden');
    $('#Provinces').siblings('span.error').css('visibility', 'hidden')
}