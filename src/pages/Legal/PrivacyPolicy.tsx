import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto prose dark:prose-invert"
                >
                    <h1>Privacy Policy</h1>
                    <p>Last updated: January 2024</p>
                    <p>
                        Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.
                    </p>
                    <h3>Information We Collect</h3>
                    <p>
                        We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.
                    </p>
                    <h3>How We Use Information</h3>
                    <p>
                        We use collected information to provide, operate, and maintain our website, ease the functionality of our service, and to detect and prevent fraud.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
