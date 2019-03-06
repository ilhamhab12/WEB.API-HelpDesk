$(document).ready(function () {
    LoadHiddenNotification();
    ClearScreen();
})

function Login() {
    //debugger;
    var customer = new Object();
    customer.Username = $('#Username').val();
    customer.Password = $('#Password').val();
    $.ajax({
        url: 'http://localhost:11609/api/Customers/Login/',
        type: 'GET',
        data: customer,
        dataType: 'json',
        success: function (request, response) {
            if (request == null)
            {
                swal("Failed", "Username or Password Incorrect", "error");
            } else {
                swal({
                    title: "Success!",
                    text: "Login Successfuly!",
                    type: "success"
                },
            function () {
                //action = "http://localhost:20494/Home/Index"
                window.location.href = "http://localhost:20494/Home/Index";
                //window.location.href = '/Tickets/Index/';
                //LoadIndexCustomer();
                //$('#myModal').modal('hide');
            });
            }
            
        },
        error: function (response) {
            swal("Oops", "You culd connect to the server", "error");
        }

    });
}

//function Login() {
//    //debugger;
//    var customer = new Object();
//    customer.Username = $('#Username').val();
//    customer.Password = $('#Password').val();
//    $.ajax({
//        url: 'http://localhost:11609/api/Customers/Login/',
//        type: 'GET',
//        data: customer,
//        dataType: 'json',
//        success: function (response) {
//            swal({
//                title: "Logged!",
//                text: "Login Successfuly!",
//                type: "success"
//            },
//            function () {
//                window.location.href = '/Customers/Index/';
//                //LoadIndexCustomer();
//                //$('#myModal').modal('hide');
//            });
//        },
//        error: function (response) {
//            swal("Oops", "Login Failed", "error");
//        }
        
//    });
//}


function ClearScreen() {
    $('#Username').val('');
    $('#Password').val('');
    //$('#myModal').on('hidden.bs.modal', function () {
        
    //});
};

function ValidationLogin() {
    // asumsi semua text box valid
    var isAllValid = true

    //cek textbox name
    if ($('#Username').val() == "" || ($('#Username').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Username').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Username').siblings('span.error').css('visibility', 'hidden');
    }

    if ($('#Password').val() == "" || ($('#Password').val() == " ")) {
        isAllValid = false; //kalau textbox nama kosong maka
        $('#Password').siblings('span.error').css('visibility', 'visible'); //notifikasi validasi muncul
    }
    else {
        $('#Password').siblings('span.error').css('visibility', 'hidden');
    }

    //kalau semua fild terisi
    if (isAllValid) {
        Login();
    }
}

//untuk menghide notifikasi validasi agar tidak muncul saat pertamakali di load
function LoadHiddenNotification() {
    $('#Username').siblings('span.error').css('visibility', 'hidden');
    $('#Password').siblings('span.error').css('visibility', 'hidden');
}
