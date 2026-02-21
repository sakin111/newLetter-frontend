import { motion } from 'framer-motion';
import { MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Chat() {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-background text-foreground flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md mx-auto text-center"
                >
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MessageSquareText className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Live Chat Support</h1>
                    <p className="text-muted-foreground mb-8">
                        Our support team is currently offline. Please leave a message or check our FAQ.
                    </p>
                    <Button size="lg" className="w-full">
                        Start a Conversation
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
