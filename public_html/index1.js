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

    //Menu items
    var baconShrimp = {name:"Bacon Shrimp", price:14};
    var friedCalamari = {name:"Fried Calamari", price:14};
    var chickenCrispers = {name:"Chicken Crispers", price:16};
    
    var invisibleDrink = {name:"Invisible Drink", price:19};
    var redWine = {name:"Red Wine", price:18};
    var ribEyeSteak = {name:"Rib-eye Steak", price:25};
    var fishAndChips = {name:"Fish and Chips", price:22};
    
    var lemonPie = {name:"Lemon Pie", price:11};
    var shortcake = {name:"Shortcake", price:12};

    var firstOrder = new LinkedList(); //linked list of orders
    var secondOrder = new LinkedList();
    var thirdOrder = new LinkedList();
    var fourthOrder = new LinkedList();
    
    var bill1 = null;

    $(lastMenu).css("background-color", hilite);	//initial tab of menu is appetizers

    //hide everything except welcome screen and navigation buttons
    updateButtons();
    $("#menu_screen").children().hide();
    $(".appetizers").show();
    $(".ordered").hide();
    $("#menu_buttons").show();
    $("#menu_port").hide();/*was 'show'*/
    $("#menu_screen").hide();
    $("#orders_screen").children().hide();
    $("#order_one").show();
    $("#new_order_two").show();
    $("#submit_order").show();
    $("#orders_screen").hide();
    $("#bills_screen").hide();
    $("#expanded_window").children().hide();
    $("#expand_screen").hide();
    $("#order_submitted").hide();
    $("#nav_port").hide();/* wasnt here originally */

    /*
     * Navigation Button Functions
     */

    /* button to begin the system */
    $("#welcomeBegin").click(function () {
        lastNav = $("#menu").clickHilite(lastNav);
        currPage = $("#menu_screen").clickShow(currPage);
        $("#menu_port").show();
        $("#nav_port").show();
        $("#welcome").hide();
        $("#menu").css("background-color", hilite);
    })

    //highlights menu button clicked, hides previous navigation screen, shows the menu screen
    $("#menu").click(function () {
        if (!naviBtnDisable) {
            $("#menu_port").show();
            $("#center_container").css("top", "8%");
            lastNav = $("#menu").clickHilite(lastNav);
            prevPage = currPage;
            currPage = $("#menu_screen").clickShow(currPage);
        }
    });

    //highlights orders button clicked, hides previous navigation screen, shows the orders screen, needs at least one item ordered
    $("#order").click(function () {
        var order_panel = $("#order1");
        if (orderCount > 0 && !naviBtnDisable) {
            $("#center_container").css("top","0%");
            $("#menu_port").hide();
            lastNav = $("#order").clickHilite(lastNav);
            prevPage = currPage;
            currPage = $("#orders_screen").clickShow(currPage);
        }
    });

    //highlights bills button clicked, hides previous navigation screen, shows the bills screen, needs to submit order first
    $("#bills").click(function () {
        if (orderSubmitted && !naviBtnDisable) {
            $("#center_container").css("top", "0%");
            $("#menu_port").hide();
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
        currItem = friedCalamari;
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
        currItem = chickenCrispers;
        itemOrderNote = "#crisper_ordered";
        ;
    });

    $("#bacon_shrimp").click(function () {
        lastExpandScreen = $("#bacon_shrimp_e").clickShow(lastExpandScreen);
        $(currPage).hide();
        prevPage = currPage;
        currPage = $("#expand_screen").clickShow(currPage);
        currItem = baconShrimp;
        itemOrderNote = "#bacon_shrimp_ordered";
        ;
    });

    $("#invis_drink").click(function () {
        lastExpandScreen = $("#invis_drink_e").clickShow(lastExpandScreen);
        $(currPage).hide();
        prevPage = currPage;
        currPage = $("#expand_screen").clickShow(currPage);
        currItem = invisibleDrink;
        itemOrderNote = "#invis_drink_ordered";
        ;
    });

    $("#wine").click(function () {
        lastExpandScreen = $("#wine_e").clickShow(lastExpandScreen);
        $(currPage).hide();
        prevPage = currPage;
        currPage = $("#expand_screen").clickShow(currPage);
        currItem = redWine;
        itemOrderNote = "#wine_ordered";
        ;
    });

    $("#steak").click(function () {
        lastExpandScreen = $("#steak_e").clickShow(lastExpandScreen);
        $(currPage).hide();
        prevPage = currPage;
        currPage = $("#expand_screen").clickShow(currPage);
        currItem = ribEyeSteak;
        itemOrderNote = "#steak_ordered";
        ;
    });

    $("#fish_chips").click(function () {
        lastExpandScreen = $("#fish_chips_e").clickShow(lastExpandScreen);
        $(currPage).hide();
        prevPage = currPage;
        currPage = $("#expand_screen").clickShow(currPage);
        currItem = fishAndChips;
        itemOrderNote = "#fish_chips_ordered";
        ;
    });

    $("#lemon_pie").click(function () {
        lastExpandScreen = $("#lemon_pie_e").clickShow(lastExpandScreen);
        $(currPage).hide();
        prevPage = currPage;
        currPage = $("#expand_screen").clickShow(currPage);
        currItem = lemonPie;
        itemOrderNote = "#lemon_pie_ordered";
        ;
    });

    $("#shortcake").click(function () {
        lastExpandScreen = $("#shortcake_e").clickShow(lastExpandScreen);
        $(currPage).hide();
        prevPage = currPage;
        currPage = $("#expand_screen").clickShow(currPage);
        currItem = shortcake;
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

        var searchNode = currOrder.search(currItem);
        if (searchNode == -1) {
            currOrder.add(currItem);
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
        orderItem.attr("id", "order_item_" + item.name.replace(/ /g, "_"));
        orderItem.attr("class", "order_item");
        orderItem.append(item.name + " (x" + quantity);
        orderItem.append(") ................$" + (item.price * quantity));
        orderItem.append("</br>");
        
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
                submitOrders();
                ;
            });

        }
        ;
    });

   //Make new bills from orders
    function submitOrders(){
        var billNode;
        var billHTML;
        var item;
        
        if (!firstOrder.isEmpty())
        {
            if (bill1 == null){
                bill1 = new LinkedList();
                billHTML = getBillHTML(1);
                $("#bills_screen").append(billHTML);
            }
            
            else
                billHTML = $("#bill1");
            
            firstOrder.initTraverse();
            item = firstOrder.traverse();
            while (item !== null)
            {
                billNode = firstOrder.search(item);
                bill1.add(item);
                billHTML.append(getBillItem(item, billNode.count));
                item = firstOrder.traverse();
            }
        }

        $(".order_item").remove();
        firstOrder.clear();
    };
   
    //Creates a "bill" HTML element with id bill[billno], ie. bill1, bill2, etc.
    function getBillHTML(billno)
    {
        var div;
        var newBill = $("<div></div>");
        newBill.attr("id", "bill" + billno);
        newBill.attr("class", "bill");
        div = $("<h5>Bill " + billno + "</h5>");
        newBill.append(div);
        return newBill;
    }
    
        //Returns the HTML for a bill item.
    function getBillItem(item, quantity)
    {

        var billItem = $("<div></div>");
        billItem.attr("id", "bill_item_ " + item.name.replace(/ /g, "_"));
        billItem.attr("class", "bill_item");
        billItem.append(item.name + " (x" + quantity);
        billItem.append(") ................$" + (item.price * quantity));
        billItem.append("</br>");
        
        billItem.data("item", item);
        return billItem;
    }

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