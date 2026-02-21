import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

const teamMembers = [
    {
        name: "Alex Morgan",
        role: "CEO & Founder",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        bio: "Visionary leader with 10+ years in fintech."
    },
    {
        name: "Sarah Chen",
        role: "CTO",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        bio: "Tech enthusiast passionate about blockchain and security."
    },
    {
        name: "James Wilson",
        role: "Head of Marketing",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
        bio: "Creative mind driving our global brand strategy."
    },
    {
        name: "Maria Garcia",
        role: "Lead Designer",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
        bio: "Obsessed with creating intuitive and beautiful user experiences."
    }
];

export default function Team() {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Team</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            The passionate individuals behind Wallet.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="bg-card border border-border/50 rounded-xl overflow-hidden text-center p-6 shadow-sm hover:shadow-md transition-all"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 mx-auto rounded-full mb-4 bg-muted"
                                />
                                <h3 className="text-xl font-bold">{member.name}</h3>
                                <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                                <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                                <div className="flex justify-center gap-4 text-muted-foreground">
                                    <Github className="w-5 h-5 hover:text-foreground cursor-pointer" />
                                    <Linkedin className="w-5 h-5 hover:text-foreground cursor-pointer" />
                                    <Twitter className="w-5 h-5 hover:text-foreground cursor-pointer" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
