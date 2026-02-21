import { motion } from 'framer-motion';

export default function TermsOfService() {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto prose dark:prose-invert"
                >
                    <h1>Terms of Service</h1>
                    <p>Last updated: January 2024</p>
                    <p>
                        By accessing this website, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                    </p>
                    <h3>Use License</h3>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only.
                    </p>
                    <h3>Disclaimer</h3>
                    <p>
                        The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
