import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Github, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const socialPlatforms = [
    {
        name: 'Facebook',
        id: 'facebook',
        icon: <Facebook className="w-8 h-8" />,
        color: 'hover:text-blue-600',
        description: 'Join our community and stay updated with our latest news.',
        link: 'https://facebook.com',
        stats: '10k+ followers'
    },
    {
        name: 'Instagram',
        id: 'instagram',
        icon: <Instagram className="w-8 h-8" />,
        color: 'hover:text-pink-600',
        description: 'See our latest stories and behind-the-scenes content.',
        link: 'https://instagram.com',
        stats: '25k+ followers'
    },
    {
        name: 'Twitter (X)',
        id: 'twitter',
        icon: <Twitter className="w-8 h-8" />,
        color: 'hover:text-sky-500',
        description: 'Get real-time updates and join the conversation.',
        link: 'https://twitter.com',
        stats: '15k+ followers'
    },
    {
        name: 'GitHub',
        id: 'github',
        icon: <Github className="w-8 h-8" />,
        color: 'hover:text-gray-900 dark:hover:text-white',
        description: 'Check out our open-source projects and contribute.',
        link: 'https://github.com',
        stats: '500+ repositories'
    },
    {
        name: 'WhatsApp',
        id: 'whatsapp',
        icon: <MessageCircle className="w-8 h-8" />,
        color: 'hover:text-green-600',
        description: 'Fast and direct support for your urgent queries.',
        link: 'https://wa.me/your_number',
        stats: '24/7 Support'
    },
    {
        name: 'Telegram',
        id: 'telegram',
        icon: <Send className="w-8 h-8" />,
        color: 'hover:text-blue-500',
        description: 'Join our official channel for exclusive announcements.',
        link: 'https://t.me/your_channel',
        stats: '5k+ subscribers'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-transparent to-primary/5">
            <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-6"
                    >
                        Get in Touch via Socials
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground"
                    >
                        We've moved! We no longer accept traditional emails. Connect with us on your favorite platform for lightning-fast responses and community updates.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {socialPlatforms.map((platform) => (
                        <motion.div
                            key={platform.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.03, translateY: -5 }}
                            className="glass p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center transition-all duration-300 group hover:shadow-2xl hover:shadow-primary/10"
                        >
                            <div className={`mb-6 p-4 rounded-full bg-primary/5 transition-colors duration-300 ${platform.color}`}>
                                {platform.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{platform.name}</h3>
                            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                                {platform.description}
                            </p>
                            <div className="mt-auto w-full">
                                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-4">
                                    {platform.stats}
                                </div>
                                <Button
                                    asChild
                                    className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border-none transition-all"
                                >
                                    <a href={platform.link} target="_blank" rel="noopener noreferrer">
                                        Connect Now
                                    </a>
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-block p-1 rounded-full bg-gradient-to-r from-primary/20 via-transparent to-primary/20">
                        <div className="px-6 py-2 rounded-full bg-background/80 backdrop-blur-sm text-sm text-muted-foreground italic">
                            Expect a response within 1-2 hours on any of these platforms.
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
