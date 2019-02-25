$(document).ready(function () {
    LoadIndexTicketProgress();
    LoadPriorityCombo();
    LoadCategoryCombo();
    LoadSubCategoryCombo();
    LoadRoleCombo();
    LoadStaffCombo();
    LoadStatusCombo();
    LoadHiddenNotification();
    DueDate();
    $('#table').DataTable({
        "ajax": LoadIndexTicketProgress()
    })
    ClearScreen();
})

//function LoadIndexTicket() {
//    $.ajax({
//        type: "GET",
//        url: 'http://localhost:11609/api/Tickets/',
//        async: false,
//        datatype: "JSON",
//        success: function (data) {
//            var html = '';
//            var i = 1;
//            $.each(data, function (index, val) {
//                html += '<tr>';
//                //menampilkan nomer
//                html += '<td>' + i + '</td>';
//                html += '<td>' + val.Id + '</td>';
//                html += '<td>' + val.Problem + '</td>';
//                html += '<td>' + val.Solution + '</td>';
//                html += '<td>' + val.DueDate + '</td>';
//                html += '<td>' + val.Priorities.Name + '</td>';
//                html += '<td>' + val.Categories.Name + '</td>';
//                html += '<td>' + val.Customers.FirstName + '</td>';
//                html += '<td> <a href="#" class="fa fa-pencil" onclick="return GetById(' + val.Id + ')">Edit</a>';
//                html += ' | <a href="#" class="fa fa-trash" onclick="return Delete(' + val.Id + ')">Delete</a></td>';
//                html += '</tr>';
//                i++;
//            });
//            $('.tbody').html(html);
//        }
//    });
//}

function DueDate() {
    //menampilkan orderDate sesuai dengan tanggal sekarang
    var date = new Date();

    date.setDate(date.getDate())

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    //mengeirim data ke orderDate
    var today = year + "-" + month + "-" + day;
    $("#DueDate").attr("value", today);

    
}

//function AddDueDatePriority() {

    

//    if ($('#Priorities').val() == "Choose Priority" || ($('#Priorities').val() == "0")) {
//        var date = new Date();

//        date.setDate(date.getDate())

//        var day = date.getDate();
//        var month = date.getMonth() + 1;
//        var year = date.getFullYear();

//        if (month < 10) month = "0" + month;
//        if (day < 10) day = "0" + day;

//        var today = year + "-" + month + "-" + day;
//        $("#DueDate").attr("value", today);
//    }

//    if ($('#Priorities').val() == "Low") {

//        var date = new Date();

//        date.setDate(date.getDate() + 30)

//        var day = date.getDate();
//        var month = date.getMonth() + 1;
//        var year = date.getFullYear();

//        if (month < 10) month = "0" + month;
//        if (day < 10) day = "0" + day;

//        var today = year + "-" + month + "-" + day;
//        $("#DueDate").attr("value", today);

//    }

//    if ($('#Priorities').val() == "Medium") {

//        var date = new Date();

//        date.setDate(date.getDate() + 14)

//        var day = date.getDate();
//        var month = date.getMonth() + 1;
//        var year = date.getFullYear();

//        if (month < 10) month = "0" + month;
//        if (day < 10) day = "0" + day;

//        var today = year + "-" + month + "-" + day;
//        $("#DueDate").attr("value", today);
//    }

//    if ($('#Priorities').val() == "High") {

//        var date = new Date();

//        date.setDate(date.getDate() + 7)

//        var day = date.getDate();
//        var month = date.getMonth() + 1;
//        var year = date.getFullYear();

//        if (month < 10) month = "0" + month;
//        if (day < 10) day = "0" + day;

//        var today = year + "-" + month + "-" + day;
//        $("#DueDate").attr("value", today);
//    }
    

//}

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
                html += '<td>' + val.Tickets.Id + '</td>';
                html += '<td>' + val.Tickets.Problem + '</td>';
                html += '<td>' + val.Tickets.Solution + '</td>';
                //html += '<td>' + val.Tickets.DueDate + '</td>';
                //html += '<td>' + val.Tickets.Priorities.Name + '</td>';
                //html += '<td>' + val.Tickets.Categories.Name + '</td>';
                //html += '<td>' + val.Tickets.Customers.FirstName + '</td>';
                //html += '<td>' + val.ProgressDate + '</td>';
                html += '<td>' + val.Tickets.CreateDate + '</td>';
                //html += '<td>' + val.Staffs.FirstName + '</td>';
                html += '<td>' + val.Statuses.Name + '</td>';
                html += '<td> <a href="#" class="fa fa-pencil" onclick="return GetById(' + val.Id + ')">Assign</a>';
                //html += ' | <a href="#" class="fa fa-trash" onclick="return Delete(' + val.Id + ')">Delete</a></td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    });
}

function LoadPriorityCombo() {
    $.ajax({
        url: 'http://localhost:11609/api/Priorities',
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var Priority = $('#Priorities');
            $.each(result, function (i, Priorities) {
                $("<option></option>").val(Priorities.Id).text(Priorities.Name).appendTo(Priority);
            });
        }
    });
}

function LoadPriorityDay() {
        $.ajax({
            url: 'http://localhost:11609/api/Priorities/GetFk/' + $('#Priorities').val(),
            type: 'GET',
            datatype: 'json',
            success: function (result) {
                var PriorityDay = $('#DayCombo');
                PriorityDay.empty();
                $.each(result, function (i, Priorities) {
                    $("<option></option>").val(Priorities.Id).text(Priorities.Days).appendTo(PriorityDay);
                
                });
                AddDueDatePriority()
            }
        });
    
}

//function AddDueDatePriority() {
//    debugger;
//    var date = new Date();

//    date.setDate(date.getDate() + $('#DayCombo').val())

//    var day = date.getDate();
//    var month = date.getMonth() + 1;
//    var year = date.getFullYear();

//    if (month < 10) month = "0" + month;
//    if (day < 10) day = "0" + day;

//    var today = year + "-" + month + "-" + day;
//    $("#DueDate").attr("value", today);

//}

function AddDueDatePriority() {

    var date = new Date();

    if ($('#Priorities').text() == "Choose Priority" || ($('#Priorities').val() == 0)) {

        date.setDate(date.getDate())
    }

    if ($('#Priorities').val() == 1 || ($('#Priorities').text() == "Low")) {

        date.setDate(date.getDate() + 30)

    }

    if ($('#Priorities').val() == 2 || ($('#Priorities').text() == "Medium")) {

        date.setDate(date.getDate() + 14)
    }

    if ($('#Priorities').val() == 3 || ($('#Priorities').text() == "Hiigh")) {

        date.setDate(date.getDate() + 7)
    }
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;
    $("#DueDate").attr("value", today);

}


function LoadCategoryCombo() {
    $.ajax({
        url: 'http://localhost:11609/api/Categories',
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var Category = $('#Categories');
            $.each(result, function (i, Categories) {
                $("<option></option>").val(Categories.Id).text(Categories.Name).appendTo(Category);
            });
        }
    });
}

function LoadSubCategoryCombo() {
    $.ajax({
        url: 'http://localhost:11609/api/SubCategories',
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var SubCategory = $('#SubCategories');
            SubCategory.empty();
            SubCategory.append($('<option/>').val('0').text('Select Sub Category'));
            $.each(result, function (i, SubCategories) {
                $("<option></option>").val(SubCategories.Id).text(SubCategories.Name).appendTo(SubCategory);
            });
        }
    });
}

function LoadSubCategoryComboFk() {
    $.ajax({
        url: 'http://localhost:11609/api/SubCategories/GetFk/' + $('#Categories').val(),
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var SubCategory = $('#SubCategories');
            SubCategory.empty();
            SubCategory.append($('<option/>').val('0').text('Select Sub Category'));
            $.each(result, function (i, SubCategories) {
                $("<option></option>").val(SubCategories.Id).text(SubCategories.Name).appendTo(SubCategory);
            });
        }
    });
}

function LoadRoleCombo() {
    $.ajax({
        url: 'http://localhost:11609/api/Roles',
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var Role = $('#Roles');
            $.each(result, function (i, Roles) {
                $("<option></option>").val(Roles.Id).text(Roles.Name).appendTo(Role);
            });
        }
    });
}

function LoadStaffCombo() {
    $.ajax({
        url: 'http://localhost:11609/api/Staffs',
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var Staff = $('#Staffs');
            Staff.empty();
            Staff.append($('<option/>').val('0').text('Select Staff'));
            $.each(result, function (i, Staffs) {
                $("<option></option>").val(Staffs.Id).text(Staffs.FirstName).appendTo(Staff);
            });
        }
    });
}

function LoadStaffComboFk() {
    $.ajax({
        url: 'http://localhost:11609/api/Staffs/GetFk/' + $('#Roles').val(),
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var Staff = $('#Staffs');
            Staff.empty();
            Staff.append($('<option/>').val('0').text('Select Staff'));
            $.each(result, function (i, Staffs) {
                $("<option></option>").val(Staffs.Id).text(Staffs.FirstName).appendTo(Staff);
            });
        }
    });
}

function LoadQuota() {
    $.ajax({
        url: 'http://localhost:11609/api/Quotas/GetFk/' + $('#Staffs').val(),
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var quota = $('#Quotas');
            quota.empty();
            $.each(result, function (i, Quotas) {
                $("<option></option>").val(Quotas.Id).text(Quotas.Total).appendTo(quota);

            });
            AddDueDatePriority()
        }
    });

}

function LoadStatusCombo() {
    $.ajax({
        url: 'http://localhost:11609/api/Statuses',
        type: 'GET',
        datatype: 'json',
        success: function (result) {
            var Status = $('#Statuses');
            $.each(result, function (i, Statuses) {
                $("<option></option>").val(Statuses.Id).text(Statuses.Name).appendTo(Status);
            });
        }
    });
}

function Edit() {
    var ticketProgres = new Object();
    ticketProgres.Tickets = $('#TicketId').val();
    ticketProgres.Id = $('#Id').val();
    ticketProgres.Staffs = $('#Staffs').val();
    ticketProgres.Statuses = $('#Statuses').val();
    $.ajax({
        url: 'http://localhost:11609/api/TicketProgresses/' + ticketProgres.Id,
        type: 'PUT',
        data: ticketProgres,
        dataType: 'json',
        success: function (response) {
            var ticket = new Object();
            ticket.Id = $('#TicketId').val();
            ticket.Problem = $('#Problem').val();
            ticket.Solution = $('#Solution').val();
            ticket.Priorities = $('#Priorities').val();
            ticket.DueDate = $('#DueDate').val();
            ticket.Categories = $('#Categories').val();
            ticket.SubCategories = $('#SubCategories').val();
            $.ajax({
                url: 'http://localhost:11609/api/Tickets/' + ticket.Id,
                type: 'PUT',
                data: ticket,
                dataType: 'json',
                success: function (response) {
                    swal({
                        title: "Assigned!",
                        text: "The Problem has been Assigned!",
                        type: "success"
                    },
            function () {
                //window.location.href = '/Tickets/Index/';
                LoadIndexTicketProgress();
                $('#myModal').modal('hide');
                $('#Id').val('');
                $('#Statuses').val('Choose Status');
            });
                },
                error: function (response) {
                    swal("Oops", "We couldn't connect to the server!", "error");
                }
            });
        }
    });
}


function GetById(Id) {
    $.ajax({
        url: 'http://localhost:11609/api/TicketProgresses/' + Id,
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            $('#TicketId').val(result.Tickets.Id);
            $('#Id').val(result.Id);
            $('#Problem').val(result.Tickets.Problem);
            $('#Solution').val(result.Tickets.Solution);
            //$('#Staff').val(result.Staffs.FirstName);
            //$('#Priorities').val(result.Tickets.Priorities.Id);
            //$('#DayCombo').val(result.Tickets.Priorities.Id);
            //$('#DueDate').val(result.Tickets.DueDate);
            //$('#Categories').val(result.Tickets.Categories.Id);
            //$('#SubCategories').val(result.Tickets.SubCategories.Id);
            //$('#Roles').val(result.Staffs.Roles.Id);
            //$('#Staffs').val(result.Staffs.Id);
            $('#Statuses').val(result.Statuses.Id);

            $('#myModal').modal('show');
            $('#Save').hide();
            $('#Update').show();
        }
    })
}

function ClearScreen() {
    $('#myModal').on('hidden.bs.modal', function () {
        $('#Id').val('');
        $('#Priorities').val('0');
        $('#DayCombo').val('');
        DueDate();
        $('#Categories').val('0');
        $('#SubCategories').val('0');
        $('#Roles').val('0');
        $('#Staffs').val('0');
        $('#Statuses').val('0');
        $('#Update').hide();
        $('#Save').show();
    });
};

function ValidationSave() {
    // asumsi semua text box valid
    var isAllValid = true

    //cek textbox name
    if ($('#Priorities').val() == "Choose Priority" || ($('#Priorities').val() == 0)) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Priorities').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Priorities').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#DayCombo').val() == "Choose Priority" || ($('#DayCombo').val() == 0) || ($('#DayCombo').val() == "")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#DayCombo').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#DayCombo').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#DueDate').val() == "mm/dd/yyy" || ($('#DueDate').val() == 0)) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#DueDate').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#DueDate').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Categories').val() == "Choose Category" || ($('#Categories').val() == 0)) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Categories').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Categories').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#SubCategories').val() == "Choose Sub Category" || ($('#SubCategories').val() == 0)) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#SubCategories').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#SubCategories').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Roles').val() == "Choose Roles" || ($('#Roles').val() == 0)) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Roles').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Roles').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Staffs').val() == "Choose Staffs" || ($('#Staffs').val() == 0)) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Staffs').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Staffs').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Status').val() == "Choose Status" || ($('#Status').val() == 0)) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Status').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Status').siblings('span.error').css('visibility', 'hidden');
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
    if ($('#Priorities').val() == "Choose Priority" || ($('#Priorities').val() == 0)) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Priorities').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Priorities').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#DayCombo').val() == "Choose Priority" || ($('#DayCombo').val() == 0) || ($('#DayCombo').val() == "")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#DayCombo').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#DayCombo').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#DueDate').val() == "mm/dd/yyy" || ($('#DueDate').val() == 0)) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#DueDate').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#DueDate').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Categories').val() == "Choose Category" || ($('#Categories').val() == 0)) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Categories').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Categories').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#SubCategories').val() == "Choose Sub Category" || ($('#SubCategories').val() == 0)) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#SubCategories').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#SubCategories').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Roles').val() == "Choose Roles" || ($('#Roles').val() == 0)) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Roles').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Roles').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Staffs').val() == "Choose Staffs" || ($('#Staffs').val() == 0)) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Staffs').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Staffs').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Statuses').val() == "Choose Status" || ($('#Statuses').val() == 0)) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Statuses').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Statuses').siblings('span.error').css('visibility', 'hidden');
    }

    //kalau semua fild terisi
    if (isAllValid) {
        Edit();
    }
}

//untuk menghide notifikasi validasi agar tidak muncul saat pertamakali di load
function LoadHiddenNotification() {
    $('#Priorities').siblings('span.error').css('visibility', 'hidden');
    $('#DayCombo').siblings('span.error').css('visibility', 'hidden');
    $('#DueDate').siblings('span.error').css('visibility', 'hidden');
    $('#Categories').siblings('span.error').css('visibility', 'hidden');
    $('#SubCategories').siblings('span.error').css('visibility', 'hidden');
    $('#Roles').siblings('span.error').css('visibility', 'hidden');
    $('#Staffs').siblings('span.error').css('visibility', 'hidden');
    $('#Quotas').siblings('span.error').css('visibility', 'hidden');
    $('#Statuses').siblings('span.error').css('visibility', 'hidden');
}
