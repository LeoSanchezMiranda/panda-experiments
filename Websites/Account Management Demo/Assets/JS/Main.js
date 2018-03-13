// What do we still need to do here?

// Completeness bar? -- Sounds like we might not test this.
// Addresses need to be able to be linked to the credit card page dropdown. (just the street.address part).
// Display success/failure messages?


//MISC FUNCTIONS

function closeAllBlocks() {
    jQuery(".block").removeClass("is-edditing");
    jQuery(".is-hidden").removeClass("is-hidden");
    updateProfilePage();
}

function toggleBlock(block) {
    jQuery(block).toggleClass("is-edditing");
}

function profileExists() {
    profile = JSON.parse(localStorage.getItem("profile"));
    if (profile == null || profile.firstname == null || profile.firstname == undefined || profile.firstname == "") {
        return false;
    }
    return true;
}

function setVariablesFromLocalStorage() {
    console.log("data present...");
    profile = JSON.parse(localStorage.getItem("profile"));
    addresses = JSON.parse(localStorage.getItem("addresses"));
    creditCards = JSON.parse(localStorage.getItem("creditCards"));
    console.log("Welcome back " + profile.firstname);
    showLog();

    jQuery(".item-list .block").remove();

    for (i in addresses) {
        addAddressDOM(addresses[i]);
    }

    for (i in creditCards) {
        addCardDOM(creditCards[i]);
    }

    jQuery("#billing .add.block select").first().find("option:not(:first-child)").remove();
    jQuery("#billing .add.block select").first().find("option").first().after(getAddressesDropdown(0));

    var y = setTimeout(updateProfilePage, 300);


    updateProgress();
}

function showLog() {
    console.log("-------------------------");
    console.log("Profile:");
    console.log(profile);
    console.log("Addresses:");
    console.log(addresses);
    console.log("Credit Cards:");
    console.log(creditCards);
    console.log("-------------------------");
}

function saveChanges() {
    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("addresses", JSON.stringify(addresses));
    localStorage.setItem("creditCards", JSON.stringify(creditCards));
    updateProgress();
}

function getWidth() {
    //http://stackoverflow.com/questions/1038727/how-to-get-browser-width-using-javascript-code
    var x = 0;
    if (self.innerHeight) {
        x = self.innerWidth;
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
        x = document.documentElement.clientWidth;
    }
    else if (document.body) {
        x = document.body.clientWidth;
    }
    return x;
}

function eraseAll() {
    addresses = [];
    creditCards = [];
    var myProfile = new person("", "", "", "", "", "", "", false);
    editProfile(myProfile);
    setVariablesFromLocalStorage();
    updateProfilePage();
    showLog();
}

function checkProgress() {
    var progress = 0;
    if (profile.email != "") { progress += 14.2857; }
    if (profile.firstname != "") { progress += 7.14285; }
    if (profile.lastname != "") { progress += 7.14285; }
    if (profile.password != "") { progress += 14.2857; }
    if (profile.birthday != "") { progress += 14.2857; }
    if (profile.phone != "") { progress += 14.2857; }
    if (addresses.length) { progress += 14.2857; }
    if (creditCards.length) { progress += 14.2857; }
    return Math.round(progress);
}

function getDataFromZip(zipCode, target) {
    var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&sensor=true";
    if (zipCode in cache) {
        handleZip(cache[zipcode], target);
    }
    $.ajax({
        "url": url,
        "dataType": "json"
    }).done(function (data) {
        cache[zipCode] = data;
        handleZip(data, target);
    }).fail(function (data) {
        console.log('Request failed.');
    });
}

function handleZip(data, target) {
    zip = data;
    var city = data.results[0].address_components[1].long_name;
    var state = data.results[0].address_components[2].short_name;
    var country = data.results[0].address_components[3].long_name;
    var citystate = city + ", " + state;

    target.find("input[name=citystate]").first().val(citystate);
    target.find("input[name=country]").first().val(country);

}

//DOM OPERATIONS

function updateProgress() {
    jQuery(".progress").remove();
    return;
    var progress = checkProgress();
    if (progress < 100) {
        jQuery("header").after("<div style='width: 20%; margin-left: 1%;' class='progress'>" +
            "<div class='progress-bar'  role='progressbar' aria-valuenow='" + progress + "' aria-valuemin='0' aria-valuemax=100' style='width: " + progress + "%'>" +
            "<span>" + progress + "%</span>");
    }
}

function updateProfilePage() {
    var date = "";
    if (profile.birthday != "") {
        date = profile.birthday.substr(5, 2) + "/" + profile.birthday.substr(8, 2) + "/" + profile.birthday.substr(0, 4)
    }

    jQuery(".email > .block-header span").text(profile.email);
    jQuery(".phone > .block-header span").text(profile.phone);
    jQuery(".name > .block-header span").text(profile.prefix + " " + profile.firstname + " " + profile.lastname);
    jQuery(".password > .block-header span").text(profile.password != "" ? "●●●●●●●●●" : "");
    jQuery(".birthday > .block-header span").text(date);

    jQuery("input[name=email]").val(profile.email);
    jQuery("input[name=prefix]").val(profile.prefix);
    jQuery("input[name=firstname]").val(profile.firstname);
    jQuery("input[name=lastname]").val(profile.lastname);
    jQuery("input[name=phone]").val(profile.phone);
    jQuery("input[name=password]").val(profile.password != "" ? "●●●●●●●●●" : "");
    jQuery("input[name=birthday]").val(profile.birthday);

    jQuery(".email > .edit").html((profile.email == "") ? "Add <i class='i-add'></i>" : "Edit <i class='i-compose'></i>");
    jQuery(".phone > .edit").html((profile.phone == "") ? "Add <i class='i-add'></i>" : "Edit <i class='i-compose'></i>");
    jQuery(".name > .edit").html((profile.firstname == "") ? "Add <i class='i-add'></i>" : "Edit <i class='i-compose'></i>");
    jQuery(".name > .edit").html((profile.lastname == "") ? "Add <i class='i-add'></i>" : "Edit <i class='i-compose'></i>");
    jQuery(".password > .edit").html((profile.password == "") ? "Add <i class='i-add'></i>" : "Edit <i class='i-compose'></i>");
    jQuery(".birthday > .edit").html((profile.birthday == "") ? "Add <i class='i-add'></i>" : "Edit <i class='i-compose'></i>");

    if (!profile.infoIsPrivate) {
        jQuery("input[name=privacy]").removeProp("checked");
    }
}

function addAddressDOM(address) {
    var defaultText = address.isDefault ? "<span class='default' '>This is your default Address</span>" : "<a class='setDefault'><span><input type='radio'/>Set this as your default address.</span></a>";
    var addressDOM = '<div class="address block">' +
            '<span class="edit">Edit <i class="i-compose"></i></span>' +
            '<span class="delete">Delete <i class="i-cross"></i></span>' +
            '<h3 class="block-header text-header">' +
                address.street + '<b class="mobile-content"> ... </b>' +
                '<span class="full-content">' + address.citystate + '</span>' +
                '<span class="full-content">' + address.country + '</span>' +
                '<span class="full-content">' + address.zip + '</span>' +
                '<span class="default-message">' + defaultText + '</span>' +
            '</h3>' +
            '<h3 class="block-header seperate-header">Edit' + ' ' + '&quot;' + address.street + '&quot;' + ' ...' + '</h3>' +
            '<div class="content">' +
                '<input name="id" type="hidden" value="' + address.id + '" />' +
                '<input name="isDefault" type="hidden" value="' + address.isDefault + '" />' +
                '<label>Street Address*<input name="street" type="text" placeholder="N Fake Street 1234" value="' + address.street + '" /></label>' +
                '<label>City & State*<input name="citystate" type="text" placeholder="Columbia, MO" value="' + address.citystate + '" /></label>' +
                '<label>Zip*<input name="zip" type="text" placeholder="65203" value="' + address.zip + '" /></label>' +
                '<label>Country*<input name="country" type="text" placeholder="United States" value="' + address.country + '" /></label>' +
                '<span class="actions"><a class="save btn btn-primary">Save</a> | <a class="cancel">Cancel</a></span>' +
            '</div>' +
        '</div>';
    jQuery("#addresses .item-list").append(addressDOM);
}

function addCardDOM(card) {

    var street = "";

    for (i in addresses) {
        if (addresses[i].id == card.address) {
            street = addresses[i].street;
        }
    }

    var defaultText = card.isDefault ? "<span class='default' '>This is your default Card</span>" : "<a class='setDefault'><input type='radio'/>Set this as your default Card.</a>";
    var cardDOM = '<div class="card block">' +
            '<span class="edit">Edit <i class="i-compose"></i></span>' +
            '<span class="delete">Delete <i class="i-cross"></i></span>' +
            '<img class="card-image" src="http://placehold.it/60x40" />' +
            '<div class="header-group"><h3 class="block-header">Ends in' +
            '<h3 class="block-header text-header">' + card.number.substr(card.number.length - 4) + '</h3></div>' +
            '<div class="header-group"><h3 class="block-header">Expires in</h3>' +
            '<h3 class="block-header text-header">' + card.expiration + '</h3></div>' +
            '<h3 class="block-header seperate-header">Edit Visa #' + card.number.substr(card.number.length - 4) + '</h3>' +
            '<span class="full-content">' + street + '</span>' +
            '<span class="default-message">' + defaultText + '</span>' +
            '<div class="content">' +
                '<input name="id" type="hidden" value="' + card.id + '" />' +
                '<input name="isDefault" type="hidden" value="' + card.isDefault + '" />' +
                '<label>Name on Card*<input name="name" type="text" placeholder="John Doe" value="' + card.name + '"></label>' +
                '<label>Card Number*<input name="number" type="text" placeholder="XXXX-XXXX-XXXX-XXXX" value="' + card.number + '"></label>' +
                '<label>CID*<input name="cid" type="password" placeholder="123" value="' + card.code + '"></label>' +
                '<label>Address*<select class="card-address-dropdown"><option disabled>Select an Address</option>' +
                getAddressesDropdown(card.address) +
                ' <option>Add a new address</option> </select></label>' +
                '<label>Expiration Date*<input name="expdate" type="text" placeholder="05/19" value="' + card.expiration + '"></label>' +
                '<span class="actions"><a class="save btn btn-primary">Save</a> | <a class="cancel">Cancel</a></span>' +
            '</div>' +
          '</div>';
    jQuery("#billing .item-list").append(cardDOM);
}

function getAddressesDropdown(creditCardAddressID) {
    var html = "";
    var selected = "";

    for (i in addresses) {
        selected = (addresses[i].id == creditCardAddressID) ? "selected" : "";
        var node = '<option value="' + addresses[i].id + '" ' + selected + '>' + addresses[i].street + '</option>';
        html += node;
    }

    return html;
}

function undoDeleteAddress(address) {

    var form = jQuery("#addresses .add.block .content");

    form.find("input[name=street]").first().val(address.street);
    form.find("input[name=zip]").first().val(address.zip);
    form.find("input[name=citystate]").first().val(address.citystate);
    form.find("input[name=country]").first().val(address.country);
    form.find("input[name=default]").prop('checked', address.isDefault);


    var box = '<div class="undo alert alert-success alert-dismissable">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                '<span>' + '&quot;' + address.street + '&quot;' + ' ' + 'was deleted.</span> ' +
                '<a class="undo-button btn btn-success btn-xs">Undo</a>' +
            '</div>';

    jQuery("#addresses").prepend(box);
}

function undoDeleteCreditCard(card) {

    var form = jQuery("#billing .add.block .content");

    form.find("input[name=name]").first().val(card.name);
    form.find("input[name=number]").first().val(card.number);
    form.find("input[name=cid]").first().val(card.cid);
    form.find("select option").removeProp("selected");
    form.find("select option[value=" + card.address + "]").first().prop("selected", "selected");
    form.find("input[name=expdate]").first().val(card.expdate);
    form.find("input[name=default]").prop('checked', card.isDefault);

    var box = '<div class="undo alert alert-success alert-dismissable">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                '<span>' + 'Card #' + card.number.substr(card.number.length - 4) + ' ' + 'was deleted.</span> ' +
                '<a class="undo-button btn btn-success btn-xs">Undo</a>' +
            '</div>';

    jQuery("#billing").prepend(box);
}

//OBJECTS

function person(prefix, firstname, lastname, email, password, birthday, phone, infoIsPrivate) {
    this.prefix = prefix;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.birthday = birthday;
    this.phone = phone;
    this.infoIsPrivate = infoIsPrivate;
}

function address(id, street, citystate, zip, country, isDefault) {
    this.id = id;
    this.street = street;
    this.citystate = citystate;
    this.zip = zip;
    this.country = country;
    this.isDefault = isDefault;
}

function creditCard(id, name, number, expiration, code, address, isDefault) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.expiration = expiration;
    this.code = code;
    this.address = address;
    this.isDefault = isDefault;
}

function notification(id, type, image, text, date) {
    this.id = id;
    this.type = type;
    this.image = image;
    this.text = text;
    this.date = date;
}

//OBJECT OPERATIONS AND JSON INTERACTIONS

function addAddress(address) {
    var lastAddressID = 0;
    for (var i = 0; i < addresses.length ; i++) {
        if (addresses[i].id > lastAddressID) {
            lastAddressID = addresses[i].id;
        }
    }
    address.id = lastAddressID + 1;

    var newAddress = mapJsonAddress(address);
    addresses.push(newAddress);
    console.log(address);
    if (address.isDefault) {
        setDefaultAddress(address.id);
    } else {
        saveChanges();
    }
    setVariablesFromLocalStorage();
}

function addCreditCard(card) {
    var lastCardID = 0;
    for (var i = 0; i < creditCards.length ; i++) {
        if (creditCards[i].id > lastCardID) {
            lastCardID = creditCards[i].id;
        }
    }
    card.id = lastCardID + 1;
    var newCard = mapJsonCreditCard(card);
    creditCards.push(newCard);
    if (card.isDefault) {
        setDefaultCreditCard(card.id);
    } else {
        saveChanges();
    }
    setVariablesFromLocalStorage();
}

function editProfile(myProfile) {
    profile = mapJsonProfile(myProfile);
    saveChanges();
}

function editAddress(address) {
    var newAddress = mapJsonAddress(address);
    console.log(newAddress);
    for (i in addresses) {
        if (addresses[i].id == newAddress.id) {
            addresses[i] = newAddress;
        }
    }
    saveChanges();
    setVariablesFromLocalStorage();
}

function editCreditCard(card) {
    var newCard = mapJsonCreditCard(card);
    for (i in creditCards) {
        if (creditCards[i].id == newCard.id) {
            creditCards[i] = newCard;
        }
    }
    saveChanges();
}

function setDefaultAddress(newDefaultAddressID) {
    for (var i = 0; i < addresses.length ; i++) {
        addresses[i].isDefault = (addresses[i].id == newDefaultAddressID);
    }
    saveChanges();
}

function setDefaultCreditCard(newDefaultCreditCardID) {
    for (var i = 0; i < creditCards.length ; i++) {
        creditCards[i].isDefault = (creditCards[i].id == newDefaultCreditCardID);
    }
    saveChanges();
}

function removeAddress(removedAddressID) {
    var isDefault = false;
    for (var i = 0 ; i < addresses.length ; i++) {
        if (addresses[i].id == removedAddressID) {
            isDefault = addresses[i].isDefault;
            addresses.splice(i, 1);
        }
    }
    if (isDefault) {
        if (addresses.length) {
            setDefaultAddress(addresses[0].id);
        }
    }
    saveChanges();
}

function removeCard(removedCardID) {
    var isDefault = false;
    for (var i = 0 ; i < creditCards.length ; i++) {
        if (creditCards[i].id == removedCardID) {
            isDefault = creditCards[i].isDefault;
            creditCards.splice(i, 1);
        }
    }
    if (isDefault) {
        if (creditCards.length) {
            setDefaultCreditCard(creditCards[0].id);
        }
    }
    saveChanges();
}

//MAPPERS

function mapJsonProfile(myProfile) {
    var newJsonProfile = { prefix: myProfile.prefix, firstname: myProfile.firstname, lastname: myProfile.lastname, email: myProfile.email, password: myProfile.password, birthday: myProfile.birthday, phone: myProfile.phone, infoIsPrivate: myProfile.infoIsPrivate };
    return newJsonProfile;
}

function mapJsonAddress(address) {
    var newJsonAddress = { id: address.id, street: address.street, citystate: address.citystate, zip: address.zip, country: address.country, isDefault: address.isDefault };
    return newJsonAddress;
}

function mapJsonCreditCard(card) {
    var newJsonCard = { id: card.id, name: card.name, number: card.number, expiration: card.expiration, code: card.code, address: card.address, isDefault: card.isDefault };
    return newJsonCard;
}

//

function initialize() {
    console.log("initializing...");
    var myProfile = new person("", "John", "Doe", "test@customer.com", "password", "", "573-123-1234", true);
    var myAddress = new address(1, "W Brodway 1234", "Columbia, MO", "65203", "USA", true);
    var myCreditCard = new creditCard(1, "John Doe", "4111-1111-1111-1111", "05/18", "123", myAddress.id, true);
    addAddress(myAddress);
    addCreditCard(myCreditCard);
    editProfile(myProfile);
    showLog();
}

function resetData() {
    /*if (!confirm("Do you want to reset all variables?")) {
        console.log("canceled by user");
        return;
    }*/
    profile = '';
    addresses = [];
    creditCards = [];
    console.log("Variables Restarted");
    localStorage.clear();
    console.log("Local Storage Removed");
    initialize();
    console.log("Reseted");
}

function moreInfoPlease() {
    var myAddress = new address(0, "N Brodway 444", "Columbia, MO", "65201", "USA", true);
    addAddress(myAddress);

    var myAddress = new address(0, "Tec Ln 23", "My City, MO", "65663", "USA", true);
    addAddress(myAddress);

    var myCreditCard = new creditCard(0, "Alex Miranda", "4222-2222-2222-2222", "03/20", "456", 2, true);
    addCreditCard(myCreditCard);

    showLog();
}

//DEFINING EMPTY CONTAINERS

var profile = '';
var addresses = [];
var creditCards = [];
var cache = {};
var x;


jQuery(function () {

    //CLICK OPERATIONS
    jQuery(".menu").on("click", "a", function (e) {
        e.preventDefault();
        window.location.hash = jQuery(this).find("span").not("[class^='i-']").first().text();
        jQuery(".menu li").removeClass("is-selected");
        jQuery(this).closest("li").addClass("is-selected");
    });
    jQuery(window).on('hashchange', function () {
        var target = window.location.hash;
        jQuery(".page").removeClass("is-active");
        closeAllBlocks();
        jQuery(target.toLowerCase()).addClass("is-active");
        jQuery(".title").text(target.replace("#", ""));
    });
    jQuery(".page").on("click", ".edit", function (e) {
        e.preventDefault();
        closeAllBlocks();
        toggleBlock(jQuery(this).closest(".block"));
        jQuery(this).closest(".block").find(".content").first().find("input").first().trigger("select");
    });
    jQuery(".page").on("click", ".cancel", function (e) {
        e.preventDefault();
        toggleBlock(jQuery(this).closest(".block"))
    });
    jQuery(".page").on("click", ".undo-button", function (e) {
        e.preventDefault();
        jQuery(this).closest(".page").find(".add.block .save").trigger("click");

    });
    jQuery("main").on("click", ".menu a, .edit, .cancel, .undo-button, .save, .setDefault, .delete, .btn", function () {
        jQuery(".undo").remove();
    });

    jQuery(".page").on("click", ".alert .close", function () {
        jQuery(this).closest(".alert").remove();
        clearTimeout(x);
    });

    //TRASHY FUNCTIONS =(
    jQuery(".email").on("click", ".save", function (e) {
        e.preventDefault();
        var value = jQuery(this).closest(".content").find("input[name=email]").first().val();
        profile.email = value;
        saveChanges();
        updateProfilePage();
        closeAllBlocks();
    });
    jQuery(".password").on("click", ".save", function (e) {
        e.preventDefault();
        var value = jQuery(this).closest(".content").find("input[name=password]").first().val();
        profile.password = value;
        saveChanges();
        updateProfilePage();
        closeAllBlocks();
    });
    jQuery(".birthday").on("click", ".save", function (e) {
        e.preventDefault();
        var value = jQuery(this).closest(".content").find("input[name=birthday]").first().val();
        profile.birthday = value;
        saveChanges();
        updateProfilePage();
        closeAllBlocks();
    });
    jQuery(".phone").on("click", ".save", function (e) {
        e.preventDefault();
        var value = jQuery(this).closest(".content").find("input[name=phone]").first().val();
        profile.phone = value;
        saveChanges();
        updateProfilePage();
        closeAllBlocks();
    });
    jQuery(".name").on("click", ".save", function (e) {
        e.preventDefault();
        var prefix = jQuery(this).closest(".content").find("input[name=prefix]").first().val();
        var firstname = jQuery(this).closest(".content").find("input[name=firstname]").first().val();
        var lastname = jQuery(this).closest(".content").find("input[name=lastname]").first().val();
        profile.prefix = prefix;
        profile.firstname = firstname;
        profile.lastname = lastname;
        saveChanges();
        updateProfilePage();
        closeAllBlocks();
    });
    jQuery("input[name=privacy]").on("change", function () {
        profile.infoIsPrivate = jQuery(this).is(":checked");
        saveChanges();
    });

    //ADDRESS
    jQuery(".add-address").on("click", function (e) {
        e.preventDefault();
        closeAllBlocks();
        jQuery(this).addClass("is-hidden").next(".block.add").addClass("is-edditing").find("input").val("");
    });
    jQuery("#addresses .add.block .cancel").on("click", function (e) {
        e.preventDefault();
        jQuery(".add-address").removeClass("is-hidden");
    });
    jQuery("#addresses .add.block .save").on("click", function (e) {
        e.preventDefault();
        var street = jQuery(this).closest(".content").find("input[name=street]").first().val();
        var zip = jQuery(this).closest(".content").find("input[name=zip]").first().val();
        var citystate = jQuery(this).closest(".content").find("input[name=citystate]").first().val();
        var country = jQuery(this).closest(".content").find("input[name=country]").first().val();
        var isDefault = jQuery(this).closest(".content").find("input[name=default]").first().prop('checked');
        console.log(isDefault);
        var myAddress = new address(0, street, citystate, zip, country, isDefault);
        addAddress(myAddress);
        jQuery(this).closest(".content").find("input").val("");
        closeAllBlocks();
    });
    jQuery("#addresses .item-list").on("click", ".block .save", function (e) {
        e.preventDefault();
        var id = jQuery(this).closest(".content").find("input[name=id]").first().val();
        var isDefault = jQuery(this).closest(".content").find("input[name=isDefault]").first().val() == "true";
        var street = jQuery(this).closest(".content").find("input[name=street]").first().val();
        var zip = jQuery(this).closest(".content").find("input[name=zip]").first().val();
        var citystate = jQuery(this).closest(".content").find("input[name=citystate]").first().val();
        var country = jQuery(this).closest(".content").find("input[name=country]").first().val();
        var myAddress = new address(id, street, citystate, zip, country, isDefault);
        console.log(myAddress);
        editAddress(myAddress);
        closeAllBlocks();
    });
    jQuery("#addresses .item-list").on("click", ".block .setDefault", function (e) {
        e.preventDefault();
        var id = jQuery(this).closest(".block").find(".content input[name=id]").first().val();
        setDefaultAddress(id);
        closeAllBlocks();
        setVariablesFromLocalStorage();
    });
    jQuery("#addresses .item-list").on("click", ".block .delete", function (e) {
        e.preventDefault();
        var id = jQuery(this).closest(".block").find(".content input[name=id]").first().val();
        var street = jQuery(this).closest(".block").find(".content input[name=street]").first().val();
        var zip = jQuery(this).closest(".block").find(".content input[name=zip]").first().val();
        var citystate = jQuery(this).closest(".block").find(".content input[name=citystate]").first().val();
        var country = jQuery(this).closest(".block").find(".content input[name=country]").first().val();
        var isDefault = jQuery(this).closest(".block").find(".content input[name=isDefault]").first().val() == "true";
        var myAddress = new address(id, street, citystate, zip, country, isDefault);

        for (var i = 0; i < creditCards.length ; i++) {
            if (parseInt(creditCards[i].address) == parseInt(id)) {

                if (jQuery("#addresses .message").length) {
                    return;
                }

                var box = "<div style='margin: 0 0 4% 1%;' class='message alert alert-danger alert-dismissable'>" +
                    "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
                    "<span>This address is associated to your Card ending in " + creditCards[i].number.substr(creditCards[i].number.length - 4) + ".</span></div>";
                jQuery(this).closest(".block").prepend(box);

                x = setTimeout(function () {
                    jQuery(".message").addClass("undo");
                }, 200);
                return;
            };
        }

        removeAddress(id);
        setVariablesFromLocalStorage();
        undoDeleteAddress(myAddress);
    });
    jQuery("#addresses").on("keyup change", "input[name=zip]", function () {
        var code = parseInt(jQuery(this).val());
        var target = jQuery(this).closest(".content");
        getDataFromZip(code, target);
    });

    //CARDS
    jQuery(".add-card").on("click", function (e) {
        e.preventDefault();
        closeAllBlocks();
        jQuery(this).addClass("is-hidden").next(".block.add").addClass("is-edditing").find("input").val("");
    });
    jQuery("#billing .add.block").on("click", ".cancel", function (e) {
        e.preventDefault();
        jQuery(".add-card").removeClass("is-hidden");
    });
    jQuery("#billing .add.block").on("click", ".save", function (e) {
        e.preventDefault();
        var name = jQuery(this).closest(".content").find("input[name=name]").first().val();
        var number = jQuery(this).closest(".content").find("input[name=number]").first().val();
        var cid = jQuery(this).closest(".content").find("input[name=cid]").first().val();
        var address = jQuery(this).closest(".content").find("select").first().val();
        var expdate = jQuery(this).closest(".content").find("input[name=expdate]").first().val();
        var isDefault = jQuery(this).closest(".content").find("input[name=default]").first().prop('checked');
        console.log(isDefault);
        var myCreditCard = new creditCard(0, name, number, expdate, cid, address, isDefault);
        addCreditCard(myCreditCard);
        jQuery(this).closest(".content").find("input").val("");
        closeAllBlocks();
    });
    jQuery("#billing .item-list").on("click", ".block .save", function (e) {
        e.preventDefault();
        var id = jQuery(this).closest(".content").find("input[name=id]").first().val();
        var isDefault = jQuery(this).closest(".content").find("input[name=isDefault]").first().val() == "true";
        var name = jQuery(this).closest(".content").find("input[name=name]").first().val();
        var number = jQuery(this).closest(".content").find("input[name=number]").first().val();
        var cid = jQuery(this).closest(".content").find("input[name=cid]").first().val();
        var address = jQuery(this).closest(".content").find("select").first().val();
        var expdate = jQuery(this).closest(".content").find("input[name=expdate]").first().val();
        var myCreditCard = new creditCard(id, name, number, expdate, cid, address, isDefault);
        editCreditCard(myCreditCard);
        closeAllBlocks();
        setVariablesFromLocalStorage();
    });
    jQuery("#billing .item-list").on("click", ".block .setDefault", function (e) {
        e.preventDefault();
        var id = jQuery(this).closest(".block").find(".content input[name=id]").first().val();
        setDefaultCreditCard(id);
        closeAllBlocks();
        setVariablesFromLocalStorage();
    });
    jQuery("#billing .item-list").on("click", ".block .delete", function (e) {
        e.preventDefault();
        var id = jQuery(this).closest(".block").find(".content input[name=id]").first().val();
        var name = jQuery(this).closest(".block").find(".content input[name=name]").first().val();
        var number = jQuery(this).closest(".block").find(".content input[name=number]").first().val();
        var cid = jQuery(this).closest(".block").find(".content input[name=cid]").first().val();
        var address = jQuery(this).closest(".block").find(".content input[name=address]").first().val();
        var expdate = jQuery(this).closest(".block").find(".content input[name=expdate]").first().val();
        var isDefault = jQuery(this).closest(".block").find(".content input[name=isDefault]").first().val() == "true";
        var myCreditCard = new creditCard(id, name, number, expdate, cid, address, isDefault);
        removeCard(id);
        setVariablesFromLocalStorage();
        undoDeleteCreditCard(myCreditCard);
    });

    //NOTIFICATIONS
    /*jQuery(".notification-summary").on("click", function () {
        toggleBlock(jQuery(this).closest(".block"));
    });*/

    //START
    profileExists() ? setVariablesFromLocalStorage() : resetData();

    window.location.hash = "start";
    jQuery(".title").text("My Account");

    if (getWidth() > 768) {
        window.location.hash = "Profile";
        jQuery("li.profile").addClass("is-selected");
    }

    jQuery(".no-details").on('click', 'summary', function (e) {
        var details, summary;
        summary = jQuery(this);
        details = summary.parent();
        if (details.attr('open')) {
            details.removeAttr('open');
        } else {
            details.attr('open', 'open');
        }
    });

});

