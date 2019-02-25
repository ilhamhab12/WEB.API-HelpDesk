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
                //html += '<td>' + val.Username + '</td>';
                //html += '<td>' + val.Password + '</td>';
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
            var religion = $('#Religions');
            religion.empty();
            religion.append($('<option/>').val('0').text('Select Religion'));
            $.each(result, function (i, Religions) {
                $("<option></option>").val(Religions.Id).text(Religions.Name).appendTo(religion);
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
            var province = $('#Provinces');
            province.empty();
            province.append($('<option/>').val('0').text('Select Province'));
            $.each(result, function (i, Provinces) {
                $("<option></option>").val(Provinces.Id).text(Provinces.Name).appendTo(province);
            });
            $('#Regencies').val('0');
            $('#Districts').val('0');
            $('#Villages').val('0');
        }
    });
}

function LoadRegencyCombo() {
    $.ajax({
        url: 'http://localhost:11609/api/Regencies',
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var regency = $('#Regencies');
            regency.empty();
            regency.append($('<option/>').val('0').text('Select Regency'));
            $.each(result, function (i, Regencies) {
                $("<option></option>").val(Regencies.Id).text(Regencies.Name).appendTo(regency);
            });
            $('#Districts').val('0');
            $('#Villages').val('0');
        }
    });
}

function LoadRegencyComboFk() {
    $.ajax({
        url: 'http://localhost:11609/api/Regencies/GetFk/' + $('#Provinces').val(),
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var regency = $('#Regencies');
            regency.empty();
            regency.append($('<option/>').val('0').text('Select Regency'));
            $.each(result, function (i, Regencies) {
                $("<option></option>").val(Regencies.Id).text(Regencies.Name).appendTo(regency);
            });
            $('#Districts').val('0');
            $('#Villages').val('0');
            $('#Regencies').prop("disabled", false);
            $('#Districts').prop("disabled", false);
            $('#Villages').prop("disabled", false);
        }
    });
}

function LoadDistrictCombo() {
    $.ajax({
        url: 'http://localhost:11609/api/Districts',
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var district = $('#Districts');
            district.empty();
            district.append($('<option/>').val('0').text('Select District'));
            $.each(result, function (i, Districts) {
                $("<option></option>").val(Districts.Id).text(Districts.Name).appendTo(district);
            });
            $('#Villages').val('0');
        }
    });
}

function LoadDistrictComboFk() {
    $.ajax({
        url: 'http://localhost:11609/api/Districts/GetFk/' + $('#Regencies').val(),
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var district = $('#Districts');
            district.empty();
            district.append($('<option/>').val('0').text('Select District'));
            $.each(result, function (i, Districts) {
                $("<option></option>").val(Districts.Id).text(Districts.Name).appendTo(district);
            });
            $('#Villages').val('0');
        }
    });
}

function LoadVillageCombo() {
    $.ajax({
        url: 'http://localhost:11609/api/Villages',
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var village = $('#Villages');
            village.empty();
            village.append($('<option/>').val('0').text('Select Village'));
            $.each(result, function (i, Villages) {
                $("<option></option>").val(Villages.Id).text(Villages.Name).appendTo(village);
            });
        }
    });
}

function LoadVillageComboFk() {
    $.ajax({
        url: 'http://localhost:11609/api/Villages/GetFk/' + $('#Districts').val(),
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var village = $('#Villages');
            village.empty();
            village.append($('<option/>').val('0').text('Select Village'));
            $.each(result, function (i, Villages) {
                $("<option></option>").val(Villages.Id).text(Villages.Name).appendTo(village);
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
            console.log(result);
            $('#Id').val(result.Id);
            $('#FirstName').val(result.FirstName);
            $('#LastName').val(result.LastName);
            $('#Dob').val(result.Dob);
            $('#Pob').val(result.Pob);
            $('#Gender').val(result.Gender);
            $('#Religions').val(result.Religions.Id);
            $('#Provinces').val(result.Villages.Districts.Regencies.Provinces.Id);
            $('#Regencies').val(result.Villages.Districts.Regencies.Id);
            $('#Districts').val(result.Villages.Districts.Id);
            $('#Villages').val(result.Villages.Id);
            $('#Address').val(result.Address);
            $('#Phone').val(result.Phone);
            $('#Email').val(result.Email);
            $('#Username').val(result.Username);
            $('#Password').val(result.Password);

            $('#Regencies').prop("disabled", true);
            $('#Districts').prop("disabled", true);
            $('#Villages').prop("disabled", true);

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
        $('#FirstName').val('');
        $('#LastName').val('');
        $('#Dob').val('');
        $('#Pob').val('');
        $('#Gender').val('');
        $('#Religions').val('0'); // agar pada saat create ke 2 supplier combo box tidak kosong
        $('#Provinces').val('0'); // agar pada saat create ke 2 supplier combo box tidak kosong
        $('#Regencies').val('0'); // agar pada saat create ke 2 supplier combo box tidak kosong
        $('#Districts').val('0'); // agar pada saat create ke 2 supplier combo box tidak kosong
        $('#Villages').val('0'); // agar pada saat create ke 2 supplier combo box tidak kosong
        $('#Address').val('');
        $('#Phone').val('');
        $('#Email').val('');
        $('#Username').val('');
        $('#Password').val('');
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

    if ($('#Regencies').val() == "Choose Regencie" || ($('#Regencies').val() == "0")) {
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

    if ($('#Villages').text() == "Select Village" || ($('#Village').val() == "0") || ($('#Village').val() == 0)) {
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

    if ($('#Regencies').val() == "Choose Regencie" || ($('#Regencies').val() == "0")) {
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

    if ($('#Villages').text() == "Select Village" || ($('#Village').val() == "0") || ($('#Village').val() == 0)) {
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
    $('#Religions').siblings('span.error').css('visibility', 'hidden');
    $('#Provinces').siblings('span.error').css('visibility', 'hidden');
    $('#Regencies').siblings('span.error').css('visibility', 'hidden');
    $('#Districts').siblings('span.error').css('visibility', 'hidden');
    $('#Villages').siblings('span.error').css('visibility', 'hidden');
    $('#Address').siblings('span.error').css('visibility', 'hidden');
    $('#Phone').siblings('span.error').css('visibility', 'hidden');
    $('#Email').siblings('span.error').css('visibility', 'hidden');
    $('#Username').siblings('span.error').css('visibility', 'hidden');
    $('#Password').siblings('span.error').css('visibility', 'hidden');
}
