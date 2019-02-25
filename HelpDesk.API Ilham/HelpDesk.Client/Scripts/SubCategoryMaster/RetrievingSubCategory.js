$(document).ready(function () {
    LoadIndexSubCategory();
    LoadCategoryCombo();
    LoadHiddenNotification();
    $('#table').DataTable({
        "ajax": LoadIndexSubCategory()
    })
    ClearScreen();
})

function LoadIndexSubCategory() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:11609/api/SubCategories/',
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
                html += '<td>' + val.Categories.Name + '</td>';
                html += '<td> <a href="#" onclick="return GetById(' + val.Id + ')">Edit</a>';
                html += ' | <a href="#" onclick="return Delete(' + val.Id + ')">Delete</a> </td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}

function LoadCategoryCombo() {
    //debugger;
    $.ajax({
        url: 'http://localhost:11609/api/Categories/',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            var category = $('#Categories');
            category.empty();
            category.append($('<option/>').val('0').text('Select Category'));
            $.each(result, function (i, Category) {
                $("<option></option>").val(Category.Id).text(Category.Name).appendTo(category);
            });
        }
    });
}

function Save() {
    var district = new Object();
    district.name = $('#Name').val();
    district.categories = $('#Categories').val();
    $.ajax({
        url: 'http://localhost:11609/api/SubCategories/',
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
                LoadIndexSubCategory();
                $('#myModal').modal('hide');                
                //window.location.href = '/SubCategories/Index/';
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
    district.Categories = $('#Categories').val();
    $.ajax({
        url: 'http://localhost:11609/api/SubCategories/' + district.Id,
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
                //window.location.href = '/SubCategories/Index/';
                LoadIndexSubCategory();
                $('#myModal').modal('hide');
                $('#Id').val('');
                $('#Name').val('');
                $('#Categories').val('0');
            });
        },
        error: function (response) {
            swal("Oops", "We couldn't connect to the server!", "error");
        }
    });
};

function GetById(Id) {
    $.ajax({
        url: "http://localhost:11609/api/SubCategories/" + Id,
        type: "GET",
        datatype: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
            $('#Categories').val(result.Categories.Id);

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
            url: "http://localhost:11609/api/SubCategories/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                }, function () {
                    LoadIndexSubCategory();
                    //window.location.href = '/SubCategories/Index/';

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
        $('#Categories').val('0');
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
    if ($('#Categories').val() == "0" || $('#Categories').val() == 0) {
        isAllValid = false;
        $('#Categories').siblings('span.error').css('visibility', 'visible');
    }
    else {
        $('#Categories').siblings('span.error').css('visibility', 'hidden');
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
    if ($('#Categories').val() == "0" || $('#Categories').val() == 0) {
        isAllValid = false;
        $('#Categories').siblings('span.error').css('visibility', 'visible');
    }
    else {
        $('#Categories').siblings('span.error').css('visibility', 'hidden');
    }

    //kalau semua fild terisi
    if (isAllValid) {
        Edit();
    }
}

function LoadHiddenNotification() {
    $('#Name').siblings('span.error').css('visibility', 'hidden');
    $('#Categories').siblings('span.error').css('visibility', 'hidden')
}