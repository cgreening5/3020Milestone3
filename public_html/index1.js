
var currQty = 0; //current quantity selected in the expanded window
var currOrderSelect = null;
function getQty() {
    var dropdown = document.getElementById("qtySelect");
    var qty = parseInt(dropdown.options[dropdown.selectedIndex].value, 10);
    currQty = qty;
}
function getOrder() {
    var dropdown = document.getElementById("orderSelect");
    var order = (dropdown.options[dropdown.selectedIndex].value);
    currOrderSelect = order;
}
$(document).ready(function () {

    var orderDropdown = $("#orderSelect");
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
    var baconShrimp = {name: "Bacon Shrimp", price: 14};
    var friedCalamari = {name: "Fried Calamari", price: 14};
    var chickenCrispers = {name: "Chicken Crispers", price: 16};

    var invisibleDrink = {name: "Invisible Drink", price: 19};
    var redWine = {name: "Red Wine", price: 18};
    var ribEyeSteak = {name: "Rib-eye Steak", price: 25};
    var fishAndChips = {name: "Fish and Chips", price: 22};

    var lemonPie = {name: "Lemon Pie", price: 11};
    var shortcake = {name: "Shortcake", price: 12};

    var map = new Object();

    map[baconShrimp.name] = $("#bacon_shrimp");
    map[friedCalamari.name] = $("#fried_calamari");
    map[chickenCrispers.name] = $("#crispers");
    map[invisibleDrink.name] = $("#invis_drink");
    map[redWine.name] = $("#wine");
    map[ribEyeSteak.name] = $("#steak");
    map[fishAndChips.name] = $("#fish_chips");
    map[lemonPie.name] = $("#lemon_pie");
    map[shortcake.name] = $("#shortcake");

    var firstOrder = new LinkedList(); //linked list of orders
    var secondOrder = new LinkedList();
    var thirdOrder = new LinkedList();
    var fourthOrder = new LinkedList();

    var bill1 = null;
    var bill2 = null;
    var bill3 = null;
    var bill4 = null;

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
    $("#submit_order").hide();
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
            $("#submit_order").hide();
            $("#center_container").css("bottom", "26%");
        }
    });

    //highlights orders button clicked, hides previous navigation screen, shows the orders screen, needs at least one item ordered
    $("#order").click(function () {
        var order_panel = $("#order1");
        if (itemCount > 0 && !naviBtnDisable) {
            $("#center_container").css("top", "0%");
            $("#menu_port").hide();
            lastNav = $("#order").clickHilite(lastNav);
            prevPage = currPage;
            currPage = $("#orders_screen").clickShow(currPage);
            $("#center_container").css("bottom", "35%");
            $("#submit_order").show();
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
            $("#submit_order").hide();
            $("#center_container").css("bottom", "26%");
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
        var order = 0;


        if (currOrderSelect === "New") {

            orderCount++;
            order = orderCount;
            $("#orderSelect option[value='New']").remove();
            if (orderCount < 4) {
                if (orderCount == 1) {
                    $(orderDropdown).append($('<option>', {
                        value: "Order 1",
                        text: 'Order 1'
                    }));
                }
                if (orderCount == 2) {
                    $(orderDropdown).append($('<option>', {
                        value: "Order 2",
                        text: 'Order 2'
                    }));
                    $("#new_order_two").hide();
                    $("#new_order_three").show();
                    $("#order_two").show();
                }
                if (orderCount == 3) {
                    $(orderDropdown).append($('<option>', {
                        value: "Order 3",
                        text: 'Order 3'
                    }));
                    $("#new_order_three").hide();
                    $("#new_order_four").show();
                    $("#order_three").show();
                }
                $(orderDropdown).append($('<option>', {
                    value: "New",
                    text: 'New Order'
                }));
            }
            if (orderCount == 4) {
                $(orderDropdown).append($('<option>', {
                    value: "Order 4",
                    text: 'Order 4'
                }));
                $("#new_order_four").hide();
                $("#order_four").show();
            }




        } else {
            if (currOrderSelect === "Order 1")
                order = 1;
            if (currOrderSelect === "Order 2")
                order = 2;
            if (currOrderSelect === "Order 3")
                order = 3;
            if (currOrderSelect === "Order 4")
                order = 4;
        }


        if (order == 1) {
            currOrder = firstOrder;
            currList = $("#order1_list");
        } else if (order == 2) {
            currOrder = secondOrder;
            currList = $("#order2_list");
        } else if (order == 3) {
            currOrder = thirdOrder;
            currList = $("#order3_list");
        } else if (order == 4) {
            currOrder = fourthOrder;
            currList = $("#order4_list");
        }

        var searchNode = currOrder.search(currItem);

        if (searchNode == -1) {
            var node = currOrder.add(currItem);
            currOrder.setCount(node, currQty);
            itemCount++;
            currList.append(getOrderItem(currItem, currQty));

        } else {

            currOrder.setCount(searchNode, (searchNode.count + currQty));

            $("#item_name_" + currItem.name.replace(/ /g, "_")).html(currItem.name + " (x" + searchNode.count + ")");
            $("#item_price_" + currItem.name.replace(/ /g, "_")).html("$" + (currItem.price * searchNode.count));

        }

        if (itemCount == 1) {
            updateButtons();
        }

        $("#qtySelect").val('1');
        $(itemOrderNote).show();
        $(currPage).hide();
        $(prevPage).show();
        currPage = prevPage;
    });

    function getOrderItem(item, quantity) {

        var orderItem = $("<div></div>");
        var deleteButton = $("<input></input>");
        var name = $("<span></span>");
        var cost = $("<span></span>");

        deleteButton.attr("type", "image");
        deleteButton.attr("class", "delete_order_item");
        deleteButton.attr("src", "delete_button.svg");

        orderItem.append(deleteButton);
        orderItem.attr("id", "order_item_" + item.name.replace(/ /g, "_"));
        orderItem.attr("class", "order_item");

        name.attr("id", "item_name_" + item.name.replace(/ /g, "_"));
        name.append(item.name + " (x" + quantity + ")");
        orderItem.append(name);
        cost.attr("id", "item_price_" + item.name.replace(/ /g, "_"));
        cost.append("$" + (item.price * quantity));
        orderItem.append(cost);
        orderItem.append("</br>");

        orderItem.data("item", item);

        return orderItem;
    }

    $("#order_one").on("click", ".delete_order_item", function () {
        var div = $(this).closest("div");
        var item = div.data("item");
        var menuitem;
        firstOrder.remove(item);
        menuitem = map[item.name];
        menuitem.find(".ordered").hide();
        itemCount--;
        div.fadeOut(250);
        $(div).remove();
        updateButtons();
    });

    $("#order_two").on("click", ".delete_order_item", function () {
        var div = $(this).closest("div");
        var item = div.data("item");
        var menuitem;
        secondOrder.remove(item);
        menuitem = map[item.name];
        menuitem.find(".ordered").hide();
        itemCount--;
        div.fadeOut(250);
        $(div).remove();
        updateButtons();
    });

    $("#order_three").on("click", ".delete_order_item", function () {
        var div = $(this).closest("div");
        var item = div.data("item");
        var menuitem;
        thirdOrder.remove(item);
        menuitem = map[item.name];
        menuitem.find(".ordered").hide();
        itemCount--;
        div.fadeOut(250);
        $(div).remove();
        updateButtons();
    });

    $("#order_four").on("click", ".delete_order_item", function () {
        var div = $(this).closest("div");
        var item = div.data("item");
        var menuitem;
        fourthOrder.remove(item);
        menuitem = map[item.name];
        menuitem.find(".ordered").hide();
        itemCount--;
        div.fadeOut(250);
        $(div).remove();
        updateButtons();
    });

    //make new orders as the buttons are clicked
    $("#new_order_two").click(function () {
        if (!orderBtnDisable) {
            $("#orderSelect option[value='New']").remove();
            $(orderDropdown).append($('<option>', {
                value: "Order 2",
                text: 'Order 2'
            }));
            $(orderDropdown).append($('<option>', {
                value: "New",
                text: 'New Order'
            }));

            orderCount = 2;
            $("#new_order_two").hide();
            $("#order_two").show();
            $("#new_order_three").show();
        }
        ;
    });

    $("#new_order_three").click(function () {
        if (!orderBtnDisable) {
            $("#orderSelect option[value='New']").remove();
            $(orderDropdown).append($('<option>', {
                value: "Order 3",
                text: 'Order 3'
            }));
            $(orderDropdown).append($('<option>', {
                value: "New",
                text: 'New Order'
            }));

            orderCount = 3;
            $("#new_order_three").hide();
            $("#order_three").show();
            $("#new_order_four").show();
        }
        ;
    });

    $("#new_order_four").click(function () {
        if (!orderBtnDisable) {
            $("#orderSelect option[value='New']").remove();
            $(orderDropdown).append($('<option>', {
                value: "Order 4",
                text: 'Order 4'
            }));
            orderCount = 4;
            $("#new_order_four").hide();
            $("#order_four").show();
        }
        ;
    });

    //brings up confirmation screen that submits order, submitting order resets orders
    $("#submit_order").click(function () {
        if (!orderBtnDisable && itemCount > 0) {
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
                currPage = $("#order_submitted").clickShow(currPage);
                $("#order_confirm").hide();
                $("#submit_order").hide();
                $("#center_container").css("bottom", "26%");
                currPage = $("#order_submitted").clickShow(currPage);

                lastNav = null;
                $(".ordered").hide();
                itemCount = 0;
                orderSubmitted = true;
                updateButtons();
                submitOrders();
                ;
            });

        } else if (itemCount == 0) {
            naviBtnDisable = true;
            orderBtnDisable = true;
            $("#order_warning").show();
            $("#warning_ret").click(function () {
                naviBtnDisable = false;
                orderBtnDisable = false;
                $("#order_warning").hide();
            });
        }
        ;

    });

    function submitOrders() {
        bill1 = submitOrder(firstOrder, 1, bill1);
        bill2 = submitOrder(secondOrder, 2, bill2);
        bill3 = submitOrder(thirdOrder, 3, bill3);
        bill4 = submitOrder(fourthOrder, 4, bill4);
        $(".order_item").remove();
    }

    //Make new bills from orders, appends it to the bill screen
    function submitOrder(order, orderNo, bill) {
        var node;
        var billHTML;
        var item;

        if (!order.isEmpty())
        {
            if (bill == null) {
                bill = new LinkedList();
                billHTML = getBillHTML(orderNo);
                $("#bills_screen").append(billHTML);
            } 
            else
                billHTML = $("#bill" + orderNo);

            order.initTraverse();
            item = order.traverse();
            while (item !== null)
            {
                node = bill.search(item);

                //If the item was not already in the bill, add it and add
                //an HTML element
                if (node == -1)
                {
                    node = order.search(item);
                    var newNode = bill.add(item);
                    bill.setCount(newNode, node.count);
                    billHTML.append(getBillItem(item, node.count));
                }

                //Otherwise, instead of adding a new element, replace it so that
                //it reflects the new count
                else
                {
                    var temp = node.count;
                    bill.setCount(node, temp + order.search(item).count);

                    $("#bill_item_name" + node.data.name.replace(/ /g, "_")).html(node.data.name + " (x" + node.count);
                    $("#bill_item_price" + node.data.name.replace(/ /g, "_")).html(") ................$" + (item.price * node.count));
                }

                item = order.traverse();
            }
        }

        order.clear();
        return bill;
    }
    ;

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
        var name = $("<span></span>");
        var cost = $("<span></span>");
        billItem.attr("id", "bill_item_" + item.name.replace(/ /g, "_"));
        billItem.attr("class", "bill_item");

        name.attr("id", "bill_item_name" + item.name.replace(/ /g, "_"));
        name.attr("class", "bill_item_name");
        name.append(item.name + " (x" + quantity);
        billItem.append(name);

        cost.attr("id", "bill_item_price" + item.name.replace(/ /g, "_"));
        cost.attr("class", "bill_item_price");
        cost.append(") ................$" + (item.price * quantity));

        billItem.append(cost);
        billItem.append("</br>");

        billItem.data("item", item);
        return billItem;
    }

    //update order and bills button, see if they should be disabled or regular color
    function updateButtons() {
        if (itemCount > 0)
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