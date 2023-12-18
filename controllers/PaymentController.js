import { YooCheckout } from "@a2seven/yoo-checkout";

const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

export const PaymentCreate = async (req, res) => {
    try {
        const reqData = req.body;

        const checkout = new YooCheckout({shopId: "shop id", secretKey: "this secret key"});
        const idempotenceKey = generateRandomString(24);

        const createPayload = {
            amount: {
                value: reqData.value,
                currency: 'RUB'
            },
            payment_method_data: {
                type: 'bank_card'
            },
            confirmation: {
                type: 'redirect',
                return_url: 'http://localhost:3000/payconfirm'
            },
            "metadata": {
                "email": reqData.email || ""
            },
        };

        const payment = await checkout.createPayment(createPayload, idempotenceKey);

        res.json({payment})
    } catch (err) {
        console.error(err)
        res.json({
            message: "failed crate a payment"
        })
    }
}

export const PaymentConfirm = async (req, res) => {
    try {
        const reqData = req.body;

        const checkout = new YooCheckout({ shopId: 'shop id', secretKey: 'this secret key' });
        const paymentId = reqData.paymentId.replace(/"/g, "");
        const idempotenceKey = generateRandomString(24);

        const capturePayload = {
            amount: {
                value: parseFloat(reqData.value.replace(/"/g, "")),
                currency: 'RUB'
            }
        };

        const payment = await checkout.capturePayment(paymentId, capturePayload, idempotenceKey);

        res.json({
            pay: payment
        })
    } catch (err) {
        console.error(err)
    }
}