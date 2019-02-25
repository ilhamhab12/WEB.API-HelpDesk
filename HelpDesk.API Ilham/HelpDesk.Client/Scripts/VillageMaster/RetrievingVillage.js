$(document).ready(function () {
    LoadIndexVillage();
    LoadDistrictCombo();
    LoadHiddenNotification();
    $('#table').DataTable({
        "ajax": LoadIndexVillage()
    })
    ClearScreen();
})

function LoadIndexVillage() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:11609/api/Villages/',
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
                html += '<td>' + val.Districts.Name + '</td>';
                html += '<td> <a href="#" onclick="return GetById(' + val.Id + ')">Edit</a>';
                html += ' | <a href="#" onclick="return Delete(' + val.Id + ')">Delete</a> </td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}

function LoadDistrictCombo() {
    //debugger;
    $.ajax({
        url: 'http://localhost:11609/api/Districts/',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            var district = $('#Districts');
            district.empty();
            district.append($('<option/>').val('0').text('Select District'));
            $.each(result, function (i, District) {
                $("<option></option>").val(District.Id).text(District.Name).appendTo(district);
            });
        }
    });
}

function Save() {
    var village = new Object();
    village.name = $('#Name').val();
    village.districts = $('#Districts').val();
    $.ajax({
        url: 'http://localhost:11609/api/Villages/',
        type: 'POST',
        dataType: 'json',
        data: village,
        success: function (response) {
            swal({
                title: "Saved!",
                text: "That data has been saved!",
                type: "success"
            },
            function () {
                //$('#Save').hide();
                LoadIndexVillage();
                $('#myModal').modal('hide');                
                //window.location.href = '/Villages/Index/';
            });
        },
        error: function (response) {
            swal("Oops", "We couldn't connect to the server!", "error");
        }
    });
};

function Edit() {
    var village = new Object();
    village.Id = $('#Id').val();
    village.Name = $('#Name').val();
    village.Districts = $('#Districts').val();
    $.ajax({
        url: 'http://localhost:11609/api/Villages/' + village.Id,
        type: 'PUT',
        data: village,
        dataType: 'json',
        success: function (response) {
            swal({
                title: "Updated!",
                text: "your data has been updated!",
                type: "success"
            },
            function () {
                //window.location.href = '/Villages/Index/';
                LoadIndexVillage();
                $('#myModal').modal('hide');
                $('#Id').val('');
                $('#Name').val('');
                $('#Districts').val('0');
            });
        },
        error: function (response) {
            swal("Oops", "We couldn't connect to the server!", "error");
        }
    });
};

function GetById(Id) {
    $.ajax({
        url: "http://localhost:11609/api/Villages/" + Id,
        type: "GET",
        datatype: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
            $('#Districts').val(result.Districts.Id);

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
            url: "http://localhost:11609/api/Villages/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                }, function () {
                    LoadIndexVillage();
                    //window.location.href = '/Villages/Index/';

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
        $('#Districts').val('0');
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
    if ($('#Districts').val() == "0" || $('#Districts').val() == 0) {
        isAllValid = false;
        $('#Districts').siblings('span.error').css('visibility', 'visible');
    }
    else {
        $('#Districts').siblings('span.error').css('visibility', 'hidden');
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
    if ($('#Districts').val() == "0" || $('#Districts').val() == 0) {
        isAllValid = false;
        $('#Districts').siblings('span.error').css('visibility', 'visible');
    }
    else {
        $('#Districts').siblings('span.error').css('visibility', 'hidden');
    }

    //kalau semua fild terisi
    if (isAllValid) {
        Edit();
    }
}

function LoadHiddenNotification() {
    $('#Name').siblings('span.error').css('visibility', 'hidden');
    $('#Districts').siblings('span.error').css('visibility', 'hidden')
}