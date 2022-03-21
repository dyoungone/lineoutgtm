<script>(function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
    var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-NMWVF37');</script>

<script type='text/javascript'> window.dataLayer = window.dataLayer || [];
    {{#if product}} var productData={'pageType': 'product',
    'event': 'productView',{{#if customer}}'customer': {
        'id': '{{customer.id}}',
        'name': '{{customer.name}}',
        'email': '{{customer.email}}',
        'customer_group_id': '{{customer.customer_group_id}}',
        'customer_group_name': '{{customer.customer_group_name}}',
    },{{/if}}'id': '{{product.id}}',
    'mpn': '{{product.mpn}}',
    'name': '{{product.category}}',
    'gtin': '{{product.gtin}}',
    'title': '{{product.title}}',
    'rating': '{{product.rating}}',
    'condition': '{{product.condition}}',
    'num_reviews': '{{product.num_reviews}}',
    'stock_level': '{{product.stock_level}}',
    'availability': '{{product.availability}}',{{#if product.brand}}'brand': '{{product.brand.name}}',{{/if}} };
    window.dataLayer.push(productData);
    setTimeout(function () {
        window.stencilUtils.hooks.on('product-options-change-remote', function (data) {
            var options = data.response.data;
            productData['variant'] = {
                'instock': options.instock,
                'sku': options.sku,
                'variantId': options.variantId,
                'price': options.price,
                'v3_variant_id': options.v3_variant_id,
                'parentId': '{{product.id}}',
            };
            productData['event'] = 'variantSelected';
            window.dataLayer.push(productData);
        });
        window.stencilUtils.hooks.on('cart-item-add', function (data) {
            productData['event'] = 'productAddToCart';
            window.dataLayer.push(productData);
        });
    }, 2000);{{/if}}

    {{#if category}}var categoryData = {
    'pageType': 'category', 'event': 'categoryView',{{#if customer}}'customer': {
        'id': '{{customer.id}}',
        'name': '{{customer.name}}',
        'email': '{{customer.email}}',
        'customer_group_id': '{{customer.customer_group_id}}',
        'customer_group_name': '{{customer.customer_group_name}}',
    },{{/if}}'id': '{{category.id}}', 'name': '{{category.name}}',
};
    window.dataLayer.push(categoryData);{{/if}}

    {{#if cart}}
        var cartData = {
            'pageType': 'cart',
            'event': 'cartView',
            {{#if customer}}'customer': {
                'id': '{{customer.id}}',
                'name': '{{customer.name}}',
                'email': '{{customer.email}}',
                'customer_group_id': '{{customer.customer_group_id}}',
                'customer_group_name': '{{customer.customer_group_name}}',
            },{{/if}}
            'sub_total': {
                'formatted': '{{cart.sub_total.formatted}}',
                'currency': '{{cart.sub_total.currency}}',
                'value':{{cart.sub_total.value}},
            },
            'grand_total': {
                'formatted': '{{cart.grand_total.formatted}}',
                'currency': '{{cart.grand_total.currency}}',
                'value':{{cart.grand_total.value}},
            },
            {{#if cart.coupons}}'coupons': [{{#each cart.coupons}}{
                'code': '{{code}}',
                'discount': {
                    'formatted': '{{discount.formatted}}',
                    'currency': '{{discount.currency}}',
                    'value':{{discount.value}},
                },
            }, {{/each}}], {{/if}}
            'shipping': {
                {{#if cart.shipping_handling.shipping_cost}}
                    'formatted': '{{cart.shipping_handling.shipping_cost.formatted}}',
                    'currency': '{{cart.shipping_handling.shipping_cost.currency}}',
                    'value':{{cart.shipping_handling.shipping_cost.value}},
                {{/if}}
            },
            'taxes': [{{#each cart.taxes}} {
                'name': '{{name}}',
                'discount': {
                    'formatted': '{{cost.formatted}}',
                    'currency': '{{cost.currency}}',
                    'value':{{cost.value}},
                },
            } {{/each}}],
            {{#if cart.discount}}'discount': {
                    'formatted': '{{cart.discount.formatted}}',
                    'currency': '{{cart.discount.currency}}',
                    'value':{{cart.discount.value}},
            }, {{/if}}
            'items': {{#if cart.items}} [{{#each cart.items}} {
                'name': '{{name}}',
                'sku': '{{sku}}',
                'id': '{{sku}}',
                'url': '{{url}}',
                'price': {
                    'formatted': '{{price.formatted}}',
                    'currency': '{{price.currency}}',
                    'value':{{price.value}},
                    'quantity': '{{quantity}}',
                            {{#if options}}'options': [{{#each options}} {
                            'name': '{{name}}',
                            'value': '{{value}}'
                        },{{/each}}]{{/if}},
                }
            } {{/each}}]{{/if}}
        };
        


    window.dataLayer.push(cartData);
    {{/if}}
    {{#if checkout}}
        {{#unless checkout.order.id}}
            var cartData= {
                'pageType': 'checkout',
                'event': 'initiateCheckout',
                {{#if customer}}'customer': {
                    'id': '{{customer.id}}',
                    'name': '{{customer.name}}',
                    'email': '{{customer.email}}',
                    'customer_group_id': '{{customer.customer_group_id}}',
                    'customer_group_name': '{{customer.customer_group_name}}',
                },{{/if}}
            };
            window.dataLayer.push(cartData);
        {{/unless}}
    {{/if}}
    {{#if checkout}}
        {{#if checkout.order.id}}
            fetch('/api/storefront/order/{{checkout.order.id}}', {credentials: 'include'}).then(function (response) {
                return response.json();
            }).then(function (orderJson) {
                var cartData = {
                'pageType': 'thankyou',
                'event': 'orderComplete',
                'cartId': orderJson.cartId,
                'status': orderJson.status,
                'orderId': orderJson.orderId,
                'orderName': orderJson.billingAddress.firstName + ' ' + orderJson.billingAddress.lastName,
                'email': orderJson.billingAddress.email,
                'phone': orderJson.billingAddress.phone,
                'taxTotal': orderJson.taxTotal,
                'baseAmount': orderJson.baseAmount,
                'orderAmount': orderJson.orderAmount,
                'shippingCostTotal': orderJson.shippingCostTotal,
                'orderAmountAsInteger': orderJson.orderAmountAsInteger,
                'currency': orderJson.currency.code,
            };
                window.dataLayer.push(cartData);
            });
        {{/if}}
    {{/if}}
</script>