function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    var path = "path=/";
    document.cookie = cname + "=" + cvalue + "; " + path + ";" + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function handleGeneralInvalidRequest() {
    alert("Sorry, invalid request");
}

function isShippingComplete(shipping) {
    return shipping.Address1 != "" && shipping.Address1 != null
                && shipping.City != "" && shipping.City != null
                && shipping.State != "" && shipping.State != null
                && shipping.Zip != "" && shipping.Zip != null
                && shipping.FirstName != "" && shipping.FirstName != null
                && shipping.LastName != "" && shipping.LastName != null;
}

function isPersonalInformationComplete(personalInformation) {
    return personalInformation.Email != "" && personalInformation.Email != null && personalInformation.Phone != "" && personalInformation.Phone != null;
}

function isBillingInformationComplete(billing) {
    return billing.Address1 != "" && billing != null
                && billing.City != "" && billing.City != null
                && billing.State != "" && billing.State != null
                && billing.Zip != "" && billing.Zip != null
                && billing.FullName != "" && billing.FullName != null
                && billing.Number != "" && billing.Number != null
                && billing.Pin != "" && billing.Pin != null
                && billing.Expiration != "" && billing.Expiration != null;
}

function handleBillingDisplay(isBillingComplete) {
    if (isBillingComplete) {
        jQuery("#billing").removeClass("in").addClass("collapse");
    } else {
        jQuery("#billing").addClass("in");
    }
}

function handleShippingDisplay(isShippingComplete) {
    if (isShippingComplete) {
        jQuery("#shipping").removeClass("in").addClass("collapse");
    } else {
        jQuery("#shipping").addClass("in");
    }
}

function handleContactDisplay(isContactComplete) {
    if (isContactComplete) {
        jQuery("#contact").removeClass("in").addClass("collapse");
    } else {
        jQuery("#contact").addClass("in");
    }
}

var testAngularApp = angular.module("Checkout", []).controller("CheckoutTest", ["$scope", "$sce", "$http", function ($scope, $sce, $http) {
    $scope.ApiEndpoint = "cart";
    $scope.Billing = {};
    $scope.Shipping = {};
    $scope.PersonalInformation = {};
    $scope.CartItems = [];
    $scope.ItemToAdd = {};
    $scope.SameAsShipping = false;
    
    $scope.CartId = "";
    $scope.AddToCartUrl = "";
    $scope.UpdateShippingProfileURL = "";
    $scope.UpdateBillingProfileURL = "";
    $scope.UpdatePersonalInformationURL = "";

    $scope.GetCartItemsUrl = "";
    $scope.GetShippingInformationUrl = "";
    $scope.GetBillingInformationUrl = "";
    $scope.GetPersonalInformationUrl = "";

    $scope.CartIsInitialized = false;
    $scope.ShipingIsComplete = false;
    $scope.BillingIsComplete = false;
    $scope.PersonalInformationIsComplete = false;

    $scope.HandleSameAsShipping = function () {
        if ($scope.SameAsShipping) {
            $scope.SameAsShipping = false;
        } else {
            $scope.SameAsShipping = true;

            $http({
                method: "GET",
                url: $scope.GetShippingInformationUrl,
                headers: { 'token': Date.now() + "/" + $scope.CartId }
            }).then(function (response) {
                $scope.UpdateShippingProfileURL = response.data.PostShippingAddress;
                $scope.Billing.shipAddress1 = response.data.Address1;
                $scope.Billing.shipAddress2 = response.data.Address2;
                $scope.Billing.city = response.data.City;
                $scope.Billing.state = response.data.State;
                $scope.Billing.zip = response.data.Zip;
                $scope.SubmittBillingInfo();
            });
        }
    }

    $scope.GetCartItems = function () {
        $http({
            method: "GET",
            url: $scope.GetCartItemsUrl,
            headers: { 'token': Date.now() + "/" + $scope.CartId }
        }).then(function (response) {
            $scope.AddToCartUrl = response.data.AddProductLink;
            $scope.CartItems = response.data.Products;
        });
    };

    $scope.GetShippingInfo = function () {
        $http({
            method: "GET",
            url: $scope.GetShippingInformationUrl,
            headers: { 'token': Date.now() + "/" + $scope.CartId }
        }).then(function (response) {
            $scope.UpdateShippingProfileURL = response.data.PostShippingAddress;
            $scope.Shipping.shipAddress1 = response.data.Address1;
            $scope.Shipping.shipAddress2 = response.data.Address2;
            $scope.Shipping.city = response.data.City;
            $scope.Shipping.state = response.data.State;
            $scope.Shipping.zip = response.data.Zip;
            $scope.Shipping.firstName = response.data.FirstName;
            $scope.Shipping.lastName = response.data.LastName;
            $scope.Shipping.Errors = response.data.Errors;

            var shippingIsComplete = isShippingComplete(response.data);

            $scope.ShipingIsComplete = shippingIsComplete;

            handleShippingDisplay(shippingIsComplete);
        });
    }

    $scope.GetPersonalInfo = function () {
        $http({
            method: "GET",
            url: $scope.GetPersonalInformationUrl,
            headers: { 'token': Date.now() + "/" + $scope.CartId }
        }).then(function (response) {
            $scope.UpdatePersonalInformationURL = response.data.PersonalInformationPostUrl;
            $scope.PersonalInformation.Email = response.data.Email;
            $scope.PersonalInformation.Phone = response.data.Phone;
            var personalInformationIsComplete = isPersonalInformationComplete(response.data);
            $scope.PersonalInformationIsComplete = personalInformationIsComplete;
            handleContactDisplay(personalInformationIsComplete);
        });
    }

    $scope.GetBillingInfo = function () {
        $http({
            method: "GET",
            url: $scope.GetBillingInformationUrl,
            headers: { 'token': Date.now() + "/" + $scope.CartId }
        }).then(function (response) {
            $scope.UpdateBillingProfileURL = response.data.BillingPostRequest;
            $scope.Billing.shipAddress1 = response.data.Address1;
            $scope.Billing.shipAddress2 = response.data.Address2;
            $scope.Billing.city = response.data.City;
            $scope.Billing.state = response.data.State;
            $scope.Billing.zip = response.data.Zip;
            $scope.Billing.fullName = response.data.FullName;
            $scope.Billing.cardNumber = response.data.Number;
            $scope.Billing.cvv = response.data.Pin;
            if (response.data.Expiration != null && response.data.Expiration.indexOf("/") > -1) {
                $scope.Billing.month = response.data.Expiration.split("/")[0];
                $scope.Billing.year = response.data.Expiration.split("/")[1];
            }
            var billintIsComplete = isBillingInformationComplete(response.data);

            $scope.BillingIsComplete = billintIsComplete;

            handleBillingDisplay(billintIsComplete);
        });
    }

    $scope.setupCart = function (data) {
        $scope.CartId = data.CartId;
        setCookie("cartId", data.CartId, 1);

        $scope.GetCartItemsUrl = data.CartItemsInformation;
        $scope.GetShippingInformationUrl = data.ShippingProfile;
        $scope.GetBillingInformationUrl = data.BillingProfile;
        $scope.GetPersonalInformationUrl = data.PersonalInformation;

        $scope.GetCartItems();
        $scope.GetShippingInfo();
        $scope.GetBillingInfo();
        $scope.GetPersonalInfo();

        $scope.CartIsInitialized = true;
    };

    $scope.CreateNewCart = function () {
        $http({
            method: "GET",
            url: $scope.ApiEndpoint,
            headers: { 'token': Date.now() }
        }).then(function (response) {
            $scope.setupCart(response.data);
        });
    };

    $scope.RestoreCartInformation = function () {
        $http({
            method: "GET",
            url: $scope.ApiEndpoint,
            headers: { 'token': Date.now() + "/" + $scope.CartId }
        }).then(function (response) {
            $scope.setupCart(response.data);
        });
    };

    $scope.AddCartItem = function () {
        $http({
            method: "POST",
            url: $scope.AddToCartUrl,
            data: {
                "CartId": $scope.CartId,
                "ProductId": $scope.ItemToAdd.id,
                "ProductQty": $scope.ItemToAdd.quantity,
            },
            headers: { 'token': Date.now() + "/" + $scope.CartId }
        }).then(function (response) {
            $scope.ItemToAdd = {};
            $scope.CartItems.push(response.data);
        }, handleGeneralInvalidRequest);
    };

    $scope.SubmittShippingInfo = function () {
        $http({
            method: "POST",
            url: $scope.UpdateShippingProfileURL,
            data: {
                "CartId": $scope.CartId,
                "FirstName": $scope.Shipping.firstName,
                "LastName": $scope.Shipping.lastName,
                "Address1": $scope.Shipping.shipAddress1,
                "Address2": $scope.Shipping.shipAddress2,
                "City": $scope.Shipping.city,
                "State": $scope.Shipping.state,
                "Zip": $scope.Shipping.zip
            },
            headers: { 'token': Date.now() + "/" + $scope.CartId }
        }).then(function (response) {
            $scope.Shipping.Errors = response.data.Errors;
            var shippingIsComplete = isShippingComplete(response.data);

            $scope.ShipingIsComplete = shippingIsComplete;

            handleShippingDisplay(shippingIsComplete);
        });
    }

    $scope.SubmittBillingInfo = function () {
        $http({
            method: "POST",
            url: $scope.UpdateBillingProfileURL,
            data: {
                "CartId": $scope.CartId,
                "FullName": $scope.Billing.fullName,
                "Address1": $scope.Billing.shipAddress1,
                "Address2": $scope.Billing.shipAddress2,
                "City": $scope.Billing.city,
                "State": $scope.Billing.state,
                "Zip": $scope.Billing.zip,
                "Number": $scope.Billing.cardNumber,
                "Expiration": $scope.Billing.month + "/" + $scope.Billing.year,
                "Pin": $scope.Billing.cvv
            },
            headers: { 'token': Date.now() + "/" + $scope.CartId }
        }).then(function (response) {
            var billintIsComplete = isBillingInformationComplete(response.data);

            $scope.BillingIsComplete = billintIsComplete;

            handleBillingDisplay(billintIsComplete);
        });
    }

    $scope.SubmittPersonalInfo = function () {
        $http({
            method: "POST",
            url: $scope.UpdatePersonalInformationURL,
            data: {
                "CartId": $scope.CartId,
                "Email": $scope.PersonalInformation.Email,
                "Phone": $scope.PersonalInformation.Phone
            },
            headers: { 'token': Date.now() + "/" + $scope.CartId }
        }).then(function (response) {
            var personalInformationIsComplete = isPersonalInformationComplete(response.data);
            $scope.PersonalInformationIsComplete = personalInformationIsComplete;
            handleContactDisplay(personalInformationIsComplete);
        });
    }

    $scope.UpdateItemQty = function (item) {
        var re = /{productQty}/gi;
        var url = item.UpdateLink.replace(re, item.Quantity);
        $http({
            method: "GET",
            url: url,
            headers: { 'token': Date.now() + "/" + $scope.CartId }
        }).then(function (response) {
            if (response.data === "Removed") {
                $scope.CartItems.splice($scope.CartItems.indexOf(item), 1);
            }
        });
    }

    $scope.RemoveItem = function (item) {
        var url = item.DeleteLink;
        $http({
            method: "GET",
            url: url,
            headers: { 'token': Date.now() + "/" + $scope.CartId }
        }).then(function () {
            $scope.CartItems.splice($scope.CartItems.indexOf(item), 1);
        });
    }

    $scope.RestoreSession = function () {
        var cartId = getCookie("cartId");
        if (cartId != "") {
            $scope.CartId = cartId;
            $scope.RestoreCartInformation();
        }
    }

    $scope.RestoreSession();
}]);