import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Careers() {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            We're on a mission to revolutionize digital finance. Come build the future with us.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {[
                            { title: "Senior Frontend Engineer", dept: "Engineering", loc: "Remote", type: "Full-time" },
                            { title: "Product Designer", dept: "Design", loc: "New York, NY", type: "Full-time" },
                            { title: "Customer Success Manager", dept: "Support", loc: "London, UK", type: "Full-time" }
                        ].map((job, i) => (
                            <div key={i} className="bg-card border border-border/50 rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
                                <div>
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.dept}</span>
                                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.loc}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.type}</span>
                                    </div>
                                </div>
                                <Button variant="outline">Apply Now</Button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center text-muted-foreground">
                        <p>Don't see your perfect role? Email us at <a href="mailto:careers@example.com" className="text-primary hover:underline">careers@example.com</a></p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
