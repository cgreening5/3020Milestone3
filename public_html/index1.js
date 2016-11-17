$(document).ready(function () {

    var lastNav = null;	//last navigation button clicked
    var lastMenu = $("#appetizer_button"); //last menu button clicked
    var regColor = "DarkSlateGray"; //regular non highlighted button color
    var hilite = "DodgerBlue"; //highlighted button color
    var disabled = "DarkGray"; //disabled button color
    var orderSubmitted = false; //order has been submitted = true
    var orderCount = 0; //number of people ordering
    var itemCount = 0; //number of distinct food items ordered
    var currPage = $("#welcome"); //current page being shown
    var prevPage = null; //prev page shown
    var lastMenuScreen = $(".appetizers"); //last menu screen shown
    var lastExpandScreen = null; //last expanded menu item expanded
    var currItem = null; //current menu item to add to order
    var itemOrderNote = null; //to keep track of ordering notifications
    var maxItems = 9; //max items in an order
    var orderBtnDisable = false; //disables buttons in the order screen if true
    var naviBtnDisable = false; //disables navigation buttons if true

    var firstOrder = new LinkedList(); //linked list of orders
    var secondOrder = new LinkedList();
    var thirdOrder = new LinkedList();
    var fourthOrder = new LinkedList();

    $(lastMenu).css("background-color", hilite);	//initial tab of menu is appetizers

    //hide everything except welcome screen and navigation buttons
    updateButtons();
    $("#menu_screen").children().hide();
    $(".appetizers").show();
    $(".ordered").hide();
    $("#menu_buttons").show();
    $("#menu_port").show();
    $("#menu_screen").hide();
    $("#orders_screen").children().hide();
    $("#order_one").show();
    $("#new_order_two").show();
    $("#submit_order").show();
    $("#orders_screen").hide();
    $("#expanded_window").children().hide();
    $("#expand_screen").hide();
    $("#order_submitted").hide();

    /*
     * Navigation Button Functions
     */

    //highlights menu button clicked, hides previous navigation screen, shows the menu screen
    $("#menu").click(function () {
        if (!naviBtnDisable) {
            lastNav = $("#menu").clickHilite(lastNav);
            prevPage = currPage;
            currPage = $("#menu_screen").clickShow(currPage);
        }
    });

    //highlights orders button clicked, hides previous navigation screen, shows the orders screen, needs at least one item ordered
    $("#order").click(function () {

        var order_panel = $("#order1");
        if (orderCount > 0 && !naviBtnDisable) {
            lastNav = $("#order").clickHilite(lastNav);
            prevPage = currPage;
            currPage = $("#orders_screen").clickShow(currPage);
        }
    });

    //highlights bills button clicked, hides previous navigation screen, shows the bills screen, needs to submit order first
    $("#bills").click(function () {
        if (orderSubmitted && !naviBtnDisable) {
            lastNav = $("#bills").clickHilite(lastNav);
            $(currPage).hide();
            prevPage = currPage;
            currPage = $("#bills_screen").clickShow(currPage);
        }
    });

    //highlights most recently clicked menu buttons, shows current menu, hides previous menu
    $("#appetizer_button").click(function () {
        lastMenu = $("#appetizer_button").clickHilite(lastMenu); //highlight appetizer button 
        lastMenuScreen = $(".appetizers").clickShow(lastMenuScreen); //switch to appetizer menu
    });
    $("#drinks_button").click(function () {
        lastMenu = $("#drinks_button").clickHilite(lastMenu);
        lastMenuScreen = $(".drinks").clickShow(lastMenuScreen);
    });
    $("#entree_button").click(function () {
        lastMenu = $("#entree_button").clickHilite(lastMenu);
        lastMenuScreen = $(".entree").clickShow(lastMenuScreen);
    });
    $("#dessert_button").click(function () {
        lastMenu = $("#dessert_button").clickHilite(lastMenu);
        lastMenuScreen = $(".dessert").clickShow(lastMenuScreen);
    });
    
    //expands menu item when clicked
    $("#fried_calamari").click(function () {
        lastExpandScreen = $("#fried_calamari_e").clickShow(lastExpandScreen);
        $(currPage).hide();
        prevPage = currPage;
        currPage = $("#expand_screen").clickShow(currPage);
        currItem = {name:"Fried Calamari", price:14};
        itemOrderNote = "#calamari_ordered";
        ;
    });
    
    /*
     * Menu Item Buttons
     */

    $("#crisper").click(function () {
        lastExpandScreen = $("#crisper_e").clickShow(lastExpandScreen);
        $(currPage).hide();
        prevPage = currPage;
        currPage = $("#expand_screen").clickShow(currPage);
        currItem = {name:"Chicken Crispers", price:16};
        itemOrderNote = "#crisper_ordered";
        ;
    });

    $("#bacon_shrimp").click(function () {
        lastExpandScreen = $("#bacon_shrimp_e").clickShow(lastExpandScreen);
        $(currPage).hide();
        prevPage = currPage;
        currPage = $("#expand_screen").clickShow(currPage);
        currItem = {name:"Bacon Shrimp", price:14};
        itemOrderNote = "#bacon_shrimp_ordered";
        ;
    });

    $("#invis_drink").click(function () {
        lastExpandScreen = $("#invis_drink_e").clickShow(lastExpandScreen);
        $(currPage).hide();
        prevPage = currPage;
        currPage = $("#expand_screen").clickShow(currPage);
        currItem = {name:"Invisible Drink", price:19};
        itemOrderNote = "#invis_drink_ordered";
        ;
    });

    $("#wine").click(function () {
        lastExpandScreen = $("#wine_e").clickShow(lastExpandScreen);
        $(currPage).hide();
        prevPage = currPage;
        currPage = $("#expand_screen").clickShow(currPage);
        currItem = {name:"Red Wine", price:18};
        itemOrderNote = "#wine_ordered";
        ;
    });

    $("#steak").click(function () {
        lastExpandScreen = $("#steak_e").clickShow(lastExpandScreen);
        $(currPage).hide();
        prevPage = currPage;
        currPage = $("#expand_screen").clickShow(currPage);
        currItem = {name:"Rib-eye Steak", price:25};
        itemOrderNote = "#steak_ordered";
        ;
    });

    $("#fish_chips").click(function () {
        lastExpandScreen = $("#fish_chips_e").clickShow(lastExpandScreen);
        $(currPage).hide();
        prevPage = currPage;
        currPage = $("#expand_screen").clickShow(currPage);
        currItem = {name:"Fish and Chips", price:22};
        itemOrderNote = "#fish_chips_ordered";
        ;
    });

    $("#lemon_pie").click(function () {
        lastExpandScreen = $("#lemon_pie_e").clickShow(lastExpandScreen);
        $(currPage).hide();
        prevPage = currPage;
        currPage = $("#expand_screen").clickShow(currPage);
        currItem = {name:"Lemon Pie", price:11};
        itemOrderNote = "#lemon_pie_ordered";
        ;
    });

    $("#shortcake").click(function () {
        lastExpandScreen = $("#shortcake_e").clickShow(lastExpandScreen);
        $(currPage).hide();
        prevPage = currPage;
        currPage = $("#expand_screen").clickShow(currPage);
        currItem = {name:"Shortcake", price:12};
        itemOrderNote = "#shortcake_ordered";
        ;
    });


    //back button for expanded food items, brings back to current menu shown
    
    $("#back").click(function () {
        $("#expand_screen").hide();
        $(prevPage).show();
        currPage = prevPage;
        ;
    });

    //adds items to orders, current max is 8 different per order, if exceeded makes a new order automatically
    
    $("#add_order").click(function () {
        var currOrder = null;
        var currList = null;

        if (orderCount === 0) {
            orderCount = 1;
            updateButtons();
            currOrder = firstOrder;
            currList = $("#order1_list");
        } 
        else {

            currOrder = firstOrder;
            currList = $("#order1_list");
        }

        var searchNode = currOrder.search(currItem.name);
        if (searchNode == -1) {
            currOrder.add(currItem.name);
            itemCount++;
            currList.append(getOrderItem(currItem, 1));
        } 
        else {
            currOrder.increment(searchNode);
            $("#" + currItem.name.replace(/ /g, "_")).html(getOrderItem(currItem, searchNode.count));
        }

        $(itemOrderNote).show();
        $(currPage).hide();
        $(prevPage).show();
        currPage = prevPage;
    });

    function getOrderItem(item, quantity){
        
        var orderItem = $("<div></div>");
        var deleteButton = $("<input></input>");
        deleteButton.attr("type", "image");
        deleteButton.attr("class", "delete_order_item");
        deleteButton.attr("src", "delete_button.svg");
        
        orderItem.append(deleteButton);
        orderItem.attr("id", item.name.replace(/ /g, "_"));
        orderItem.attr("class", "order_item");
        orderItem.append(item.name + "................$" + item.price);
        orderItem.append("</br>");
        orderItem.append("-x" + quantity);
        
        orderItem.data("item", item);
        
        return orderItem;
    }
    
    $("#orders_screen").on("click", ".delete_order_item", function() { 
        var div = $(this).closest("div");
        var itemName = div.data("item").name;
        firstOrder.remove(itemName);
        div.fadeOut(300);
    });

    //make new orders as the buttons are clicked
    $("#new_order_two").click(function () {
        if (!orderBtnDisable) {
            orderCount = 2;
            $("#new_order_two").hide();
            $("#order_two").show();
            $("#new_order_three").show();
        }
        ;
    });

    $("#new_order_three").click(function () {
        if (!orderBtnDisable) {
            orderCount = 3;
            $("#new_order_three").hide();
            $("#order_three").show();
        }
        ;
    });

    //brings up confirmation screen that submits order, submitting order resets orders
    $("#submit_order").click(function () {
        if (!orderBtnDisable) {
            naviBtnDisable = true;
            orderBtnDisable = true;
            $("#order_confirm").show();

            $("#order_c_no").click(function () {
                naviBtnDisable = false;
                orderBtnDisable = false;
                $("#order_confirm").hide();
            });

            $("#order_c_yes").click(function () {
                naviBtnDisable = false;
                orderBtnDisable = false;
                $("#order_confirm").hide();
                $("#order_two").hide();
                $("#order_three").hide();
                $("#order_four").hide();
                $("#new_order_two").show();
                $("#new_order_three").hide();
                $("#new_order_four").hide();
                currPage = $("#order_submitted").clickShow(currPage);

                lastNav = null;
                $(".ordered").hide();
                orderCount = 0;
                itemCount = 0;
                orderSubmitted = true;
                updateButtons();
                ;
            });

        }
        ;
    });

    //update order and bills button, see if they should be disabled or regular color
    function updateButtons() {
        if (orderCount > 0)
            $("#order").css("background-color", regColor);
        else
            $("#order").css("background-color", disabled);

        if (orderSubmitted)
            $("#bills").css("background-color", regColor);
        else
            $("#bills").css("background-color", disabled);
    }
    ;

    //Takes the lastClick which is last clicked button, changes it to non hightlighted color, takes new clicked button and highlights it
    $.fn.clickHilite = function (lastClick) {
        if (lastClick != null) {
            $(lastClick).css("background-color", regColor);
        }
        lastClick = this;
        $(this).css("background-color", hilite);
        return lastClick;
    };



    //Takes the lastClick which is last clicked screen, hides it, takes new clicked screen and shows it
    $.fn.clickShow = function (lastClick) {
        if (lastClick != null) {
            $(lastClick).hide();
        }
        lastClick = this;
        $(this).show();
        return lastClick;
    };
});