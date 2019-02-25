$(document).ready(function () {
    LoadIndexCustomer();
    LoadReligionCombo();
    LoadProvinceCombo();
    LoadRegencyCombo();
    LoadDistrictCombo();
    LoadVillageCombo();
    LoadHiddenNotification();
    $('#table').DataTable({
        "ajax": LoadIndexCustomer()
    })
    ClearScreen();
})

function LoadIndexCustomer() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:11609/api/Customers/',
        async: false,
        datatype: "JSON",
        success: function (data) {
            var html = '';
            var i = 1;
            $.each(data, function (index, val) {
                html += '<tr>';
                //menampilkan nomer
                html += '<td>' + i + '</td>';
                html += '<td>' + val.FirstName + '</td>';
                html += '<td>' + val.LastName + '</td>';
                html += '<td>' + val.Dob + '</td>';
                html += '<td>' + val.Pob + '</td>';
                html += '<td>' + val.Gender + '</td>';
                html += '<td>' + val.Religions.Name + '</td>';
                html += '<td>' + val.Villages.Name + '</td>';
                html += '<td>' + val.Address + '</td>';
                html += '<td>' + val.Phone + '</td>';
                html += '<td>' + val.Email + '</td>';
                html += '<td> <a href="#" class="fa fa-pencil" onclick="return GetById(' + val.Id + ')">Edit</a>';
                html += ' | <a href="#" class="fa fa-trash" onclick="return Delete(' + val.Id + ')">Delete</a></td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}

function LoadReligionCombo() {
    $.ajax({
        url: 'http://localhost:11609/api/Religions',
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var Religion = $('#Religions');
            $.each(result, function (i, Religions) {
                $("<option></option>").val(Religions.Id).text(Religions.Name).appendTo(Religion);
            });
        }
    });
}


function LoadProvinceCombo() {
    $.ajax({
        url: 'http://localhost:11609/api/Provinces',
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var Province = $('#Provinces');
            $.each(result, function (i, Provinces) {
                $("<option></option>").val(Provinces.Id).text(Provinces.Name).appendTo(Province);
            });
        }
    });
}

function LoadRegencyCombo() {
    $.ajax({
        url: 'http://localhost:11609/api/Regencies',
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var Regency = $('#Regencies');
            $.each(result, function (i, Regencies) {
                $("<option></option>").val(Regencies.Id).text(Regencies.Name).appendTo(Regency);
            });
        }
    });
}

function LoadDistrictCombo() {
    $.ajax({
        url: 'http://localhost:11609/api/Districts',
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var District = $('#Districts');
            $.each(result, function (i, Districts) {
                $("<option></option>").val(Districts.Id).text(Districts.Name).appendTo(District);
            });
        }
    });
}

function LoadVillageCombo() {
    $.ajax({
        url: 'http://localhost:11609/api/Villages',
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var Village = $('#Villages');
            $.each(result, function (i, Villages) {
                $("<option></option>").val(Villages.Id).text(Villages.Name).appendTo(Village);
            });
        }
    });
}

function Save() {
    var Customer = new Object();
    Customer.FirstName = $('#FirstName').val();
    Customer.LastName = $('#LastName').val();
    Customer.Dob = $('#Dob').val();
    Customer.Pob = $('#Pob').val();
    Customer.Gender = $('#Gender').val();
    Customer.Religions = $('#Religions').val();
    Customer.Villages = $('#Villages').val();
    Customer.Address = $('#Address').val();
    Customer.Phone = $('#Phone').val();
    Customer.Email = $('#Email').val();
    $.ajax({
        url: 'http://localhost:11609/api/Customers/',
        type: 'POST',
        dataType: 'json',
        data: Customer,
        success: function (response) {
            swal({
                title: "Saved!",
                text: "That data has been saved!",
                type: "success"
            },
            function () {
                //window.location.href = '/Customers/Index/';
                LoadIndexCustomer();
                $('#myModal').modal('hide');
            });
        },
        error: function (response) {
            swal("Oops", "We couldn't connect to the server!", "error");
        }
    });
}

function Edit() {
    var Customer = new Object();
    Customer.Id = $('#Id').val();
    Customer.FirstName = $('#FirstName').val();
    Customer.LastName = $('#LastName').val();
    Customer.Dob = $('#Dob').val();
    Customer.Pob = $('#Pob').val();
    Customer.Gender = $('#Gender').val();
    Customer.Religions = $('#Religions').val();
    Customer.Villages = $('#Villages').val();
    Customer.Address = $('#Address').val();
    Customer.Phone = $('#Phone').val();
    Customer.Email = $('#Email').val();
    $.ajax({
        url: 'http://localhost:11609/api/Customers/' + Customer.Id,
        type: 'PUT',
        data: Customer,
        dataType: 'json',
        success: function (response) {
            swal({
                title: "Updated!",
                text: "your data has been updated!",
                type: "success"
            },
            function () {
                //window.location.href = '/Customers/Index/';
                LoadIndexCustomer();
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
        url: 'http://localhost:11609/api/Customers/' + Id,
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            $('#Id').val(result.Id);
            $('#FirstName').val(result.FirstName);
            $('#LastName').val(result.LastName);
            $('#Dob').val(result.Dob);
            $('#Pob').val(result.Pob);
            $('#Gender').val(result.Gender);
            $('#Religions').val(result.Religions.Id);
            $('#Villages').val(result.Villages.Id);
            $('#Address').val(result.Address);
            $('#Phone').val(result.Phone);
            $('#Email').val(result.Email);

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
            url: "http://localhost:11609/api/Customers/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                },
                function () {
                    window.location.href = '/Customers/Index/';
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
    if ($('#FirstName').val() == "" || ($('#FirstName').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#FirstName').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#FirstName').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#LastName').val() == "" || ($('#LastName').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#LastName').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#LastName').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Dob').val() == "" || ($('#Dob').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Dob').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Dob').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Pob').val() == "" || ($('#Pob').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Pob').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Pob').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Gender').val() == "Choose Gender" || ($('#Gender').val() == "0")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Gender').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Gender').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Religions').val() == "Choose Religion" || ($('#Religions').val() == "0")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Religions').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Religions').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Provinces').val() == "Choose Province" || ($('#Provinces').val() == "0")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Provinces').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Provinces').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Regencies').val() == "Choose Regency" || ($('#Regencies').val() == "0")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Regencies').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Regencies').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Districts').val() == "Choose District" || ($('#Districts').val() == "0")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Districts').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Districts').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Villages').val() == "Choose Village" || ($('#Village').val() == "0")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Villages').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Villages').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Address').val() == "" || ($('#Address').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Address').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Address').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Phone').val() == "" || ($('#Phone').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Phone').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Phone').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Email').val() == "" || ($('#Email').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Email').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Email').siblings('span.error').css('visibility', 'hidden');
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
    if ($('#FirstName').val() == "" || ($('#FirstName').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#FirstName').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#FirstName').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#LastName').val() == "" || ($('#LastName').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#LastName').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#LastName').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Dob').val() == "" || ($('#Dob').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Dob').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Dob').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Pob').val() == "" || ($('#Pob').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Pob').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Pob').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Gender').val() == "Choose Gender" || ($('#Gender').val() == "0")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Gender').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Gender').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Religions').val() == "Choose Religion" || ($('#Religions').val() == "0")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Religions').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Religions').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Provinces').val() == "Choose Province" || ($('#Provinces').val() == "0")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Provinces').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Provinces').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Regencies').val() == "Choose Regency" || ($('#Regencies').val() == "0")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Regencies').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Regencies').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Districts').val() == "Choose District" || ($('#Districts').val() == "0")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Districts').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Districts').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Villages').val() == "Choose Village" || ($('#Village').val() == "0")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Villages').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Villages').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Address').val() == "" || ($('#Address').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Address').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Address').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Phone').val() == "" || ($('#Phone').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Phone').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Phone').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Email').val() == "" || ($('#Email').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Email').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Email').siblings('span.error').css('visibility', 'hidden');
    }

    //kalau semua fild terisi
    if (isAllValid) {
        Edit();
    }
}

//untuk menghide notifikasi validasi agar tidak muncul saat pertamakali di load
function LoadHiddenNotification() {
    $('#FirstName').siblings('span.error').css('visibility', 'hidden');
    $('#LastName').siblings('span.error').css('visibility', 'hidden');
    $('#Dob').siblings('span.error').css('visibility', 'hidden');
    $('#Pob').siblings('span.error').css('visibility', 'hidden');
    $('#Gender').siblings('span.error').css('visibility', 'hidden');
    $('#Religions').val("Choose Gender"); // agar pada saat create ke 2 supplier combo box tidak kosong
    $('#Religions').siblings('span.error').css('visibility', 'hidden');
    $('#Religions').val("Choose Religion"); // agar pada saat create ke 2 supplier combo box tidak kosong
    $('#Provinces').siblings('span.error').css('visibility', 'hidden');
    $('#Provinces').val("Choose Province"); // agar pada saat create ke 2 supplier combo box tidak kosong
    $('#Regencies').siblings('span.error').css('visibility', 'hidden');
    $('#Regencies').val("Choose Regency"); // agar pada saat create ke 2 supplier combo box tidak kosong
    $('#Districts').siblings('span.error').css('visibility', 'hidden');
    $('#Districts').val("Choose District"); // agar pada saat create ke 2 supplier combo box tidak kosong
    $('#Villages').siblings('span.error').css('visibility', 'hidden');
    $('#Villages').val("Choose Village"); // agar pada saat create ke 2 supplier combo box tidak kosong
    $('#Address').siblings('span.error').css('visibility', 'hidden');
    $('#Phone').siblings('span.error').css('visibility', 'hidden');
    $('#Email').siblings('span.error').css('visibility', 'hidden');
    $('#Username').siblings('span.error').css('visibility', 'hidden');
    $('#Password').siblings('span.error').css('visibility', 'hidden');
}
