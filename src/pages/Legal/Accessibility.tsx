import { motion } from 'framer-motion';

export default function Accessibility() {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto prose dark:prose-invert"
                >
                    <h1>Accessibility Statement</h1>
                    <p>
                        We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
                    </p>
                    <h3>Measures to support accessibility</h3>
                    <ul>
                        <li>Include accessibility as part of our mission statement.</li>
                        <li>Integrate accessibility into our procurement practices.</li>
                        <li>Provide continual accessibility training for our staff.</li>
                    </ul>
                    <h3>Conformance status</h3>
                    <p>
                        The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. We are partially conformant with WCAG 2.1 level AA.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
