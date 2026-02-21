import { motion } from 'framer-motion';

export default function RefundPolicy() {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto prose dark:prose-invert"
                >
                    <h1>Refund Policy</h1>
                    <p>
                        Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.
                    </p>
                    <h3>Processing Refunds</h3>
                    <p>
                        If your return is approved, we will initiate a refund to your credit card (or original method of payment). You will receive the credit within a certain amount of days, depending on your card issuer's policies.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
