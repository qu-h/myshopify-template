jQuery(window).scroll(function () {
    var scroll = jQuery(window).scrollTop();
    if (scroll > 500) {
        jQuery("#header-content .header").addClass("is-ticky");
    } else {
        jQuery("#header-content .header").removeClass("is-ticky");
    }
});
jQuery(".megamenu .menu-dropdown > i").click(function () {
    if (jQuery(this).next().is(":visible")) {
        jQuery(this).addClass("accordion-show");
    } else {
        jQuery(this).removeClass("accordion-show");
    }
    jQuery(this).next().toggle(400);
});


jQuery(document).ready(function () {
    jQuery("#zt_list_product").owlCarousel({

        itemsCustom: [
            [320, 1],
            [360, 2],
            [450, 3],
            [600, 3],
            [700, 3],
            [1000, 4],
            [1200, 4],
            [1400, 4],
            [1600, 4]
        ],
        navigation: true,
        navigationText: ['<i class="arrow_carrot-left"></i>', '<i class="arrow_carrot-right"></i>']
    });
});
//Shopify.Image.preload(["\/\/cdn.shopify.com\/s\/files\/1\/1498\/2346\/products\/15_2b5fdb61-a93c-4e98-ad1c-286ccfc6a5d0.jpg?v=1485144698","\/\/cdn.shopify.com\/s\/files\/1\/1498\/2346\/products\/16_1897950f-8143-43a5-8715-1843829d8b17.jpg?v=1485144698","\/\/cdn.shopify.com\/s\/files\/1\/1498\/2346\/products\/17_ad9266e1-3d54-47f8-850a-b3c5750f4296.jpg?v=1485144698","\/\/cdn.shopify.com\/s\/files\/1\/1498\/2346\/products\/18_b85eee69-9f27-49c3-aa4b-a894f7beea27.jpg?v=1485144698","\/\/cdn.shopify.com\/s\/files\/1\/1498\/2346\/products\/13_c3705924-8270-4b3d-ac4d-55f84f80cf68.jpg?v=1485144698"], 'grande');


var selectCallback = function (variant, selector) {
    if (variant) {
        jQuery('.variant-sku').text(variant.sku);
    }
    else {
        jQuery('.variant-sku').empty();
    }

    if (variant && variant.featured_image) {
    }
    var addToCart = jQuery('#product-add-to-cart'),
        productPrice = jQuery('.product .price'),
        comparePrice = jQuery('.product .compare-price'),
        skuproduct = jQuery('.product-sku');

    var sku = jQuery('#product-selectors').find(':selected').attr('data-sku');
    jQuery('.product-sku').html(sku);
    if (variant) {
        if (variant.available) {
            // We have a valid product variant, so enable the submit button
            addToCart.removeClass('disabled').removeAttr('disabled').val('Add to Cart');

        } else {
            // Variant is sold out, disable the submit button
            addToCart.val('Sold Out').addClass('disabled').attr('disabled', 'disabled');
        }

        // Regardless of stock, update the product price
        productPrice.html(Shopify.formatMoney(variant.price, "<span class=money>${{amount}}</span>"));

        // Also update and show the product's compare price if necessary
        if (variant.compare_at_price > variant.price) {
            productPrice.addClass("on-sale")
            comparePrice
                .html(Shopify.formatMoney(variant.compare_at_price, "<span class=money>${{amount}}</span>"))
                .show();
        } else {

            productPrice.removeClass("on-sale");
        }

        // BEGIN SWATCHES
        var form = jQuery('#' + selector.domIdPrefix).closest('form');
        for (var i = 0, length = variant.options.length; i < length; i++) {
            var radioButton = form.find('.swatch[data-option-index="' + i + '"] :radio[value="' + variant.options[i] + '"]');
            if (radioButton.size()) {
                radioButton.get(0).checked = true;
            }
        }
        // END SWATCHES


    } else {
        // The variant doesn't exist. Just a safeguard for errors, but disable the submit button anyway
        addToCart.val('Unavailable').addClass('disabled').attr('disabled', 'disabled');
    }

    //update variant inventory

    if (variant.available) {
        if (variant.inventory_management != null) {
            jQuery(".product-inventory span").text(variant.inventory_quantity + " in stock");
        } else {
            jQuery(".product-inventory span").text("Many in stock");
        }
    } else {
        jQuery(".product-inventory span").text("Out of stock");
    }


    /*begin variant image*/


    if (variant && variant.featured_image) {
        var originalImage = jQuery("#product-featured-image");
        var newImage = variant.featured_image;
        var element = originalImage[0];

        function removeExtent(str) {
            var arr = str.split("v=");
            if (arr[0])
                return arr[0];
        }


        Shopify.Image.switchImage(newImage, element, function (newImageSizedSrc, newImage, element) {
            jQuery('#zt_list_product img').each(function () {

                var grandSize = jQuery(this).attr('src');
                grandSize = grandSize.replace('_compact', '');

                grandSize = grandSize.replace('.jpg.jpg', '.jpg');
                grandSize = removeExtent(grandSize);

                newImageSizedSrc = newImageSizedSrc.replace('https:', '');
                newImageSizedSrc = newImageSizedSrc.replace('http:', '');
                newImageSizedSrc = newImageSizedSrc.replace('_grande', '');

                newImageSizedSrc = newImageSizedSrc.replace('.jpg.jpg', '.jpg');

                newImageSizedSrc = removeExtent(newImageSizedSrc);

                if (grandSize == newImageSizedSrc) {
                    jQuery(this).parent().trigger('click');
                    return false;
                }
            });
        });
    }

    /*end of variant image*/

};

jQuery(function ($) {


    // Add label if only one product option and it isn't 'Title'. Could be 'Size'.


    // Hide selectors if we only have 1 variant and its title contains 'Default'.

    $('.selector-wrapper').hide();


    // Auto-select first available variant on page load. Otherwise the product looks sold out.


    $('.single-option-selector:eq(0)').val("Default Title").trigger('change');


    var reviewsTimeout = setInterval(function () {
        if (jQuery(".spr-badge-caption").length > 0) {
            jQuery(".spr-badge-caption").on('click', function () {
                jQuery('html,body').animate({
                        scrollTop: jQuery(".panel:last").offset().top
                    },
                    '400');
                jQuery("#collapse-tab4").collapse('show');
            });
            clearInterval(reviewsTimeout);
        }
    }, 1000);


});
jQuery(document).ready(function ($) {
    $('.up-qty').click(function () {
        quantity = $('#quantity').val();
        $('#quantity').val(parseInt(quantity) + 1);
    });
    $('.down-qty').click(function () {
        quantity = $('#quantity').val();
        if (quantity > 1)
            $('#quantity').val(parseInt(quantity) - 1);
    });

});


jQuery(document).ready(function () {
    jQuery(".related-products .products-grid").owlCarousel({
        autoPlay: 8000,
        scrollPerPage: true,
        slideSpeed: 500,
        stopOnHover: true,
        navigation: true,
        navigationText: ['<i class="arrow_carrot-left"></i>', '<i class="arrow_carrot-right"></i>'],
        items: 5,
        itemsDesktop: [1200, 3],
        itemsTablet: [767, 3],
        itemsTabletSmall: [721, 2]
    });
});


Shopify.doNotTriggerClickOnThumb = false;

var selectCallbackQuickview = function (variant, selector) {
    var productItem = jQuery('.product-quickview .product-item');
    addToCart = productItem.find('.add-to-cart-btn'),
        productPrice = productItem.find('.price'),
        comparePrice = productItem.find('.compare-price'),
        totalPrice = productItem.find('.total-price span');


    if (variant) {
        if (variant.available) {
            // We have a valid product variant, so enable the submit button
            addToCart.removeClass('disabled').removeAttr('disabled').text('Add to Cart');

        } else {
            // Variant is sold out, disable the submit button
            addToCart.val('Sold Out').addClass('disabled').attr('disabled', 'disabled');
        }

        // Regardless of stock, update the product price
        productPrice.html(Shopify.formatMoney(variant.price, "<span class=money>${{amount}}</span>"));

        // Also update and show the product's compare price if necessary
        if (variant.compare_at_price > variant.price) {
            comparePrice
                .html(Shopify.formatMoney(variant.compare_at_price, "<span class=money>${{amount}}</span>"))
                .show();
            productPrice.addClass('on-sale');
        } else {
            comparePrice.hide();
            productPrice.removeClass('on-sale');
        }


        // BEGIN SWATCHES
        var form = jQuery('#' + selector.domIdPrefix).closest('form');
        for (var i = 0, length = variant.options.length; i < length; i++) {
            var radioButton = form.find('.swatch[data-option-index="' + i + '"] :radio[value="' + variant.options[i] + '"]');
            if (radioButton.size()) {
                radioButton.get(0).checked = true;
            }
        }
        // END SWATCHES


        //update variant inventory

        var inventoryInfo = productItem.find('.product-inventory span');
        if (variant.available) {
            if (variant.inventory_management != null) {
                inventoryInfo.text(variant.inventory_quantity + " in stock");
            } else {
                inventoryInfo.text("Many in stock");
            }
        } else {
            inventoryInfo.text("Out of stock");
        }


        /*recaculate total price*/
        //try pattern one before pattern 2
        var regex = /([0-9]+[.|,][0-9]+[.|,][0-9]+)/g;
        var unitPriceTextMatch = jQuery('.product-quickview .price').text().match(regex);

        if (!unitPriceTextMatch) {
            regex = /([0-9]+[.|,][0-9]+)/g;
            unitPriceTextMatch = jQuery('.product-quickview .price').text().match(regex);
        }

        if (unitPriceTextMatch) {
            var unitPriceText = unitPriceTextMatch[0];
            var unitPrice = unitPriceText.replace(/[.|,]/g, '');
            var quantity = parseInt(jQuery('.product-quickview input[name=quantity]').val());
            var totalPrice = unitPrice * quantity;

            var totalPriceText = Shopify.formatMoney(totalPrice, window.money_format);

            totalPriceText = totalPriceText.match(regex)[0];

            var regInput = new RegExp(unitPriceText, "g");
            var totalPriceHtml = jQuery('.product-quickview .price').html().replace(regInput, totalPriceText);
            jQuery('.product-quickview .total-price span').html(totalPriceHtml);
        }
        /*end of price calculation*/


        Currency.convertAll('USD', jQuery('#currencies').val(), 'span.money', 'money_format');


        /*begin variant image*/
        if (variant && variant.featured_image) {
            var newImage = Shopify.resizeImage(variant.featured_image.src, 'small');
            newImage = newImage.replace(/https?:/, '');
            jQuery('.product-quickview .quickview-more-views img').each(function () {
                var grandSize = jQuery(this).attr('src');
                if (grandSize == newImage) {
                    jQuery(this).parent().trigger('click');
                    return false;
                }
            });
        }
        /*end of variant image*/

    } else {
        // The variant doesn't exist. Just a safegaurd for errors, but disable the submit button anyway
        addToCart.text('Unavailable').addClass('disabled').attr('disabled', 'disabled');
    }

};

// Pick your format here:
// Can be 'money_format' or 'money_with_currency_format'
Currency.format = 'money_format';
var shopCurrency = 'USD';
var cookieCurrency = Currency.cookie.read();

// Fix for customer account pages
jQuery('span.money span.money').each(function () {
    jQuery(this).parent('span.money').removeClass('money');
});

// Add precalculated shop currency to data attribute
jQuery('span.money').each(function () {
    jQuery(this).attr('data-currency-USD', jQuery(this).html());
});

// Select all your currencies buttons.
var currencySwitcher = jQuery('#currencies');

// When the page loads.
if (cookieCurrency == null || cookieCurrency == shopCurrency) {
    Currency.currentCurrency = shopCurrency;
}
else {
    Currency.currentCurrency = cookieCurrency;
    currencySwitcher.val(cookieCurrency);
    Currency.convertAll(shopCurrency, cookieCurrency);
}
currencySwitcher.selectize();
jQuery('.selectize-input input').attr('disabled', 'disabled');

// When customer clicks on a currency switcher.
currencySwitcher.change(function () {
    var newCurrency = jQuery(this).val();
    Currency.cookie.write(newCurrency);
    Currency.convertAll(Currency.currentCurrency, newCurrency);
    //show modal
    jQuery("#currencies-modal span").text(newCurrency);
    if (jQuery("#cart-currency").length > 0) {
        jQuery("#cart-currency").text(newCurrency);
    }

});

// For product options.
var original_selectCallback = window.selectCallback;
var selectCallback = function (variant, selector) {
    original_selectCallback(variant, selector);
    Currency.convertAll(shopCurrency, jQuery('#currencies').val());
};


jQuery(document).ready(function () {
    var $popupwapper = jQuery('#wapper-popup'),
        popupnewsletter = jQuery('#popup-newsletter'),
        popuppage = window.location.pathname;


    $popupwapper.css({'position': 'relative'});
    jQuery('.wrapper #popup-newsletter').remove();
    $popupwapper.append(popupnewsletter);

    if (jQuery.cookie('emailpopup') != 'closed') {
        openpopup();
    }
    ;

    jQuery('#popup-newsletter .btn.close').click(function (e) {
        e.preventDefault();
        closepopup();
    });
    jQuery('body').keydown(function (e) {
        if (e.which == 27) {
            closepopup();
            jQuery('body').unbind('keydown');
        }
    });
    jQuery('#mc_embed_signup form').submit(function () {
        if (jQuery('#mc_embed_signup .email').val() != '') {
            closepopup();
        }
    });

    function closepopup() {
        jQuery('#popup-newsletter .popupnewsletter').fadeOut(600, function () {
            jQuery('#popup-newsletter .popup-overlay').fadeOut(600, function () {
                jQuery('#popup-newsletter').hide();
                jQuery.cookie('emailpopup', 'closed', {expires: 1, path: '/'});
            });
        })
    }

    function openpopup() {
        jQuery('#popup-newsletter').fadeIn(600, function () {
            jQuery('#popup-newsletter .popupnewsletter').fadeIn(600);
        });
    }

    jQuery(document).mouseup(function (e) {

        var container = jQuery(".popupnewsletter");

        if (!container.is(e.target)
            && container.has(e.target).length === 0) {
            e.preventDefault();
            closepopup();
        }

    });

});


jQuery('.btn-menu-canvas').click(function () {
    if (jQuery('#offcanvas').hasClass('active')) {
        jQuery('body').removeClass('off-canvas-active');
        jQuery('#offcanvas').removeClass('active');
        jQuery('.wrapper').removeClass('offcanvas-push');
    } else {
        jQuery('body').addClass('off-canvas-active');
        jQuery('#offcanvas').addClass('active');
        jQuery('.wrapper').addClass('offcanvas-push');
    }
});
jQuery('#off-canvas-button').click(function () {
    jQuery('#offcanvas').removeClass('active');
    jQuery('.wrapper').removeClass('offcanvas-push');
});

jQuery(document).mouseup(function (e) {

    var container = jQuery("#offcanvas");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        jQuery('#offcanvas').removeClass('active');
        jQuery('.wrapper').removeClass('offcanvas-push');
    }

});

jQuery("#offcanvas .navbar-nav ul").hide();
jQuery("#offcanvas .navbar-nav li h3 i").addClass("accordion-show");

jQuery("#offcanvas .navbar-nav li h3 i").click(function () {
    if (jQuery(this).parent().next().is(":visible")) {
        jQuery(this).addClass("accordion-show");
    } else {
        jQuery(this).removeClass("accordion-show");
    }
    jQuery(this).parent().next().toggle(400);
    if (jQuery(this).hasClass("icon_plus")) {
        jQuery(this).removeClass("icon_plus");
        jQuery(this).addClass("icon_minus-06");
    } else {
        jQuery(this).removeClass("icon_minus-06");
        jQuery(this).addClass("icon_plus");
    }
});


$(function () {
    // Current Ajax request.
    var currentAjaxRequest = null;
    // Grabbing all search forms on the page, and adding a .search-results list to each.
    var searchForms = $('form[action="/search"]').css('position', 'relative').each(function () {
        // Grabbing text input.
        var input = $(this).find('input[name="q"]');
        // Adding a list for showing search results.
        var offSet = input.position().top + input.innerHeight();
        $('<ul class="search-results"></ul>').css({
            'position': 'absolute',
            'left': '0px',
            'top': offSet
        }).appendTo($(this)).hide();
        // Listening to keyup and change on the text field within these search forms.
        input.attr('autocomplete', 'off').bind('keyup change', function () {
            // What's the search term?
            var term = $(this).val();
            // What's the search form?
            var form = $(this).closest('form');
            // What's the search URL?
            var searchURL = '/search?type=product&q=title:' + term + '*';
            // What's the search results list?
            $('.search-form').addClass('s-loading');
            var resultsList = form.find('.search-results');
            // If that's a new term and it contains at least 3 characters.
            if (term.length > 3 && term != $(this).attr('data-old-term')) {
                // Saving old query.
                $(this).attr('data-old-term', term);
                // Killing any Ajax request that's currently being processed.
                if (currentAjaxRequest != null) currentAjaxRequest.abort();
                // Pulling results.
                currentAjaxRequest = $.getJSON(searchURL + '&view=json', function (data) {
                    // Reset results.
                    resultsList.empty();
                    // If we have no results.
                    if (data.results_count == 0) {
                        resultsList.html('<li><span class="title" >No results</span></li>');
                        resultsList.fadeIn(200);
                        $('.search-form').removeClass('s-loading');
                    } else {
                        // If we have results.
                        $.each(data.results, function (index, item) {
                            var link = $('<a></a>').attr('href', item.url);
                            link.append('<span class="thumbnail"><img src="' + item.thumbnail + '" /></span>');
                            link.append('<span class="title">' + item.title + '</span>');

                            if (item.price > item.min_price) {
                                link.append('<span class="price speacial">' + item.price + '</span><span class="price">' + item.min_price + '</span>');
                            } else {
                                link.append('<span class="price normal">' + item.min_price + '</span>');
                            }
                            link.wrap('<li><div class="item-search"></div></li>');
                            resultsList.append(link.parent());
                        });
                        // The Ajax request will return at the most 10 results.
                        // If there are more than 10, let's link to the search results page.
                        if (data.results_count > 8) {
                            resultsList.append('<li><span class="title"><a href="' + searchURL + '">See all results (' + data.results_count + ')</a></span></li>');
                        }
                        resultsList.fadeIn(200);
                        $('.search-form').removeClass('s-loading');
                    }
                });
            }
        });
    });
    // Clicking outside makes the results disappear.
    $('body').bind('click', function () {
        $('.search-results').hide();
        $('.search-form').removeClass('s-loading');
    });
});