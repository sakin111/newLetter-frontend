import { motion } from 'framer-motion';

export default function ReturnsPolicy() {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto prose dark:prose-invert"
                >
                    <h1>Returns Policy</h1>
                    <p>
                        We want you to be completely satisfied with your purchase. If you are not satisfied, we are here to help.
                    </p>
                    <h3>Returns</h3>
                    <p>
                        You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it.
                    </p>
                    <p>
                        Your item must be in the original packaging. Your item needs to have the receipt or proof of purchase.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
