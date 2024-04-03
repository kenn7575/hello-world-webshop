# webshop.kennik.dk

## Resources
- [Stripe docs](https://docs.stripe.com/)
- [Stripe API docs ](https://docs.stripe.com/api)

## Database structure
```plaintext
(): collection
||: document
<>: document field
<...[]>: document field list


(users) ↴
    |id| ↴
        <displayname>
        <email>
        <phone_number>
        <uid>
        <stripe_customer_id>
        (purchases) ↴
                |id| ↴
                    <created>
                    <amount>
                    <currency>
                    <checkout_session_id>
                    <lineItems[
                            <price>
                            <quantity>
                            <product> 
                            <product_id>
                    ]>

(products) ↴
    |id| ↴
        <title>
        <description>
        <price>
        <image>
        <file>
        <image_small>
        <stripe_price_id>
        <stripe_product_id>
